// ==========================================================================
// 1. KHAI BÁO CƠ SỞ DỮ LIỆU SẢN PHẨM (MÃ CƠ SỞ KHÔNG HARDCODE HTML)
// ==========================================================================
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/200x200/2563eb/fff?text=iPhone+16", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/200x200/0284c7/fff?text=S24+Ultra", rating: 4.8, inStock: true },
    { id: 3, name: "MacBook Pro M3 14\"", price: 39990000, category: "laptop", image: "https://placehold.co/200x200/475569/fff?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 13 Plus", price: 42500000, category: "laptop", image: "https://placehold.co/200x200/0f172a/fff?text=Dell+XPS", rating: 4.6, inStock: false },
    { id: 5, name: "iPad Pro M4 Ultra Thin", price: 28990000, category: "tablet", image: "https://placehold.co/200x200/7c3aed/fff?text=iPad+Pro", rating: 4.7, inStock: true },
    { id: 6, name: "Samsung Galaxy Tab S9", price: 18490000, category: "tablet", image: "https://placehold.co/200x200/0891b2/fff?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 7, name: "AirPods Pro Gen 2", price: 5690000, category: "accessory", image: "https://placehold.co/200x200/10b981/fff?text=AirPods", rating: 4.8, inStock: true },
    { id: 8, name: "Sony WH-1000XM5", price: 8450000, category: "accessory", image: "https://placehold.co/200x200/f59e0b/fff?text=Sony+XM5", rating: 4.7, inStock: true },
    { id: 9, name: "Google Pixel 9 Pro", price: 24500000, category: "phone", image: "https://placehold.co/200x200/dc2626/fff?text=Pixel+9", rating: 4.6, inStock: true },
    { id: 10, name: "Asus ROG Zephyrus G14", price: 48990000, category: "laptop", image: "https://placehold.co/200x200/b91c1c/fff?text=ROG+G14", rating: 4.9, inStock: true },
    { id: 11, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/200x200/4b5563/fff?text=MX+Master", rating: 4.8, inStock: true },
    { id: 12, name: "Apple Watch Ultra 2", price: 21490000, category: "accessory", image: "https://placehold.co/200x200/ea580c/fff?text=Watch+Ultra", rating: 4.7, inStock: false },
    { id: 13, name: "Xiaomi Pad 6 Pro", price: 8990000, category: "tablet", image: "https://placehold.co/200x200/84cc16/fff?text=Xiaomi+Pad", rating: 4.4, inStock: true }
];

// --- TRẠNG THÁI ỨNG DỤNG TOÀN CỤC ---
let cartCount = 0;
let activeCategory = "all";
let searchKeyword = "";
let currentSortOrder = "default";

// Các node DOM quan trọng được tạo tự động
let productGridContainer = null;
let cartBadgeElement = null;

// ==========================================================================
// 2. 100% RENDER GIAO DIỆN KHUNG QUA JAVASCRIPT DOM HOÀN TOÀN
// ==========================================================================
async function initApplication() {
    let config = { appTitle: "Tech Catalog", appSubtitle: "Danh mục", searchPlaceholder: "Tìm...", categories: [], sortOptions: [] };
    
    try {
        const res = await fetch('data.json');
        if (res.ok) config = await res.json();
    } catch (e) { console.error("Lỗi đọc cấu hình JSON, dùng bộ nhớ dự phòng:", e); }

    const root = document.getElementById('app-root');

    // --- BƯỚC A: DỰNG THANH ĐẦU TRANG (HEADER BAO GỒM NÚT DARKMODE & GIỎ HÀNG) ---
    const headerRow = document.createElement('div');
    headerRow.className = "d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3";

    const titleArea = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.className = "fw-extrabold tracking-tight mb-1 text-dark-mode-adapt";
    h1.textContent = config.appTitle;
    const subtitle = document.createElement('p');
    subtitle.className = "text-muted mb-0 small";
    subtitle.textContent = config.appSubtitle;
    titleArea.append(h1, subtitle);

    const actionArea = document.createElement('div');
    actionArea.className = "d-flex align-items-center gap-3";

    // Tạo Nút chuyển đổi giao diện sáng tối (Dark/Light mode)
    const toggleModeBtn = document.createElement('button');
    toggleModeBtn.className = "btn btn-toggle-mode shadow-sm transition-all";
    toggleModeBtn.textContent = "🌙";
    toggleModeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        toggleModeBtn.textContent = isDark ? "☀️" : "🌙";
    });

    // Tạo biểu tượng hiển thị số lượng giỏ hàng
    const cartWrapper = document.createElement('div');
    cartWrapper.className = "position-relative bg-white text-dark border p-2 rounded-3 shadow-sm fs-5 select-none";
    cartWrapper.style.backgroundColor = "var(--bg-card)";
    cartWrapper.style.color = "var(--text-main)";
    cartWrapper.textContent = "🛒";
    cartBadgeElement = document.createElement('span');
    cartBadgeElement.className = "badge bg-danger cart-badge hidden";
    cartBadgeElement.textContent = "0";
    cartWrapper.appendChild(cartBadgeElement);

    actionArea.append(toggleModeBtn, cartWrapper);
    headerRow.append(titleArea, actionArea);
    root.appendChild(headerRow);

    // --- BƯỚC B: DỰNG THANH BỘ LỌC TÌM KIẾM VÀ SẮP XẾP VÀO DOM ---
    const filterCard = document.createElement('div');
    filterCard.className = "card product-card p-4 mb-4 border-0 shadow-sm";
    
    const filterRow = document.createElement('div');
    filterRow.className = "row g-3 align-items-center";

    // Tạo Ô tìm kiếm Realtime
    const searchCol = document.createElement('div');
    searchCol.className = "col-12 col-md-8";
    const searchInput = document.createElement('input');
    searchInput.type = "text";
    searchInput.className = "form-control form-control-custom py-2.5 px-4";
    searchInput.placeholder = config.searchPlaceholder;
    searchInput.addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        searchProducts();
    });
    searchCol.appendChild(searchInput);

    // Tạo Ô bộ chọn sắp xếp dữ liệu (Sort Dropdown)
    const sortCol = document.createElement('div');
    sortCol.className = "col-12 col-md-4";
    const sortSelect = document.createElement('select');
    sortSelect.className = "form-select form-select-custom py-2.5 px-3";
    
    config.sortOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        sortSelect.appendChild(option);
    });
    sortSelect.addEventListener('change', (e) => {
        currentSortOrder = e.target.value;
        sortProducts();
    });
    sortCol.appendChild(sortSelect);
    filterRow.append(searchCol, sortCol);
    filterCard.appendChild(filterRow);
    root.appendChild(filterCard);

    // --- BƯỚC C: DỰNG THANH NÚT PHÂN LOẠI DANH MỤC (CATEGORY BUTTONS) ---
    const catWrapper = document.createElement('div');
    catWrapper.className = "d-flex flex-wrap gap-2 mb-4";
    
    config.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = "button";
        btn.className = `btn btn-cat transition-all ${cat.id === 'all' ? 'active' : ''}`;
        btn.textContent = cat.label;
        btn.setAttribute('data-category', cat.id);
        
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = cat.id;
            filterByCategory();
        });
        catWrapper.appendChild(btn);
    });
    root.appendChild(catWrapper);

    // --- BƯỚC D: KHỞI TẠO LƯỚI GRID CHỨA SẢN PHẨM ---
    productGridContainer = document.createElement('div');
    productGridContainer.className = "row g-4";
    productGridContainer.id = "product-grid";
    root.appendChild(productGridContainer);

    // Chạy render đổ dữ liệu ra lưới màn hình lần đầu tiên
    renderProducts(products);
}

