// --- ĐỐI TƯỢNG BAN ĐẦU VÀ TRẠNG THÁI TOÀN CỤC ---
let appData = { images: [], commands: [] };
let activeIdx = 0;
let slideshowIntervalId = null;
let isPaletteOpen = false;
let selectedCommandIdx = 0;
let filteredCommands = [];

// --- TRUY XUẤT CÁC PHẦN TỬ DOM CHÍNH ---
const activeImage = document.getElementById('active-image');
const imageTitle = document.getElementById('image-title');
const imageIndex = document.getElementById('image-index');
const thumbnailsContainer = document.getElementById('thumbnails-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSlideshow = document.getElementById('btn-slideshow');
const slideshowStatus = document.getElementById('slideshow-status');

// Các phần tử thuộc nhóm Command Palette
const commandPalette = document.getElementById('command-palette');
const paletteSearch = document.getElementById('palette-search');
const commandList = document.getElementById('command-list');

// --- HÀM 1: NẠP DỮ LIỆU TỪ TỆP DATA.JSON ---
async function loadApplicationData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Thất bại khi đọc file data.json");
        appData = await response.json();
        
        // Đổ thông tin Header
        document.getElementById('app-title').textContent = appData.galleryTitle;
        document.getElementById('app-subtitle').textContent = appData.gallerySubtitle;

        if (appData.images.length > 0) {
            renderThumbnails();
            updateGalleryDisplay(0);
        }
    } catch (error) {
        console.error("Lỗi khởi tạo ứng dụng:", error);
    }
}

// --- HÀM 2: DỰNG CÁC PHẦN TỬ THUMBNAIL ĐỦ CHUẨN TRỢ NĂNG ARIA ---
function renderThumbnails() {
    thumbnailsContainer.innerHTML = '';
    appData.images.forEach((img, idx) => {
        // Tạo thẻ button bọc ngoài thay vì div để mặc định hỗ trợ Focus Tab nguyên bản
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `col-auto thumb-wrapper transition-all`;
        btn.id = `thumb-${idx}`;
        
        // Gắn nhãn ARIA hỗ trợ công cụ đọc màn hình (Screen Reader) cho người khiếm thị
        btn.setAttribute('aria-label', `Xem hình ảnh số ${idx + 1}: ${img.title}`);
        btn.setAttribute('aria-controls', 'active-image');
        
        const innerImg = document.createElement('img');
        innerImg.src = img.url;
        innerImg.alt = img.title;
        
        btn.appendChild(innerImg);
        
        // Sự kiện click chuột thông thường
        btn.addEventListener('click', () => {
            stopSlideshow();
            updateGalleryDisplay(idx);
        });

        thumbnailsContainer.appendChild(btn);
    });
}

// --- HÀM 3: CẬP NHẬT TRẠNG THÁI HIỂN THỊ HÌNH ẢNH GALLERY ---
function updateGalleryDisplay(targetIdx) {
    if (targetIdx < 0 || targetIdx >= appData.images.length) return;
    
    // Gỡ bỏ trạng thái active của thumbnail cũ
    document.querySelectorAll('.thumb-wrapper').forEach(t => t.classList.remove('active'));
    
    activeIdx = targetIdx;
    const currentImg = appData.images[activeIdx];
    
    // Đổ dữ liệu
    activeImage.src = currentImg.url;
    activeImage.alt = currentImg.title;
    imageTitle.textContent = currentImg.title;
    imageIndex.textContent = `${activeIdx + 1} / ${appData.images.length}`;
    
    // Kích hoạt viền sáng cho Thumbnail mới tương ứng
    const activeThumb = document.getElementById(`thumb-${activeIdx}`);
    if (activeThumb) activeThumb.classList.add('active');
}

