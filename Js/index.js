$(document).ready(
     function ajaxCall() {
    
    var session = localStorage.getItem('session');
    var expireTime = localStorage.getItem('expireTime');
    var currentTime = new Date().getTime();

    if (session && expireTime && currentTime < expireTime) {
       
        window.location.href = 'http://localhost:5500/Style/home.html';
    }

    
    $("#loginForm").submit(function(event) {
        event.preventDefault(); 

        
        var formData = $(this).serialize();

        
        $.ajax({
            url: 'http://localhost/Loginform/php/login.php',
            type: 'POST',
            data: formData,
            dataType: 'json', 
            success: function(response) {
                
        
                if (response.status === 'success') {
                    alert('Logged: ' + response.status);  
                    var username = $('#username').val();
                    var expireTime = new Date();
                    expireTime.setMinutes(expireTime.getMinutes() + 1); 
                    localStorage.setItem('session', response.session);
                    localStorage.setItem('expireTime', expireTime.getTime()+60);
                    window.location.href = 'http://localhost:5500/Style/home.html';
                } else {
                  
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
              
                console.error('Error:', status, error);
            }
        });
        
    }); 
}); 