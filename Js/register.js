$(document).ready(
    function ajaxCall() {
    var username = localStorage.getItem('username');
    var expireTime = localStorage.getItem('expireTime');
    var currentTime = new Date().getTime();

    if (username && expireTime && currentTime < expireTime) {
        // Redirect to home.html
        window.location.href = 'http://localhost:5500/Style/home.html';
    }
    // Intercept form submission
    $("#registerForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var formData = $(this).serialize();

        // Perform AJAX POST request
        $.ajax({
            url: 'http://localhost/Loginform/php/register.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                // Handle the response from the server 
                window.location.href = ' http://localhost:5500/Style/index.html';
                console.log(response);
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Error:', status, error);
            }
        });
    }); 
});
