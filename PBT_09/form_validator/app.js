// --- TRUY XUẤT CÁC PHẦN TỬ INPUT DOM ---
const form = document.getElementById('register-form');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const inputConfirm = document.getElementById('input-confirm');
const inputPhone = document.getElementById('input-phone');
const btnSubmit = document.getElementById('btn-submit');

// --- THANH METER MẬT KHẨU ---
const strengthBar = document.getElementById('password-strength-bar');
const strengthText = document.getElementById('password-strength-text');

// Biến chứa cấu hình thông báo lỗi toàn cục nạp từ JSON
let configData = null;

// Đối tượng theo dõi trạng thái hợp lệ của từng trường (Mặc định false)
const formStatus = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// --- HÀM 1: TẢI ĐỘNG CẤU HÌNH TỪ FILE DATA.JSON ---
async function loadConfig() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Không thể nạp tệp dữ liệu lỗi.");
        configData = await response.json();
        
        // Đổ thông tin tiêu đề tĩnh lên HTML
        document.getElementById('form-title').textContent = configData.formTitle;
        document.getElementById('form-subtitle').textContent = configData.formSubtitle;
    } catch (error) {
        console.error("Lỗi cấu hình:", error);
    }
}

// --- HÀM TỔNG HỢP: CẬP NHẬT UI TRẠNG THÁI CHO TỪNG INPUT ---
function updateUIFeedback(field, isValid, customErrorMsg = "") {
    const inputEl = document.getElementById(`input-${field}`);
    const iconEl = document.getElementById(`icon-${field}`);
    const errEl = document.getElementById(`err-${field}`);

    // Ghi nhận trạng thái logic vào biến theo dõi toàn cục
    formStatus[field] = isValid;

    if (isValid) {
        inputEl.classList.remove('is-invalid-custom');
        inputEl.classList.add('is-valid-custom');
        iconEl.textContent = "✅";
        errEl.textContent = "";
    } else {
        inputEl.classList.remove('is-valid-custom');
        inputEl.classList.add('is-invalid-custom');
        iconEl.textContent = "❌";
        errEl.textContent = customErrorMsg;
    }

    // Luôn kiểm tra để bật/tắt nút Submit sau mỗi lần thay đổi của mọi trường
    checkFormValidity();
}

// --- HÀM KIỂM TRA TRẠNG THÁI ĐỂ KÍCH HOẠT NÚT SUBMIT ---
function checkFormValidity() {
    // Nếu tất cả các thuộc tính trong đối tượng formStatus đều true -> Cho phép submit
    const isAllValid = Object.values(formStatus).every(status => status === true);
    btnSubmit.disabled = !isAllValid;
}

// ==========================================================================
// THỰC THI VALIDATION REAL-TIME CHO TỪNG TRƯỜNG QUA SỰ KIỆN 'INPUT'
// ==========================================================================

// 1. Validate Tên (Từ 2 đến 50 ký tự)
inputName.addEventListener('input', () => {
    const value = inputName.value.trim();
    // Regex đơn giản tránh ký tự đặc biệt, chấp nhận chữ Việt Nam có dấu
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲÝYỶỸửữựỳýỵỷỹ\s]{2,50}$/;

    if (nameRegex.test(value)) {
        updateUIFeedback('name', true);
    } else {
        updateUIFeedback('name', false, configData?.errors.name || "Tên không hợp lệ.");
    }
});

// 2. Validate Email (Sử dụng biểu thức chính quy Regex chuẩn hóa)
inputEmail.addEventListener('input', () => {
    const value = inputEmail.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(value)) {
        updateUIFeedback('email', true);
    } else {
        updateUIFeedback('email', false, configData?.errors.email || "Email không đúng định dạng.");
    }
});

