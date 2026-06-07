// Cấu hình phân trang ban đầu
let allPhotos = []; // Lưu toàn bộ dữ liệu từ file JSON
let currentPage = 1;
const limit = 20;
let isLoading = false;

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const loadingSpinner = document.getElementById('loading-spinner');
const loadingText = document.getElementById('loading-text');

// Khởi tạo Bootstrap Modal instance để điều khiển đóng/mở Lightbox
const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');

/**
 * 1. Hàm khởi tạo ứng dụng: Fetch dữ liệu JSON
 */
async function initGallery() {
    try {
        showLoading(true);
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Không thể tải tệp tin data.json');
        
        allPhotos = await response.json();
        
        // Load 20 cái đầu tiên
        loadMorePhotos();
        
        // Kích hoạt Observer theo dõi nút cuộn trang
        setupInfiniteScroll();
    } catch (error) {
        console.error('Lỗi:', error);
        loadingText.innerText = 'Không thể tải dữ liệu. Vui lòng thử lại!';
        loadingSpinner.classList.add('d-none');
    }
}

/**
 * 2. Hàm cắt mảng dữ liệu mô phỏng việc Phân trang (Pagination)
 */
function loadMorePhotos() {
    if (isLoading) return;
    isLoading = true;
    showLoading(true);

    // Tính toán vị trí cắt dữ liệu tương ứng với page hiện tại
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Nếu hết dữ liệu trong file JSON
    if (startIndex >= allPhotos.length) {
        showLoading(false);
        loadingText.innerText = "🎉 Bạn đã xem hết tất cả ảnh!";
        loadingSpinner.classList.add('d-none');
        // Ngắt kết nối observer vì không còn gì để kích hoạt load nữa
        if(window.infiniteObserver) window.infiniteObserver.unobserve(loadTrigger);
        return;
    }

    const pagePhotos = allPhotos.slice(startIndex, endIndex);

    // Render HTML cho cụm 20 ảnh mới
    pagePhotos.forEach(photo => {
        const cardHtml = `
            <div class="col">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-img-wrapper bg-secondary-subtle">
                        <img data-src="${photo.thumbnailUrl}" 
                             data-full="${photo.url}" 
                             class="card-img-top gallery-img lazy-img" 
                             alt="${photo.title}">
                    </div>
                    <div class="card-body p-3">
                        <p class="card-text text-truncate text-capitalize small fw-medium">${photo.title}</p>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML('beforeend', cardHtml);
    });

    // Kích hoạt Lazy Loading cho nhóm ảnh mới render
    setupLazyLoading();

    // Tăng số trang cho lần kích hoạt tiếp theo và mở khóa trạng thái
    currentPage++;
    isLoading = false;
    showLoading(false);
}

/**
 * 3. IntersectionObserver dành cho Infinite Scroll (Cuộn trang vô tận)
 */
function setupInfiniteScroll() {
    const options = {
        root: null, // Lấy toàn bộ viewport của trình duyệt
        rootMargin: '100px', // Kích hoạt trước khi user chạm đáy hẳn 100px giúp trải nghiệm mượt hơn
        threshold: 0.1
    };

    window.infiniteObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            loadMorePhotos();
        }
    }, options);

    window.infiniteObserver.observe(loadTrigger);
}

/**
 * 4. IntersectionObserver dành cho Lazy Loading Images
 */
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Thay thế src bằng dữ liệu từ data-src thực tế
                img.src = img.getAttribute('data-src');
                
                img.addEventListener('load', () => {
                    img.classList.add('loaded'); // Hiện hiệu ứng mờ dần (fade-in)
                    img.classList.remove('lazy-img'); // Xoá class đánh dấu để tránh track lại
                });

                // Ngừng theo dõi ảnh này sau khi đã xử lý xong
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * 5. Bắt sự kiện Click ảnh mở Lightbox (Sử dụng Event Delegation để tối ưu bộ nhớ)
 */
galleryGrid.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('.gallery-img');
    if (!clickedImg) return; // Nếu bấm trượt ra ngoài ảnh thì bỏ qua

    const fullImageUrl = clickedImg.getAttribute('data-full');
    const imageTitle = clickedImg.alt;

    // Gán dữ liệu sang cho modal
    lightboxImage.src = fullImageUrl;
    lightboxTitle.innerText = imageTitle;

    // Hiển thị modal
    lightboxModal.show();
});

/**
 * Helper: Trạng thái hiển thị bộ hiển thị loading
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.style.visibility = 'visible';
        loadingText.innerText = 'Đang tải thêm ảnh...';
    } else {
        // Giữ vị trí nhưng ẩn đi để tránh giật lag layout khi scroll
        loadingSpinner.style.visibility = 'hidden'; 
    }
}

// Chạy ứng dụng khi trình duyệt tải xong DOM
document.addEventListener('DOMContentLoaded', initGallery);