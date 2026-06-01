// ============================================
// FORM VALIDATOR - Real-time Validation
// ============================================

const formValidator = {
    form: document.querySelector('#registrationForm'),
    fields: {},
    isFormValid: false,
    
    // Form fields
    fullName: document.querySelector('#fullName'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    confirmPassword: document.querySelector('#confirmPassword'),
    phone: document.querySelector('#phone'),
    agreeTerms: document.querySelector('#agreeTerms'),
    
    // DOM Elements
    submitBtn: document.querySelector('#submitBtn'),
    togglePassword: document.querySelector('#togglePassword'),
    successModal: document.querySelector('#successModal'),
    closeModal: document.querySelector('#closeModal'),
    successInfo: document.querySelector('#successInfo'),
    
    // Initialize
    init() {
        this.setupValidation();
        this.attachEventListeners();
    },
    
    // ========== EVENT LISTENERS ==========
    attachEventListeners() {
        // Real-time validation
        this.fullName.addEventListener('input', () => this.validateName());
        this.email.addEventListener('input', () => this.validateEmail());
        this.password.addEventListener('input', () => {
            this.validatePassword();
            this.validateConfirmPassword();
        });
        this.confirmPassword.addEventListener('input', () => this.validateConfirmPassword());
        this.phone.addEventListener('input', (e) => this.formatPhoneNumber(e));
        this.agreeTerms.addEventListener('change', () => this.validateTerms());
        
        // Toggle password visibility
        this.togglePassword.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Form submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
        
        // Close modal
        this.closeModal.addEventListener('click', () => {
            this.successModal.classList.add('hidden');
            this.form.reset();
            this.resetFormUI();
        });
    },
    
    // ========== VALIDATION FUNCTIONS ==========
    setupValidation() {
        this.fields = {
            fullName: false,
            email: false,
            password: false,
            confirmPassword: false,
            phone: false,
            agreeTerms: false
        };
    },
    
    validateName() {
        const value = this.fullName.value.trim();
        const isValid = value.length >= 2 && value.length <= 50;
        
        this.updateFieldState('fullName', isValid);
        
        const errorEl = document.querySelector('#nameError');
        if (!isValid && value.length > 0) {
            errorEl.textContent = value.length < 2 
                ? 'Tên phải có ít nhất 2 ký tự' 
                : 'Tên không được vượt quá 50 ký tự';
        } else {
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    validateEmail() {
        const value = this.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        
        this.updateFieldState('email', isValid);
        
        const errorEl = document.querySelector('#emailError');
        if (!isValid && value.length > 0) {
            errorEl.textContent = 'Email không hợp lệ';
        } else {
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    validatePassword() {
        const value = this.password.value;
        const strength = this.getPasswordStrength(value);
        
        // Check if password meets strong requirements for form validity
        const isValid = strength === 'strong';
        
        this.updateFieldState('password', isValid);
        
        // Update strength meter
        this.updatePasswordStrength(value);
        
        const errorEl = document.querySelector('#passwordError');
        if (!isValid && value.length > 0) {
            errorEl.textContent = 'Mật khẩu phải mạnh (tối thiểu 8 ký tự, chữ hoa, thường, số, ký tự đặc biệt)';
        } else {
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    validateConfirmPassword() {
        const password = this.password.value;
        const confirmPassword = this.confirmPassword.value;
        const isValid = password === confirmPassword && password.length > 0;
        
        this.updateFieldState('confirmPassword', isValid);
        
        const confirmIcon = document.querySelector('#confirmIcon');
        const errorEl = document.querySelector('#confirmError');
        
        if (confirmPassword.length > 0 && !isValid) {
            confirmIcon.textContent = '✗';
            confirmIcon.style.color = '#e74c3c';
            errorEl.textContent = 'Mật khẩu xác nhận không khớp';
        } else {
            confirmIcon.textContent = '';
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    validatePhone() {
        const value = this.phone.value.replace(/\D/g, '');
        const isValid = value.length === 10;
        
        this.updateFieldState('phone', isValid);
        
        const errorEl = document.querySelector('#phoneError');
        if (!isValid && value.length > 0) {
            errorEl.textContent = `Số điện thoại phải có 10 chữ số (đã nhập: ${value.length})`;
        } else {
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    validateTerms() {
        const isValid = this.agreeTerms.checked;
        this.updateFieldState('agreeTerms', isValid);
        
        const errorEl = document.querySelector('#termsError');
        if (!isValid) {
            errorEl.textContent = 'Bạn phải đồng ý với Điều khoản dịch vụ';
        } else {
            errorEl.textContent = '';
        }
        
        this.checkFormValidity();
    },
    
    // ========== UTILITY FUNCTIONS ==========
    updateFieldState(fieldName, isValid) {
        this.fields[fieldName] = isValid;
        
        const inputElement = this[fieldName];
        if (inputElement && inputElement.type !== 'checkbox') {
            if (isValid) {
                inputElement.classList.remove('invalid');
                inputElement.classList.add('valid');
            } else if (inputElement.value.length > 0) {
                inputElement.classList.remove('valid');
                inputElement.classList.add('invalid');
            } else {
                inputElement.classList.remove('valid', 'invalid');
            }
        }
    },
    
    getPasswordStrength(password) {
        if (!password) return 'none';
        
        const hasLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        const met = [hasLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
        
        if (met <= 2) return 'weak';
        if (met === 3 || met === 4) return 'medium';
        return 'strong';
    },
    
    updatePasswordStrength(password) {
        const strengthFill = document.querySelector('#strengthFill');
        const strengthText = document.querySelector('#strengthText');
        const strength = this.getPasswordStrength(password);
        
        // Update requirements
        const requirements = [
            { id: 'req1', test: password.length >= 8 },
            { id: 'req2', test: /[A-Z]/.test(password) },
            { id: 'req3', test: /[a-z]/.test(password) },
            { id: 'req4', test: /[0-9]/.test(password) },
            { id: 'req5', test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) }
        ];
        
        requirements.forEach(req => {
            const el = document.querySelector(`#${req.id}`).parentElement;
            if (req.test) {
                el.classList.add('met');
            } else {
                el.classList.remove('met');
            }
        });
        
        // Update strength bar
        strengthFill.className = 'strength-fill';
        
        if (strength === 'weak') {
            strengthFill.classList.add('weak');
            strengthText.textContent = '🔴 Yếu - Thêm ký tự đặc biệt';
            strengthText.style.color = '#e74c3c';
        } else if (strength === 'medium') {
            strengthFill.classList.add('medium');
            strengthText.textContent = '🟡 Trung bình - Thêm ký tự đặc biệt';
            strengthText.style.color = '#f39c12';
        } else if (strength === 'strong') {
            strengthFill.classList.add('strong');
            strengthText.textContent = '🟢 Mạnh - Mật khẩu tuyệt vời!';
            strengthText.style.color = '#2ecc71';
        } else {
            strengthText.textContent = '';
        }
    },
    
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Format: 0901-234-567
        let formatted = '';
        if (value.length > 0) {
            formatted = value.slice(0, 4);
            if (value.length > 4) {
                formatted += '-' + value.slice(4, 7);
            }
            if (value.length > 7) {
                formatted += '-' + value.slice(7, 10);
            }
        }
        
        this.phone.value = formatted;
        
        // Validate after formatting
        if (value.length === 10) {
            this.validatePhone();
        }
    },
    
    togglePasswordVisibility() {
        const type = this.password.type === 'password' ? 'text' : 'password';
        this.password.type = type;
        
        // Also toggle confirm password
        this.confirmPassword.type = type;
        
        // Update icon
        this.togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    },
    
    checkFormValidity() {
        this.isFormValid = Object.values(this.fields).every(v => v === true);
        this.submitBtn.disabled = !this.isFormValid;
    },
    
    submitForm() {
        if (!this.isFormValid) {
            alert('Vui lòng điền đầy đủ và hợp lệ tất cả các trường!');
            return;
        }
        
        // Collect data
        const formData = {
            fullName: this.fullName.value,
            email: this.email.value,
            phone: this.phone.value.replace(/\D/g, ''),
            registeredAt: new Date().toLocaleString('vi-VN')
        };
        
        // Show success modal
        this.showSuccessModal(formData);
    },
    
    showSuccessModal(data) {
        this.successInfo.innerHTML = `
            <p><strong>Tên:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Số điện thoại:</strong> ${data.phone}</p>
            <p><strong>Thời gian đăng ký:</strong> ${data.registeredAt}</p>
        `;
        this.successModal.classList.remove('hidden');
    },
    
    resetFormUI() {
        // Reset field states
        this.setupValidation();
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Reset password strength
        document.querySelector('#strengthFill').className = 'strength-fill';
        document.querySelector('#strengthText').textContent = '';
        document.querySelectorAll('.req-item').forEach(item => {
            item.classList.remove('met');
        });
        
        // Reset button
        this.submitBtn.disabled = true;
        
        // Reset password visibility
        this.password.type = 'password';
        this.confirmPassword.type = 'password';
        this.togglePassword.textContent = '👁️';
    }
};

// ========== START APP ==========
document.addEventListener('DOMContentLoaded', () => {
    formValidator.init();
});
