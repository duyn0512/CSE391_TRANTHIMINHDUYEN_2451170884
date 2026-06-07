// --- TRUY XUẤT CÁC PHẦN TỬ DOM ---
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const historyContainer = document.getElementById('history-container');

// Các thành phần HTML đại diện cho 3 trạng thái (States)
const stateEmpty = document.getElementById('state-empty');
const stateLoading = document.getElementById('state-loading');
const stateSuccess = document.getElementById('state-success');
const stateError = document.getElementById('state-error');
const errorMessage = document.getElementById('error-message');

// Các thành phần HTML hiển thị thông tin thời tiết
const wCity = document.getElementById('w-city');
const wDescription = document.getElementById('w-description');
const wIcon = document.getElementById('w-icon');
const wTemp = document.getElementById('w-temp');
const wHumidity = document.getElementById('w-humidity');
const wWind = document.getElementById('w-wind');

// Khởi tạo các biến chứa dữ liệu toàn cục
let weatherMappingData = null; // Sẽ được tải từ file data.json
let searchHistory = JSON.parse(localStorage.getItem('weather_history')) || [];

// --- HÀM 1: TẢI BẢNG ÁNH XẠ THỜI TIẾT TỪ FILE DATA.JSON ---
async function loadWeatherMapping() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("Không thể tải tập tin data.json");
        }
        weatherMappingData = await response.json();
    } catch (error) {
        console.error("Lỗi cấu hình dữ liệu:", error);
    }
}

// --- HÀM 2: CHUYỂN ĐỔI LINH HOẠT GIỮA CÁC STATES BẮT BUỘC ---
function switchState(targetState) {
    stateEmpty.classList.add('hidden');
    stateLoading.classList.add('hidden');
    stateSuccess.classList.add('hidden');
    stateError.classList.add('hidden');

    if (targetState === 'empty') stateEmpty.classList.remove('hidden');
    if (targetState === 'loading') stateLoading.classList.remove('hidden');
    if (targetState === 'success') stateSuccess.classList.remove('hidden');
    if (targetState === 'error') stateError.classList.remove('hidden');
}

// --- HÀM 3: XỬ LÝ RENDER LỊCH SỬ TỪ LOCALSTORAGE ---
function renderHistory() {
    historyContainer.innerHTML = '';
    
    if (searchHistory.length === 0) {
        historyContainer.innerHTML = `<span class="text-xs text-muted font-medium">Trống</span>`;
        return;
    }

    searchHistory.forEach(city => {
        const btn = document.createElement('button');
        btn.textContent = city;
        btn.type = 'button';
        btn.className = "btn btn-sm capitalize";
        
        // Sự kiện click trực tiếp vào nút lịch sử để truy vấn lại nhanh
        btn.addEventListener('click', () => {
            cityInput.value = city;
            getWeatherData(city);
        });
        historyContainer.appendChild(btn);
    });
}

// --- HÀM 4: LƯU TÊN THÀNH PHỐ VÀO MẢNG LỊCH SỬ (TỐI ĐA 5 PHẦN TỬ) ---
function saveCityToHistory(city) {
    const formattedCity = city.trim().toLowerCase();
    if (!formattedCity) return;

    // Loại bỏ phần tử trùng lặp trước đó để xếp lên đầu danh sách
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== formattedCity);
    
    // Thêm giá trị mới vào vị trí đầu mảng
    searchHistory.unshift(city.trim());

    // Ràng buộc điều kiện: Luôn chỉ giữ lại tối đa 5 thành phố gần nhất
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    // Đẩy đồng bộ lưu trữ vào LocalStorage máy khách
    localStorage.setItem('weather_history', JSON.stringify(searchHistory));
    renderHistory();
}