// ==========================================================================
// 3. CÁC HÀM XỬ LÝ LỌC, TÌM KIẾM, SẮP XẾP SẢN PHẨM PHÂN TÁCH RÕ RÀNG
// ==========================================================================

// --- HÀM CHÍNH 1: RENDER PRODUCTS (Vẽ giao diện các Cards bằng createElement) ---
function renderProducts(productsList) {
    productGridContainer.innerHTML = '';

    if (productsList.length === 0) {
        const noResultCol = document.createElement('div');
        noResultCol.className = "col-12 text-center py-5 text-muted fw-medium";
        noResultCol.innerHTML = `<span class="fs-1 d-block mb-2">🔍</span> Rất tiếc! Không có sản phẩm nào khớp với điều kiện lọc của bạn.`;
        productGridContainer.appendChild(noResultCol);
        return;
    }

    productsList.forEach((prod, idx) => {
        const col = document.createElement('div');
        col.className = "col-12 col-md-6 col-lg-4 fade-in-card";
        col.style.animationDelay = `${idx * 0.03}s`;

        const card = document.createElement('div');
        card.className = "card product-card h-100 transition-all";
        
        // Sự kiện click vào Card thì hiển thị Modal chi tiết sản phẩm
        card.addEventListener('click', (e) => {
            // Ngăn chặn bật Modal nếu người dùng click trúng nút "Thêm vào giỏ"
            if (e.target.classList.contains('btn-add-cart')) return;
            openProductDetailModal(prod);
        });

        // Khu vực chứa ảnh
        const imgContainer = document.createElement('div');
        imgContainer.className = "img-container";
        const img = document.createElement('img');
        img.src = prod.image;
        img.alt = prod.name;
        img.className = "img-fluid object-fit-contain p-3";
        img.style.maxHeight = "100%";
        imgContainer.appendChild(img);

        // Khối thân nội dung Card
        const cardBody = document.createElement('div');
        cardBody.className = "card-body d-flex flex-column p-4";

        const title = document.createElement('h5');
        title.className = "card-title fw-bold text-truncate mb-1";
        title.textContent = prod.name;

        const ratingArea = document.createElement('div');
        ratingArea.className = "text-warning small mb-3";
        ratingArea.textContent = `⭐ ${prod.rating.toFixed(1)}`;

        const priceArea = document.createElement('div');
        priceArea.className = "d-flex justify-content-between align-items-center mt-auto pt-3 border-top";
        
        const price = document.createElement('span');
        price.className = "fw-extrabold text-primary fs-5";
        price.textContent = prod.price.toLocaleString('vi-VN') + " đ";

        // Nút thêm sản phẩm vào giỏ hàng
        const addCartBtn = document.createElement('button');
        addCartBtn.type = "button";
        addCartBtn.className = "btn btn-sm btn-primary px-3 py-2 fw-semibold rounded-3 btn-add-cart";
        addCartBtn.textContent = "🛒 +";
        
        if (!prod.inStock) {
            addCartBtn.textContent = "Hết hàng";
            addCartBtn.className = "btn btn-sm btn-secondary px-3 py-2 fw-semibold rounded-3 btn-add-cart disabled";
            addCartBtn.disabled = true;
        }

        addCartBtn.addEventListener('click', () => {
            cartCount++;
            cartBadgeElement.textContent = cartCount;
            cartBadgeElement.classList.remove('hidden');
            
            // Hiệu ứng bong bóng nảy lên khi giỏ hàng thay đổi số lượng
            cartBadgeElement.parentElement.classList.add('animate-bounce');
            setTimeout(() => cartBadgeElement.parentElement.classList.remove('animate-bounce'), 400);
        });

        priceArea.append(price, addCartBtn);
        cardBody.append(title, ratingArea, priceArea);
        card.append(imgContainer, cardBody);
        col.appendChild(card);
        productGridContainer.appendChild(col);
    });
}