// --- HÀM ĐIỀU KHIỂN HÀNH VI CHẠY SLIDESHOW ---
function toggleSlideshow() {
    if (slideshowIntervalId) {
        stopSlideshow();
    } else {
        slideshowStatus.style.display = 'inline-block';
        btnSlideshow.textContent = "⏸️ Dừng Slideshow";
        btnSlideshow.className = "btn btn-warning px-4 py-2 fw-semibold text-sm";
        
        slideshowIntervalId = setInterval(() => {
            let nextIdx = (activeIdx + 1) % appData.images.length;
            updateGalleryDisplay(nextIdx);
        }, 2500); // 2.5 giây tự nhảy ảnh
    }
}

function stopSlideshow() {
    if (slideshowIntervalId) {
        clearInterval(slideshowIntervalId);
        slideshowIntervalId = null;
        slideshowStatus.style.display = 'none';
        btnSlideshow.textContent = "▶️ Chạy Slideshow";
        btnSlideshow.className = "btn btn-primary-custom px-4 py-2 fw-semibold text-sm";
    }
}

// ==========================================================================
// TOÀN BỘ LOGIC CỦA THANH HỆ THỐNG COMMAND PALETTE (CTRL + K)
// ==========================================================================
function openCommandPalette() {
    isPaletteOpen = true;
    commandPalette.style.display = 'flex';
    paletteSearch.value = '';
    selectedCommandIdx = 0;
    filterCommands(""); // Hiển thị toàn bộ lệnh lần đầu
    setTimeout(() => paletteSearch.focus(), 50); // Tự động focus vào ô tìm kiếm
}

function closeCommandPalette() {
    isPaletteOpen = false;
    commandPalette.style.display = 'none';
}

function filterCommands(keyword) {
    const cleanedKeyword = keyword.trim().toLowerCase();
    
    // Tiến hành lọc mảng
    filteredCommands = appData.commands.filter(cmd => 
        cmd.text.toLowerCase().includes(cleanedKeyword)
    );

    renderPaletteCommands();
}

function renderPaletteCommands() {
    commandList.innerHTML = '';
    
    if (filteredCommands.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = "text-center text-muted py-3 small";
        noResult.textContent = "Không tìm thấy lệnh nào khớp.";
        commandList.appendChild(noResult);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const div = document.createElement('div');
        div.className = `command-item ${idx === selectedCommandIdx ? 'selected' : ''}`;
        div.setAttribute('role', 'option');
        div.setAttribute('aria-selected', idx === selectedCommandIdx ? 'true' : 'false');
        
        // Phần chữ text hiển thị lệnh
        const textSpan = document.createElement('span');
        textSpan.textContent = cmd.text;
        
        // Phần khối nhãn phím tắt bên phải dòng
        const kbd = document.createElement('kbd');
        kbd.className = "bg-light text-dark border px-2 py-0.5 small";
        kbd.textContent = cmd.shortcut;

        div.append(textSpan, kbd);

        // Sự kiện di chuột hover và click chuột trái trực tiếp
        div.addEventListener('mouseenter', () => {
            selectedCommandIdx = idx;
            renderPaletteCommands();
        });
        div.addEventListener('click', () => {
            executeCommand(cmd.id);
        });

        commandList.appendChild(div);
    });
}

// Định vị điều phối thực thi hành động tương ứng với ID của lệnh được chọn
function executeCommand(commandId) {
    closeCommandPalette();
    
    if (commandId === 'play-slideshow') { if (!slideshowIntervalId) toggleSlideshow(); }
    else if (commandId === 'pause-slideshow') { stopSlideshow(); }
    else if (commandId === 'next-image') { stopSlideshow(); updateGalleryDisplay((activeIdx + 1) % appData.images.length); }
    else if (commandId === 'prev-image') { stopSlideshow(); updateGalleryDisplay((activeIdx - 1 + appData.images.length) % appData.images.length); }
    else if (commandId === 'toggle-dark') { document.body.classList.toggle('dark-mode'); }
    else if (commandId === 'reset-gallery') { stopSlideshow(); updateGalleryDisplay(0); }
}