// 3. Validate Password Strength Meter (Đo độ mạnh mật khẩu và đổi màu Progress)
inputPassword.addEventListener('input', () => {
    const value = inputPassword.value;
    let score = 0;

    if (value.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = "Mật khẩu trống";
        strengthText.className = "text-muted text-end small fw-semibold mt-1";
        updateUIFeedback('password', false, "");
        return;
    }

    // Điều kiện 1: Độ dài tối thiểu 8 ký tự
    if (value.length >= 8) score++;
    // Điều kiện 2: Có chứa cả chữ và số
    if (/[a-zA-Z]/.test(value) && /[0-9]/.test(value)) score++;
    // Điều kiện 3: Có chứa chữ hoa, chữ thường, số và ký tự đặc biệt
    if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;

    // BƯỚC QUÉT VÀ ĐỔI MÀU PROGRESS BAR THEO KẾT QUẢ ĐO LỰC
    if (value.length < 8) {
        // YẾU (Màu đỏ)
        strengthBar.style.width = '30%';
        strengthBar.className = "progress-bar bg-danger";
        strengthText.textContent = configData?.errors.password.weak || "Yếu";
        strengthText.className = "text-danger text-end small fw-semibold mt-1";
        updateUIFeedback('password', false, configData?.errors.password.tooShort);
    } else if (score === 1 || score === 2) {
        // TRUNG BÌNH (Màu vàng)
        strengthBar.style.width = '65%';
        strengthBar.className = "progress-bar bg-warning";
        strengthText.textContent = configData?.errors.password.medium || "Trung bình";
        strengthText.className = "text-warning text-end small fw-semibold mt-1";
        updateUIFeedback('password', true); // Đạt 8 ký tự trở lên coi như trường hợp lệ
    } else if (score === 3) {
        // MẠNH (Màu xanh lá)
        strengthBar.style.width = '100%';
        strengthBar.className = "progress-bar bg-success";
        strengthText.textContent = configData?.errors.password.strong || "Mạnh";
        strengthText.className = "text-success text-end small fw-semibold mt-1";
        updateUIFeedback('password', true);
    }

    // Trigger kiểm tra lại confirm password nếu người dùng sửa đổi password chính
    if (inputConfirm.value.length > 0) {
        checkConfirmPassword();
    }
});

// 4. Validate Confirm Password (Kiểm tra khớp thời gian thực)
function checkConfirmPassword() {
    const pass = inputPassword.value;
    const confirmPass = inputConfirm.value;

    if (pass === confirmPass && confirmPass.length > 0) {
        updateUIFeedback('confirm', true);
    } else {
        updateUIFeedback('confirm', false, configData?.errors.confirmPassword || "Mật khẩu không khớp.");
    }
}
inputConfirm.addEventListener('input', checkConfirmPassword);

// 5. Validate Phone (10 chữ số) + Tự thêm dấu gạch khi gõ dạng: 0901-234-567
inputPhone.addEventListener('input', (e) => {
    let input = e.target.value;
    
    // Loại bỏ toàn bộ các ký tự không phải số
    input = input.replace(/\D/g, '');
    
    // Giới hạn cứng tối đa chỉ lấy 10 số đầu vào
    if (input.length > 10) {
        input = input.substring(0, 10);
    }

    // Thực thi xử lý chèn dấu gạch ngang phân tách thông minh theo tiến trình nhập
    let formattedPhone = "";
    if (input.length > 0) {
        if (input.length <= 4) {
            formattedPhone = input;
        } else if (input.length <= 7) {
            formattedPhone = `${input.substring(0, 4)}-${input.substring(4)}`;
        } else {
            formattedPhone = `${input.substring(0, 4)}-${input.substring(4, 7)}-${input.substring(7)}`;
        }
    }

    // Ghi đè chuỗi ký tự đã được định dạng format ngược lại ô Input hiển thị
    e.target.value = formattedPhone;

    // Validate logic: Đạt đủ cấu trúc 10 chữ số (tương đương 12 ký tự bao gồm 2 dấu gạch)
    if (input.length === 10) {
        updateUIFeedback('phone', true);
    } else {
        updateUIFeedback('phone', false, configData?.errors.phone || "Số điện thoại không hợp lệ.");
    }
});

// ==========================================================================
// XỬ LÝ HÀNH VI SUBMIT FORM CUỐI CÙNG & BẬT MODAL THÔNG TIN
// ==========================================================================
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn tải lại trang mặc định

    // Đổ dữ liệu thô vào vùng tóm tắt (Summary) trên Modal thành công
    document.getElementById('summary-name').textContent = inputName.value.trim();
    document.getElementById('summary-email').textContent = inputEmail.value.trim();
    document.getElementById('summary-phone').textContent = inputPhone.value.trim();

    // Khởi tạo thực thể Bootstrap Modal hiển thị bung màn hình
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Làm sạch Form sau khi đăng ký thành công hoàn chỉnh
    form.reset();
    strengthBar.style.width = '0%';
    strengthText.textContent = "Mật khẩu trống";
    strengthText.className = "text-muted text-end small fw-semibold mt-1";
    
    // Xóa toàn bộ các class trạng thái màu viền cũ trên giao diện
    document.querySelectorAll('.form-control-custom').forEach(input => {
        input.classList.remove('is-valid-custom', 'is-invalid-custom');
    });
    document.querySelectorAll('.feedback-icon').forEach(icon => icon.textContent = "");
    
    // Đưa trạng thái các trường về mặc định và khóa nút Submit
    Object.keys(formStatus).forEach(key => formStatus[key] = false);
    checkFormValidity();
});

// KHỞI ĐỘNG HỆ THỐNG KHI TẢI XONG TRANG
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
});