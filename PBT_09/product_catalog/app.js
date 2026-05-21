const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/300x200/png?text=iPhone+16", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/300x200/png?text=Galaxy+S24", rating: 4.8, inStock: true },
    { id: 3, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/300x200/png?text=MacBook+Pro", rating: 4.7, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 32500000, category: "laptop", image: "https://placehold.co/300x200/png?text=Dell+XPS", rating: 4.5, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/300x200/png?text=iPad+Pro", rating: 4.6, inStock: true },
    { id: 6, name: "Samsung Galaxy Tab S9", price: 18490000, category: "tablet", image: "https://placehold.co/300x200/png?text=Galaxy+Tab", rating: 4.4, inStock: true },
    { id: 7, name: "Apple Watch Ultra 2", price: 21990000, category: "watch", image: "https://placehold.co/300x200/png?text=Apple+Watch", rating: 4.8, inStock: true },
    { id: 8, name: "Garmin Fenix 7 Pro", price: 19500000, category: "watch", image: "https://placehold.co/300x200/png?text=Garmin+Fenix", rating: 4.7, inStock: true },
    { id: 9, name: "Xiaomi 14 Ultra", price: 22990000, category: "phone", image: "https://placehold.co/300x200/png?text=Xiaomi+14", rating: 4.3, inStock: true },
    { id: 10, name: "Asus ROG Zephyrus G14", price: 44990000, category: "laptop", image: "https://placehold.co/300x200/png?text=ROG+Zephyrus", rating: 4.9, inStock: true },
    { id: 11, name: "Lenovo Ideapad 5", price: 14200000, category: "laptop", image: "https://placehold.co/300x200/png?text=Ideapad+5", rating: 4.1, inStock: true },
    { id: 12, name: "Huawei Watch GT 4", price: 5490000, category: "watch", image: "https://placehold.co/300x200/png?text=Huawei+Watch", rating: 4.2, inStock: true }
];

const categories = {
    all: "Tất cả",
    phone: "Điện thoại",
    laptop: "Laptop",
    tablet: "Máy tính bảng",
    watch: "Đồng hồ"
};

let currentFilter = {
    search: "",
    category: "all",
    sortBy: "default"
};

let cartCount = 0;

let productsGridContainer;
let cartBadgeElement;

function initLayout() {
    const app = document.getElementById("app");

    const header = document.createElement("header");
    
    const title = document.createElement("h1");
    title.textContent = "TechCatalog";
    header.appendChild(title);

    const headerActions = document.createElement("div");
    headerActions.style.display = "flex";
    headerActions.style.gap = "20px";
    headerActions.style.alignItems = "center";

    const btnDarkMode = document.createElement("button");
    btnDarkMode.className = "btn";
    btnDarkMode.textContent = "🌓 Dark Mode";
    btnDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
    headerActions.appendChild(btnDarkMode);

    const cartWrapper = document.createElement("div");
    cartWrapper.className = "cart-icon-wrapper";
    cartWrapper.textContent = "🛒";
    cartBadgeElement = document.createElement("span");
    cartBadgeElement.className = "cart-badge";
    cartBadgeElement.textContent = "0";
    cartWrapper.appendChild(cartBadgeElement);
    headerActions.appendChild(cartWrapper);

    header.appendChild(headerActions);
    app.appendChild(header);

    const controlsBar = document.createElement("div");
    controlsBar.className = "controls-bar";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Tìm kiếm sản phẩm...";
    searchInput.addEventListener("input", (e) => searchProducts(e.target.value));
    controlsBar.appendChild(searchInput);

    const categoryGroup = document.createElement("div");
    categoryGroup.style.display = "flex";
    categoryGroup.style.gap = "8px";

    Object.keys(categories).forEach(key => {
        const btnCat = document.createElement("button");
        btnCat.className = `btn ${key === "all" ? "active" : ""}`;
        btnCat.textContent = categories[key];
        btnCat.setAttribute("data-category", key);
        btnCat.addEventListener("click", () => filterByCategory(key));
        categoryGroup.appendChild(btnCat);
    });
    controlsBar.appendChild(categoryGroup);

    const sortSelect = document.createElement("select");
    const sortOptions = [
        { value: "default", text: "Sắp xếp theo..." },
        { value: "price-asc", text: "Giá tăng dần" },
        { value: "price-desc", text: "Giá giảm dần" },
        { value: "name-az", text: "Tên A-Z" },
        { value: "rating-desc", text: "Đánh giá cao nhất" }
    ];
    sortOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        sortSelect.appendChild(option);
    });
    sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));
    controlsBar.appendChild(sortSelect);

    app.appendChild(controlsBar);

    productsGridContainer = document.createElement("div");
    productsGridContainer.className = "products-grid";
    app.appendChild(productsGridContainer);
}