// ==========================================================================
// QUẢN LÝ LẮNG NGHE SỰ KIỆN PHÍM BÀN PHÍM TOÀN CỤC (KEYBOARD LOGIC CENTER)
// ==========================================================================
window.addEventListener('keydown', (e) => {
    
    // KỊCH BẢN A: NẾU BẢNG LỆNH COMMAND PALETTE ĐANG MỞ
    if (isPaletteOpen) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeCommandPalette();
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Chặn hành vi cuộn trang
            if (filteredCommands.length > 0) {
                selectedCommandIdx = (selectedCommandIdx + 1) % filteredCommands.length;
                renderPaletteCommands();
            }
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                selectedCommandIdx = (selectedCommandIdx - 1 + filteredCommands.length) % filteredCommands.length;
                renderPaletteCommands();
            }
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands.length > 0 && filteredCommands[selectedCommandIdx]) {
                executeCommand(filteredCommands[selectedCommandIdx].id);
            }
        }
        return; // Dừng xử lý để tránh ảnh hưởng đến Gallery bên dưới
    }

    // KỊCH BẢN B: KHỞI ĐỘNG MỞ PALETTE (TỔ HỢP PHÍM CTRL + K HOẶC CMD + K)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    // TỔ HỢP PHÍM PHỤ: CTRL + M ĐỂ ĐỔI NHANH CHẾ ĐỘ NỀN TỐI
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        return;
    }

    // KỊCH BẢN C: ĐIỀU HƯỚNG SỬ DỤNG GALLERY ẢNH TIÊU CHUẨN
    if (e.key === 'ArrowRight') {
        stopSlideshow();
        updateGalleryDisplay((activeIdx + 1) % appData.images.length);
    }
    else if (e.key === 'ArrowLeft') {
        stopSlideshow();
        updateGalleryDisplay((activeIdx - 1 + appData.images.length) % appData.images.length);
    }
    else if (e.key === ' ') {
        // Chỉ bắt phím Space khi người dùng không focus vào các nút bấm tương tác
        if (document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault(); // Chặn hành vi cuộn trang mặc định của Space
            toggleSlideshow();
        }
    }
    // BẮT CÁC PHÍM SỐ TỪ 1 ĐẾN 9 ĐỂ NHẢY TRỰC TIẾP ĐẾN PHẦN TỬ ẢNH TƯƠNG ỨNG
    else if (e.key >= '1' && e.key <= '9') {
        const targetNumIdx = parseInt(e.key) - 1;
        if (targetNumIdx < appData.images.length) {
            stopSlideshow();
            updateGalleryDisplay(targetNumIdx);
            
            // Đưa trạng thái focus của bàn phím về đúng Thumbnail được kích hoạt
            const targetThumb = document.getElementById(`thumb-${targetNumIdx}`);
            if (targetThumb) targetThumb.focus();
        }
    }
});

// Gắn sự kiện lắng nghe Input thời gian thực cho ô tìm kiếm trong Command Palette
paletteSearch.addEventListener('input', (e) => {
    selectedCommandIdx = 0; // Đưa con trỏ lựa chọn về hàng đầu khi lọc dữ liệu
    filterCommands(e.target.value);
});

// ĐĂNG KÝ SỰ KIỆN CLICK CHUỘT CHO CÁC NÚT ĐIỀU HƯỚNG TĨNH DƯỚI CARD ẢNH
btnPrev.addEventListener('click', () => { stopSlideshow(); updateGalleryDisplay((activeIdx - 1 + appData.images.length) % appData.images.length); });
btnNext.addEventListener('click', () => { stopSlideshow(); updateGalleryDisplay((activeIdx + 1) % appData.images.length); });
btnSlideshow.addEventListener('click', toggleSlideshow);

// Đóng bảng lệnh nếu người dùng bấm chuột ra vùng trống bên ngoài Card điều khiển
commandPalette.addEventListener('click', (e) => {
    if (e.target === commandPalette) closeCommandPalette();
});

// --- KHỞI CHẠY ĐẦU VÀO KHI ỨNG DỤNG ĐƯỢC LOAD XONG ---
document.addEventListener('DOMContentLoaded', loadApplicationData);