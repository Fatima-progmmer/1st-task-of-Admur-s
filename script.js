
const registerForm = $('#register-form');
const loginForm = $('#login-form');
const toggleBtn = $('.toggle-form-btn');
const verifyemail = $('#verify-email');
const registerBtn = $('register-btn');
const verifyOtp = $('#verify-otp-btn');


toggleBtn.on('click', function () {
    registerForm.toggle();
    loginForm.toggle();
});
registerForm.on('submit', function (e) {
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();
    registerForm.hide();
    verifyemail.fadeIn(300);
});

$('#resend-otp').on('click', function () {
    const otp = $('#otp').val();
    const popup = $('<div id="popup">OTP resent successfully!</div>');
    const background = $('<div class="popup-background"></div>');
    $('body').append(background);
    $('body').append(popup);
    setTimeout(function () {
        popup.remove();
        background.remove();
        $('#otp').siblings('.invalid-feedback'.show());
    }, 4000);
});

verifyOtp.on('click', function (e) {
    e.preventDefault();
    const otpValue = $('#otp').val();
    if (otpValue == 1234) {
        $('#verify-email').hide();
        $('#success-message').show();
    }
    if (otp === '') {
        $('#otp').siblings('.invalid-feedback').show();
        $('#otp').focus();
    }
});
$('#login-form').on('submit', function (e) {
    e.preventDefault();

    const email = $('#login-email').val().trim();
    const password = $('#login-password').val().trim();
    const rememberMe = $('#remember-me').is(':checked');

    // Validate input
    if (email === '' || password === '') {
        alert('Please fill all fields');
        return;
    }

    // Retrieve stored credentials
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (rememberMe) {
        // Store credentials in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    } else {
        // Clear stored credentials
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
    // Auto-fill credentials on next visit
    if (storedEmail && storedPassword) {
        $('#login-email').val(storedEmail);
        $('#login-password').val(storedPassword);
        $('#remember-me').prop('checked', true);
    }

    // Show dashboard interface
    $('#login-form').hide();
    $('.dashboard').show();
});