function applyFilterAndRender() {
    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(currentFilter.search.toLowerCase());
        const matchesCategory = currentFilter.category === "all" || product.category === currentFilter.category;
        return matchesSearch && matchesCategory;
    });

    if (currentFilter.sortBy === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilter.sortBy === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentFilter.sortBy === "name-az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilter.sortBy === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

function renderProducts(productsList) {
    productsGridContainer.innerHTML = ""; 
    if (productsList.length === 0) {
        const noProductMsg = document.createElement("p");
        noProductMsg.textContent = "Không tìm thấy sản phẩm phù hợp.";
        noProductMsg.style.gridColumn = "1 / -1";
        noProductMsg.style.textAlign = "center";
        noProductMsg.style.padding = "40px";
        productsGridContainer.appendChild(noProductMsg);
        return;
    }

    productsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "product-image";
        card.appendChild(img);

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;
        info.appendChild(name);

        const meta = document.createElement("div");
        meta.className = "product-meta";
        meta.textContent = `Danh mục: ${categories[product.category]} | ⭐ ${product.rating}`;
        info.appendChild(meta);

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = `${product.price.toLocaleString('vi-VN')} đ`;
        info.appendChild(price);

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn btn-add-cart";
        btnAdd.textContent = product.inStock ? "Thêm vào giỏ" : "Hết hàng";
        if (!product.inStock) btnAdd.disabled = true;
        
        btnAdd.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart();
        });

        info.appendChild(btnAdd);
        card.appendChild(info);

        card.addEventListener("click", () => showProductModal(product));

        productsGridContainer.appendChild(card);
    });
}

function searchProducts(keyword) {
    currentFilter.search = keyword;
    applyFilterAndRender();
}

function filterByCategory(categoryKey) {
    currentFilter.category = categoryKey;
    
    const buttons = document.querySelectorAll("[data-category]");
    buttons.forEach(btn => {
        if (btn.getAttribute("data-category") === categoryKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    applyFilterAndRender();
}

function sortProducts(sortValue) {
    currentFilter.sortBy = sortValue;
    applyFilterAndRender();
}

function showProductModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => overlay.remove());
    modal.appendChild(closeBtn);

    const title = document.createElement("h2");
    title.style.marginBottom = "15px";
    title.textContent = product.name;
    modal.appendChild(title);

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    img.style.marginBottom = "15px";
    modal.appendChild(img);

    const details = document.createElement("p");
    details.style.lineHeight = "1.6";
    details.innerHTML = `
        <strong>Giá bán:</strong> <span style="color:#e44d26; font-weight:bold">${product.price.toLocaleString('vi-VN')} đ</span><br>
        <strong>Danh mục:</strong> ${categories[product.category]}<br>
        <strong>Đánh giá khách hàng:</strong> ${product.rating} / 5 ⭐<br>
        <strong>Trạng thái kho:</strong> ${product.inStock ? '<span style="color:green">Còn hàng</span>' : '<span style="color:red">Tạm hết hàng</span>'}<br><br>
        <em>Mô tả giả định: Đây là thông tin chi tiết của sản phẩm ${product.name}, dòng sản phẩm cao cấp phân phối chính hãng.</em>
    `;
    modal.appendChild(details);

    overlay.appendChild(modal);
    
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
}

function addToCart() {
    cartCount++;
    cartBadgeElement.textContent = cartCount;
    
    cartBadgeElement.style.transform = "scale(1.3)";
    setTimeout(() => {
        cartBadgeElement.style.transform = "scale(1)";
    }, 200);
}

document.addEventListener("DOMContentLoaded", () => {
    initLayout();            
    applyFilterAndRender();   
});