// Thao tác gom nhóm xử lý Logic tổng hợp để lọc và sắp xếp tuần tự chuẩn hóa
function masterFilterPipeline() {
    let outputData = [...products];

    // Lọc theo danh mục
    if (activeCategory !== "all") {
        outputData = outputData.filter(p => p.category === activeCategory);
    }

    // Lọc theo từ khóa tìm kiếm Realtime
    if (searchKeyword) {
        outputData = outputData.filter(p => 
            p.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
            p.category.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    }

    // Thực thi sắp xếp
    if (currentSortOrder === "price-asc") {
        outputData.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === "price-desc") {
        outputData.sort((a, b) => b.price - a.price);
    } else if (currentSortOrder === "name-az") {
        outputData.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (currentSortOrder === "rating-desc") {
        outputData.sort((a, b) => b.rating - a.rating);
    }

    // Đổ mảng kết quả cuối cùng ra giao diện
    renderProducts(outputData);
}

// --- CÁC HÀM WRAPPER ĐÁP ỨNG ĐÚNG YÊU CẦU ĐỀ BÀI ---
function filterByCategory() { masterFilterPipeline(); }
function searchProducts() { masterFilterPipeline(); }
function sortProducts() { masterFilterPipeline(); }


// ==========================================================================
// 4. KHỞI TẠO MODAL CHI TIẾT ĐỘNG HOÀN TOÀN BẰNG JAVASCRIPT DOM
// ==========================================================================
function openProductDetailModal(product) {
    // Xóa bỏ các Node modal cũ nếu tồn tại trong DOM tránh rác mã nguồn
    const oldModal = document.getElementById('dynamicProductModal');
    if (oldModal) oldModal.remove();

    // Tạo khung ngoài của Bootstrap Modal
    const modalDiv = document.createElement('div');
    modalDiv.className = "modal fade";
    modalDiv.id = "dynamicProductModal";
    modalDiv.tabIndex = "-1";
    modalDiv.setAttribute('aria-hidden', 'true');

    const modalDialog = document.createElement('div');
    modalDialog.className = "modal-dialog modal-dialog-centered modal-lg";

    const modalContent = document.createElement('div');
    modalContent.className = "modal-content modal-content-custom border-0 shadow-lg";

    // Nút đóng modal (X) góc phải
    const modalHeader = document.createElement('div');
    modalHeader.className = "modal-header border-0 pb-0 pt-4 px-4 position-relative";
    const closeBtn = document.createElement('button');
    closeBtn.type = "button";
    closeBtn.className = "btn-close position-absolute end-0 top-0 mt-4 me-4";
    closeBtn.style.color = "var(--text-main)";
    closeBtn.setAttribute('data-bs-dismiss', 'modal');
    modalHeader.appendChild(closeBtn);

    // Phần thân Modal chia Layout dạng 2 cột bằng Bootstrap Grid hệ thống
    const modalBody = document.createElement('div');
    modalBody.className = "modal-body p-4";

    const row = document.createElement('div');
    row.className = "row g-4 align-items-center";

    // Cột bên trái: Ảnh phóng to sản phẩm
    const colImg = document.createElement('div');
    colImg.className = "col-12 col-md-5 text-center";
    const detailImg = document.createElement('img');
    detailImg.src = product.image;
    detailImg.alt = product.name;
    detailImg.className = "img-fluid rounded-4 p-2 bg-light shadow-sm w-100 object-fit-contain";
    detailImg.style.maxHeight = "260px";
    colImg.appendChild(detailImg);

    // Cột bên phải: Toàn bộ thông tin chi tiết
    const colInfo = document.createElement('div');
    colInfo.className = "col-12 col-md-7";

    const title = document.createElement('h3');
    title.className = "fw-extrabold mb-2";
    title.textContent = product.name;

    const badgeCategory = document.createElement('span');
    badgeCategory.className = "badge bg-secondary-subtle text-secondary px-2.5 py-1.5 rounded-3 mb-3 text-uppercase font-bold tracking-wider";
    badgeCategory.style.fontSize = "10px";
    badgeCategory.textContent = `Danh mục: ${product.category}`;

    const price = document.createElement('h4');
    price.className = "text-primary fw-extrabold mb-3";
    price.textContent = product.price.toLocaleString('vi-VN') + " đ";

    const textDescription = document.createElement('p');
    textDescription.className = "text-muted small lh-lg mb-4";
    textDescription.textContent = `Sản phẩm ${product.name} chính hãng có cấu hình cao cấp vượt trội, hỗ trợ trả góp lãi suất 0%, cam kết bảo hành điện tử chính hãng 12 tháng tại các trung tâm ủy quyền toàn quốc.`;

    const statusRow = document.createElement('div');
    statusRow.className = "d-flex gap-4 mb-2 small text-secondary";
    
    const stockStatus = document.createElement('span');
    stockStatus.innerHTML = `Trạng thái: <strong class="${product.inStock ? 'text-success' : 'text-danger'}">${product.inStock ? 'Còn hàng' : 'Tạm hết hàng'}</strong>`;
    
    const ratingStatus = document.createElement('span');
    ratingStatus.innerHTML = `Đánh giá: <strong class="text-warning">⭐ ${product.rating} / 5</strong>`;
    
    statusRow.append(stockStatus, ratingStatus);

    colInfo.append(title, badgeCategory, price, textDescription, statusRow);
    row.append(colImg, colInfo);
    modalBody.appendChild(row);
    modalContent.append(modalHeader, modalBody);
    modalDialog.appendChild(modalContent);
    modalDiv.appendChild(modalDialog);
    
    // Đẩy modal hoàn chỉnh vào DOM
    document.body.appendChild(modalDiv);

    // Sử dụng instance Bootstrap class khởi động Modal bung lên lập tức
    const bsModalInstance = new bootstrap.Modal(modalDiv);
    bsModalInstance.show();
}

// Khởi chạy hệ thống catalog ngay khi trang nạp cấu trúc thành công
document.addEventListener('DOMContentLoaded', initApplication);