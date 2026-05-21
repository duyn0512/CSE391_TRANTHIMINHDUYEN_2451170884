document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const phone = document.getElementById("phone");
    const submitBtn = document.getElementById("submitBtn");

    const formState = {
        name: false,
        email: false,
        password: false,
        confirm: false,
        phone: false
    };

    function validateName() {
        const value = fullName.value.trim();
        const icon = document.getElementById("nameIcon");
        const error = document.getElementById("nameError");

        if (value.length >= 2 && value.length <= 50) {
            icon.textContent = "✅";
            error.textContent = "";
            formState.name = true;
        } else {
            icon.textContent = "❌";
            error.textContent = "Tên phải từ 2 đến 50 ký tự.";
            formState.name = false;
        }
        checkFormValidity();
    }

    function validateEmail() {
        const value = email.value.trim();
        const icon = document.getElementById("emailIcon");
        const error = document.getElementById("emailError");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            icon.textContent = "❌";
            error.textContent = "Email không được để trống.";
            formState.email = false;
        } else if (!emailRegex.test(value)) {
            icon.textContent = "❌";
            error.textContent = "Định dạng Email không hợp lệ (ví dụ: abc@gmail.com).";
            formState.email = false;
        } else {
            icon.textContent = "✅";
            error.textContent = "";
            formState.email = true;
        }
        checkFormValidity();
    }

    function validatePassword() {
        const value = password.value;
        const icon = document.getElementById("passwordIcon");
        const error = document.getElementById("passwordError");
        const strengthText = document.getElementById("strengthText");
        const strengthBar = document.getElementById("strengthBar");

        strengthBar.className = "progress-fill";
        strengthText.className = "strength-text";

        if (value.length === 0) {
            icon.textContent = "";
            error.textContent = "Mật khẩu không được để trống.";
            strengthText.textContent = "Độ bảo mật: Chưa nhập";
            formState.password = false;
            validateConfirmPassword(); 
            checkFormValidity();
            return;
        }

        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasSpecial = /[^a-zA-Z0-9]/.test(value);

        if (value.length < 8) {
            icon.textContent = "❌";
            error.textContent = "Mật khẩu quá ngắn (phải từ 8 ký tự trở lên).";
            strengthText.textContent = "Độ bảo mật: Yếu (Đỏ)";
            strengthText.classList.add("text-weak");
            strengthBar.classList.add("bg-weak");
            formState.password = false;
        } else if (hasLetter && hasNumber && hasUpper && hasLower && hasSpecial) {
            icon.textContent = "✅";
            error.textContent = "";
            strengthText.textContent = "Độ bảo mật: Mạnh (Xanh)";
            strengthText.classList.add("text-strong");
            strengthBar.classList.add("bg-strong");
            formState.password = true;
        } else if (hasLetter && hasNumber) {
            icon.textContent = "✅";
            error.textContent = "";
            strengthText.textContent = "Độ bảo mật: Trung bình (Vàng)";
            strengthText.classList.add("text-medium");
            strengthBar.classList.add("bg-medium");
            formState.password = true;
        } else {
            icon.textContent = "❌";
            error.textContent = "Mật khẩu phải chứa cả chữ và số.";
            strengthText.textContent = "Độ bảo mật: Yếu (Đỏ)";
            strengthText.classList.add("text-weak");
            strengthBar.classList.add("bg-weak");
            formState.password = false;
        }

        validateConfirmPassword();
        checkFormValidity();
    }

    function validateConfirmPassword() {
        const passValue = password.value;
        const confirmValue = confirmPassword.value;
        const icon = document.getElementById("confirmPasswordIcon");
        const error = document.getElementById("confirmPasswordError");

        if (confirmValue === "") {
            icon.textContent = "❌";
            error.textContent = "Vui lòng xác nhận lại mật khẩu.";
            formState.confirm = false;
        } else if (passValue !== confirmValue) {
            icon.textContent = "❌";
            error.textContent = "Mật khẩu xác nhận không khớp.";
            formState.confirm = false;
        } else {
            icon.textContent = "✅";
            error.textContent = "";
            formState.confirm = true;
        }
        checkFormValidity();
    }

    function handlePhoneInput(e) {
        let input = e.target.value;
        
        let digits = input.replace(/\D/g, "");
        
        let formatted = "";
        if (digits.length > 0) {
            formatted += digits.substring(0, 4);
        }
        if (digits.length > 4) {
            formatted += "-" + digits.substring(4, 7);
        }
        if (digits.length > 7) {
            formatted += "-" + digits.substring(7, 10);
        }

        e.target.value = formatted;

        const icon = document.getElementById("phoneIcon");
        const error = document.getElementById("phoneError");

        if (digits.length === 10) {
            icon.textContent = "✅";
            error.textContent = "";
            formState.phone = true;
        } else {
            icon.textContent = "❌";
            error.textContent = "Số điện thoại phải bao gồm đúng 10 chữ số.";
            formState.phone = false;
        }
        checkFormValidity();
    }

    function checkFormValidity() {
        const isAllValid = Object.values(formState).every(status => status === true);
        submitBtn.disabled = !isAllValid;
    }

    fullName.addEventListener("input", validateName);
    email.addEventListener("input", validateEmail);
    password.addEventListener("input", validatePassword);
    confirmPassword.addEventListener("input", validateConfirmPassword);
    phone.addEventListener("input", handlePhoneInput);

    const successModal = document.getElementById("successModal");
    const modalData = document.getElementById("modalData");
    const closeModalBtn = document.getElementById("closeModalBtn");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        modalData.innerHTML = `
            <strong>Họ và tên:</strong> ${fullName.value.trim()}<br>
            <strong>Email đăng ký:</strong> ${email.value.trim()}<br>
            <strong>Số điện thoại:</strong> ${phone.value}
        `;

        successModal.classList.add("active");
    });

    closeModalBtn.addEventListener("click", () => {
        successModal.classList.remove("active");
        form.reset();
        
        document.querySelectorAll(".status-icon").forEach(icon => icon.textContent = "");
        document.querySelectorAll(".error-message").forEach(err => err.textContent = "");
        document.getElementById("strengthBar").className = "progress-fill";
        document.getElementById("strengthText").textContent = "Độ bảo mật: Chưa nhập";
        document.getElementById("strengthText").className = "strength-text";

        Object.keys(formState).forEach(key => formState[key] = false);
        checkFormValidity();
    });
});