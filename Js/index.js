$(document).ready(
     function ajaxCall() {
    // Check if user is already logged in
    var username = localStorage.getItem('username');
    var expireTime = localStorage.getItem('expireTime');
    var currentTime = new Date().getTime();

    if (username && expireTime && currentTime < expireTime) {
        // Redirect to home.html
        window.location.href = 'http://localhost:5500/Style/home.html';
    }

    // Intercept form submission
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var formData = $(this).serialize();

        // Perform AJAX POST request
        $.ajax({
            url: 'http://localhost/Loginform/php/login.php',
            type: 'POST',
            data: formData,
            dataType: 'json', // Specify that the expected response is JSON
            success: function(response) {
                // Handle the response from the server
        
                if (response.status === 'success') {
                    alert('Logged: ' + response.status);  
                    var username = $('#username').val();
                    var expireTime = new Date();
                    expireTime.setMinutes(expireTime.getMinutes() + 1); // Example: session expires in 30 minutes
                    localStorage.setItem('username', username);
                    localStorage.setItem('expireTime', expireTime.getTime());
                    window.location.href = 'http://localhost:5500/Style/home.html';
                } else {
                    // Display error message to the user
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Error:', status, error);
            }
        });
        
    }); 
}); 