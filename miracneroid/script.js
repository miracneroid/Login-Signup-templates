// DOM Elements
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const submitBtn = document.getElementById('submitBtn');
const toggleMode = document.getElementById('toggleMode');
const toggleQuestion = document.getElementById('toggleQuestion');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const forgotPassword = document.getElementById('forgotPassword');
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const confirmPasswordInput = document.getElementById('confirmPassword');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastDescription = document.getElementById('toastDescription');
const toastClose = document.getElementById('toastClose');

// State
let isLogin = true;
let showPassword = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateUI();
    attachEventListeners();
});

// Event Listeners
function attachEventListeners() {
    // Form submission
    authForm.addEventListener('submit', handleSubmit);
    
    // Toggle between login and signup
    toggleMode.addEventListener('click', toggleAuthMode);
    
    // Password visibility toggle
    passwordToggle.addEventListener('click', togglePasswordVisibility);
    
    // Toast close
    toastClose.addEventListener('click', hideToast);
    
    // Auto-hide toast after 5 seconds
    let toastTimeout;
    
    // Social button clicks
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.textContent.trim();
            showToast(
                `${provider} Login`,
                `Redirecting to ${provider} authentication...`,
                'info'
            );
        });
    });
    
    // Forgot password click
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function() {
            showToast(
                'Password Reset',
                'Password reset link would be sent to your email.',
                'info'
            );
        });
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Basic validation
    if (!email || !password) {
        showToast(
            'Validation Error',
            'Please fill in all required fields.',
            'error'
        );
        return;
    }
    
    if (!isLogin && password !== confirmPassword) {
        showToast(
            'Password Mismatch',
            'Passwords do not match. Please try again.',
            'error'
        );
        return;
    }
    
    if (password.length < 6) {
        showToast(
            'Weak Password',
            'Password must be at least 6 characters long.',
            'error'
        );
        return;
    }
    
    // Simulate API call
    submitBtn.textContent = isLogin ? 'Signing In...' : 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = isLogin ? 'Sign In' : 'Create Account';
        submitBtn.disabled = false;
        
        showToast(
            isLogin ? 'Welcome Back!' : 'Account Created!',
            isLogin 
                ? 'You\'ve successfully logged in.' 
                : 'Your account has been created successfully.',
            'success'
        );
        
        // Reset form
        authForm.reset();
    }, 2000);
}

// Toggle between login and signup modes
function toggleAuthMode() {
    isLogin = !isLogin;
    updateUI();
    
    // Reset form
    authForm.reset();
    
    // Add animation class to confirm password group
    if (!isLogin) {
        setTimeout(() => {
            confirmPasswordGroup.style.display = 'flex';
            confirmPasswordGroup.classList.add('slide-in-animation');
        }, 50);
    } else {
        confirmPasswordGroup.style.display = 'none';
        confirmPasswordGroup.classList.remove('slide-in-animation');
    }
}

// Update UI based on current mode
function updateUI() {
    if (isLogin) {
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Enter your credentials to continue';
        submitBtn.textContent = 'Sign In';
        toggleQuestion.textContent = 'Don\'t have an account?';
        toggleMode.textContent = 'Sign up';
        forgotPassword.style.display = 'flex';
        confirmPasswordGroup.style.display = 'none';
        confirmPasswordInput.required = false;
    } else {
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Start your journey with us today';
        submitBtn.textContent = 'Create Account';
        toggleQuestion.textContent = 'Already have an account?';
        toggleMode.textContent = 'Sign in';
        forgotPassword.style.display = 'none';
        confirmPasswordGroup.style.display = 'flex';
        confirmPasswordInput.required = true;
    }
}

// Toggle password visibility
function togglePasswordVisibility() {
    showPassword = !showPassword;
    const eyeClosed = passwordToggle.querySelector('.eye-closed');
    const eyeOpen = passwordToggle.querySelector('.eye-open');
    
    if (showPassword) {
        passwordInput.type = 'text';
        eyeClosed.style.display = 'none';
        eyeOpen.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeClosed.style.display = 'block';
        eyeOpen.style.display = 'none';
    }
}

// Show toast notification
function showToast(title, description, type = 'info') {
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Add type-specific styling
    toast.className = 'toast show';
    if (type === 'error') {
        toast.style.borderColor = 'hsl(0, 84%, 60%)';
        toastTitle.style.color = 'hsl(0, 84%, 60%)';
    } else if (type === 'success') {
        toast.style.borderColor = 'hsl(142, 76%, 36%)';
        toastTitle.style.color = 'hsl(142, 76%, 36%)';
    } else {
        toast.style.borderColor = 'var(--border)';
        toastTitle.style.color = 'var(--foreground)';
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

// Hide toast notification
function hideToast() {
    toast.classList.remove('show');
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const card = document.querySelector('.auth-card');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

// Add CSS class for slide-in animation
const style = document.createElement('style');
style.textContent = `
    .slide-in-animation {
        animation: slide-in 0.5s ease-out;
    }
`;
document.head.appendChild(style);