// --- HÀM 5: LOGIC CHÍNH - FETCH API THỜI TIẾT & PARSE DỮ LIỆU ---
async function getWeatherData(cityName) {
    if (!cityName.trim()) return;

    // Kích hoạt trạng thái Loading
    switchState('loading');

    try {
        // Kiểm tra kịch bản thiết bị mất mạng Internet trước khi gửi yêu cầu
        if (!navigator.onLine) {
            throw new Error("Mất kết nối Internet. Vui lòng kiểm tra lại thiết bị mạng.");
        }

        // Đảm bảo dữ liệu từ file data.json đã được tải thành công trước khi xử lý thời tiết
        if (!weatherMappingData) {
            await loadWeatherMapping();
        }

        // BƯỚC 1: Sử dụng Geocoding API của Open-Meteo để chuyển tên thành phố -> Kinh/Vĩ độ
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            throw new Error(`Lỗi máy chủ tìm địa điểm (Mã lỗi HTTP: ${geoResponse.status})`);
        }

        const geoData = await geoResponse.json();

        // Xử lý lỗi: Thành phố không tồn tại (Mảng kết quả rỗng)
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Thành phố "${cityName}" không tồn tại. Vui lòng kiểm tra lại.`);
        }

        // Trích xuất tọa độ địa lý và tên đã được chuẩn hóa quốc tế
        const { latitude, longitude, name, country } = geoData.results[0];

        // BƯỚC 2: Gửi truy vấn lấy thời tiết dựa vào tọa độ đã tìm được ở bước trên
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error(`Lỗi máy chủ thời tiết (Mã lỗi HTTP: ${weatherResponse.status})`);
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather || weatherData.current;
        
        if (!current) {
            throw new Error("Không thể đọc được thông tin thời tiết hiện hành.");
        }

        // BƯỚC 3: Trích xuất thông số, so khớp với tệp data.json để lấy thông tin tiếng Việt
        const rawTemp = current.temperature !== undefined ? current.temperature : current.temp;
        const weatherCode = current.weathercode !== undefined ? current.weathercode : current.weather_code;
        
        // So khớp thông số lấy dữ liệu tiếng Việt từ data.json
        const mappedWeather = weatherMappingData[weatherCode] || { desc: "Thời tiết không xác định", icon: "✨" };

        // BƯỚC 4: Đổ dữ liệu thô đã xử lý hoàn chỉnh lên cấu trúc giao diện HTML
        wCity.textContent = `${name}, ${country}`;
        wDescription.textContent = mappedWeather.desc;
        wIcon.textContent = mappedWeather.icon;
        wTemp.textContent = rawTemp !== undefined ? Math.round(rawTemp) : "--";
        
        // Lấy thông số độ ẩm tương đối từ mảng dữ liệu trả về
        wHumidity.textContent = weatherData.relative_humidity_2m ? `${weatherData.relative_humidity_2m}%` : 'N/A';
        wWind.textContent = current.windspeed ? `${current.windspeed} km/h` : 'N/A';

        // Ghi nhận thành phố tìm kiếm thành công vào hàng đợi lịch sử LocalStorage
        saveCityToHistory(`${name}, ${country}`);

        // Chuyển cấu trúc màn hình sang trạng thái hiển thị Success
        switchState('success');

    } catch (error) {
        // Gom mọi kịch bản lỗi ném vào khối giao diện Error hiển thị cảnh báo trực quan
        errorMessage.textContent = error.message || "Đã xảy ra lỗi hệ thống không xác định.";
        switchState('error');
    }
}

// --- KHU VỰC ĐĂNG KÝ SỰ KIỆN LẮNG NGHE CHO FORM TÌM KIẾM ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện submit gây tải lại trang mặc định
    const targetCity = cityInput.value.trim();
    getWeatherData(targetCity);
    cityInput.value = ''; // Làm sạch ô nhập liệu sau khi nhấn tìm kiếm
});

// --- KHỞI CHẠY ĐẦU VÀO KHI ỨNG DỤNG ĐƯỢC LOAD XONG ---
document.addEventListener('DOMContentLoaded', () => {
    loadWeatherMapping(); // Gọi nạp tệp data.json vào bộ nhớ đệm ẩn
    renderHistory();       // Quét render lịch sử từ bộ nhớ cục bộ nếu có
    switchState('empty');  // Thiết đặt giao diện ban đầu về trạng thái Empty chờ dữ liệu
});