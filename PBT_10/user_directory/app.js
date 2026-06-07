// ==========================================================================
// 1. TÁCH RIÊNG API LAYER (Giao tiếp HTTP tĩnh với Máy chủ)
// ==========================================================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    // Thao tác thiết lập Helper để tránh trùng lặp cấu trúc code fetch
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = { 'Content-Type': 'application/json; charset=UTF-8', ...options.headers };
        
        const response = await fetch(url, { ...options, headers });
        
        if (!response.ok) {
            throw new Error(`Yêu cầu hệ thống thất bại (Mã phản hồi HTTP: ${response.status})`);
        }
        return await response.json();
    },

    async getUsers() {
        return await this.request("/users", { method: "GET" });
    },
    
    async getUser(id) {
        return await this.request(`/users/${id}`, { method: "GET" });
    },
    
    async createUser(data) {
        return await this.request("/users", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },
    
    async updateUser(id, data) {
        return await this.request(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    },
    
    async deleteUser(id) {
        return await this.request(`/users/${id}`, { method: "DELETE" });
    }
};

// ==========================================================================
// 2. TÁCH RIÊNG UI LAYER (Điều khiển và Biến đổi dữ liệu đồ họa)
// ==========================================================================
const ui = {
    gridElement: document.getElementById('users-grid'),
    toastContainer: document.querySelector('.toast-container'),
    bootstrapModal: new bootstrap.Modal(document.getElementById('userModal')),
    formElement: document.getElementById('user-form'),

    // Thiết kế cấu trúc hiển thị danh sách người dùng (Cards)
    renderUsers(users) {
        this.gridElement.innerHTML = '';
        
        if (users.length === 0) {
            this.gridElement.innerHTML = `
                <div class="col-12 text-center py-5">
                    <span class="fs-2">🔍</span>
                    <p class="text-muted mt-2 fw-medium">Không tìm thấy thành viên nào khớp với từ khóa tìm kiếm.</p>
                </div>
            `;
            return;
        }

        users.forEach((user, index) => {
            const cardCol = document.createElement('div');
            cardCol.className = "col-12 col-md-6 col-lg-4 fade-in-item";
            // Set độ trễ animation nhỏ để các thẻ hiện tuần tự đẹp mắt
            cardCol.style.animationDelay = `${index * 0.05}s`; 

            // Phân giải dữ liệu công ty lồng nhau phòng trường hợp cấu trúc object bị thiếu hụt
            const companyName = user.company && typeof user.company === 'object' ? user.company.name : (user.company || 'N/A');

            cardCol.innerHTML = `
                <div class="card card-custom card-user h-100 p-4 shadow-sm">
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <div class="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-center font-bold fs-5 shadow-sm" style="width: 48px; height: 48px; min-width: 48px;">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="overflow-hidden">
                            <h5 class="card-title fw-bold text-dark text-truncate mb-0" title="${user.name}">${user.name}</h5>
                            <small class="text-primary fw-semibold text-truncate d-block small mt-0.5">${companyName}</small>
                        </div>
                    </div>
                    <div class="card-body p-0 mb-4 text-secondary small">
                        <div class="mb-1.5 text-truncate"><strong>📧 Email:</strong> ${user.email}</div>
                        <div class="text-truncate"><strong>📞 Phone:</strong> ${user.phone}</div>
                    </div>
                    <div class="d-flex gap-2 mt-auto pt-3 border-top border-light">
                        <button class="btn btn-sm btn-outline-secondary rounded-3 px-3 w-50 btn-edit" data-id="${user.id}">✏️ Sửa</button>
                        <button class="btn btn-sm btn-outline-danger rounded-3 px-3 w-50 btn-delete" data-id="${user.id}">🗑️ Xóa</button>
                    </div>
                </div>
            `;
            this.gridElement.appendChild(cardCol);
        });
    },

    // Hiển thị khung xương tải giả lập (Skeleton Loader) theo form 6 ô lưới
    showLoading() {
        this.gridElement.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeletonCol = document.createElement('div');
            skeletonCol.className = "col-12 col-md-6 col-lg-4";
            skeletonCol.innerHTML = `
                <div class="card card-custom p-4 shadow-sm h-100">
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <div class="skeleton skeleton-avatar"></div>
                        <div class="w-100">
                            <div class="skeleton skeleton-title"></div>
                            <div class="skeleton skeleton-text" style="width: 40%;"></div>
                        </div>
                    </div>
                    <div class="skeleton skeleton-text mt-2"></div>
                    <div class="skeleton skeleton-text" style="width: 80%;"></div>
                    <div class="d-flex gap-2 mt-4 pt-3 border-top border-light">
                        <div class="skeleton" style="width: 50%; height: 31px; border-radius: 8px;"></div>
                        <div class="skeleton" style="width: 50%; height: 31px; border-radius: 8px;"></div>
                    </div>
                </div>
            `;
            this.gridElement.appendChild(skeletonCol);
        }
    },

    hideLoading() {
        // Đã được xử lý ghi đè trực tiếp khi hàm renderUsers() được kích hoạt chạy đổ dữ liệu
    },

    // Quét dựng Toast thông báo động theo cấu trúc chuẩn của Bootstrap 5
    createToast(message, type = 'success') {
        const toastId = `toast-${Date.now()}`;
        const isSuccess = type === 'success';
        const bgHeader = isSuccess ? 'bg-success' : 'bg-danger';
        const icon = isSuccess ? '✅' : '❌';
        const title = isSuccess ? 'Thành công' : 'Lỗi hệ thống';

        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${bgHeader} text-white">
                    <span class="me-2">${icon}</span>
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body bg-white font-medium text-dark small">
                    ${message}
                </div>
            </div>
        `;

        this.toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const toastNode = document.getElementById(toastId);
        const bsToast = new bootstrap.Toast(toastNode, { delay: 4000 });
        bsToast.show();

        // Gắn sự kiện dọn dẹp bộ nhớ DOM sau khi toast ẩn đi hoàn toàn
        toastNode.addEventListener('hidden.bs.toast', () => {
            toastNode.remove();
        });
    },

    showError(message) {
        this.createToast(message, 'error');
    },

    showSuccess(message) {
        this.createToast(message, 'success');
    }
};

// ==========================================================================
// 3. TẦNG QUẢN LÝ TRẠNG THÁI VÀ ĐIỀU KHIỂN SỰ KIỆN (APP CONTROLLER LOGIC)
// ==========================================================================
// Mảng cục bộ đóng vai trò làm Database bộ nhớ đệm tại Client-side để thao tác không bị reload trang
let localUsersDatabase = [];

// Khởi tạo chạy và đồng bộ hóa tải dữ liệu ban đầu
async function initApp() {
    ui.showLoading();
    try {
        const usersData = await api.getUsers();
        localUsersDatabase = usersData;
        ui.renderUsers(localUsersDatabase);
    } catch (error) {
        ui.gridElement.innerHTML = `
            <div class="col-12 text-center py-5 text-danger">
                <span class="fs-1">⚠️</span>
                <p class="fw-bold mt-3">Mất kết nối dữ liệu máy chủ.</p>
                <p class="small text-muted">${error.message}</p>
            </div>
        `;
        ui.showError("Không thể tải danh sách người dùng ban đầu. Vui lòng thử lại!");
    }
}

// Lắng nghe xử lý Sự kiện Tìm kiếm Thời gian thực (Live Client-side Search)
document.getElementById('search-input').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    
    const filteredUsers = localUsersDatabase.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(keyword);
        const emailMatch = user.email.toLowerCase().includes(keyword);
        return nameMatch || emailMatch;
    });
    
    ui.renderUsers(filteredUsers);
});

// Reset Form modal khi click nút "Thêm thành viên"
document.getElementById('btn-add-user').addEventListener('click', () => {
    ui.formElement.reset();
    document.getElementById('form-user-id').value = '';
    document.getElementById('modalTitle').textContent = "Thêm thành viên mới";
    document.getElementById('btn-submit-form').disabled = false;
});

// Xử lý Sự kiện Submit Form (Cả hai tác vụ: Thêm mới CREATE hoặc Cập nhật UPDATE)
ui.formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userIdVal = document.getElementById('form-user-id').value;
    const submitBtn = document.getElementById('btn-submit-form');
    
    // Gán thông số dữ liệu từ ô nhập liệu Form
    const userData = {
        name: document.getElementById('form-name').value.trim(),
        email: document.getElementById('form-email').value.trim(),
        phone: document.getElementById('form-phone').value.trim(),
        company: {
            name: document.getElementById('form-company').value.trim()
        }
    };

    // Khóa nút bấm lại tránh gửi dữ liệu click đúp trùng lặp (Double Submissions)
    submitBtn.disabled = true;

    if (userIdVal === '') {
        // --- CHẾ ĐỘ 1: THÊM MỚI USER (CREATE) ---
        try {
            const newUserResponse = await api.createUser(userData);
            
            // Do JSONPlaceholder luôn trả về ID giả lập = 11, ta tính toán sinh ID ngẫu nhiên để không trùng khoá trên giao diện client
            newUserResponse.id = localUsersDatabase.length > 0 ? Math.max(...localUsersDatabase.map(u => u.id)) + 1 : 1;
            
            // Đưa dữ liệu mới lên đầu mảng để người dùng quan sát thấy ngay lập tức
            localUsersDatabase.unshift(newUserResponse);
            
            // Re-render kết quả
            ui.renderUsers(localUsersDatabase);
            ui.bootstrapModal.hide();
            ui.showSuccess(`Đã tạo thành công tài khoản thành viên "${newUserResponse.name}".`);
        } catch (error) {
            ui.showError(`Lỗi thêm mới: ${error.message}`);
            submitBtn.disabled = false;
        }
    } else {
        // --- CHẾ ĐỘ 2: CẬP NHẬT USER (UPDATE) ---
        const id = parseInt(userIdVal);
        try {
            const updatedUserResponse = await api.updateUser(id, userData);
            updatedUserResponse.id = id; // Đảm bảo giữ nguyên khóa định danh ID gốc

            // Tìm vị trí phần tử cũ trong mảng bộ nhớ để sửa đè thông tin
            const index = localUsersDatabase.findIndex(user => user.id === id);
            if (index !== -1) {
                localUsersDatabase[index] = updatedUserResponse;
            }

            ui.renderUsers(localUsersDatabase);
            ui.bootstrapModal.hide();
            ui.showSuccess(`Đã cập nhật thông tin thành viên "${updatedUserResponse.name}" thành công.`);
        } catch (error) {
            ui.showError(`Lỗi cập nhật: ${error.message}`);
            submitBtn.disabled = false;
        }
    }
});

// Lắng nghe và xử lý Uỷ quyền Sự kiện (Event Delegation) cho các nút bấm Sửa / Xóa bên trong Grid lưới
ui.gridElement.addEventListener('click', async (e) => {
    // TÁC VỤ 1: CLICK BẤM NÚT SỬA (EDIT USER)
    if (e.target.classList.contains('btn-edit')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const user = localUsersDatabase.find(u => u.id === id);
        
        if (!user) return;

        // Điền sẵn dữ liệu cũ tìm thấy vào Form Modal
        document.getElementById('form-user-id').value = user.id;
        document.getElementById('form-name').value = user.name;
        document.getElementById('form-email').value = user.email;
        document.getElementById('form-phone').value = user.phone;
        document.getElementById('form-company').value = user.company && typeof user.company === 'object' ? user.company.name : (user.company || '');
        
        document.getElementById('modalTitle').textContent = "Chỉnh sửa thông tin thành viên";
        document.getElementById('btn-submit-form').disabled = false;
        
        // Mở modal lên
        ui.bootstrapModal.show();
    }

    // TÁC VỤ 2: CLICK BẤM NÚT XÓA (DELETE USER)
    if (e.target.classList.contains('btn-delete')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const user = localUsersDatabase.find(u => u.id === id);
        
        if (!user) return;

        // Hiển thị hộp thoại Confirm xác nhận tiêu chuẩn hệ thống trước khi xóa
        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa thành viên "${user.name}" ra khỏi danh sách quản lý không? Hành động này không thể hoàn tác.`);
        
        if (confirmDelete) {
            try {
                // Gọi API gửi lệnh xóa bất đồng bộ lên Server
                await api.deleteUser(id);
                
                // Đồng bộ xóa phần tử ra khỏi mảng cục bộ ảo máy Client
                localUsersDatabase = localUsersDatabase.filter(u => u.id !== id);
                
                // Re-render làm sạch giao diện
                ui.renderUsers(localUsersDatabase);
                ui.showSuccess(`Đã xóa thành viên "${user.name}" thành công.`);
            } catch (error) {
                ui.showError(`Không thể xóa người dùng: ${error.message}`);
            }
        }
    }
});

// Kích hoạt khởi động hệ thống ứng dụng ngay khi trang Web load thành công
document.addEventListener('DOMContentLoaded', initApp);