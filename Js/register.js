$(document).ready(
    function ajaxCall() {
    var session = localStorage.getItem('session');
    var expireTime = localStorage.getItem('expireTime');
    var currentTime = new Date().getTime();

    if (session && expireTime && currentTime < expireTime) {
        
        window.location.href = 'http://localhost:5500/Style/home.html';
    }
 
    $("#registerForm").submit(function(event) {
        event.preventDefault(); 
 
        
        var formData = $(this).serialize();

       
        $.ajax({
            url: 'http://localhost/Loginform/php/register.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                
                window.location.href = ' http://localhost:5500/Style/index.html';
                console.log(response);
            },
            error: function(xhr, status, error) {
                
                console.error('Error:', status, error);
            }
        });
    }); 
});
