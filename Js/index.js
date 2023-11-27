$(document).ready(
    function ajaxCall() {
   
   var username = localStorage.getItem('username');
   var expireTime = localStorage.getItem('expireTime');
   var currentTime = new Date().getTime();

   if (username && expireTime && currentTime < expireTime) {
       
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
                   expireTime.setMinutes(expireTime.getMinutes() + 1); // Example: session expires in 30 minutes
                   localStorage.setItem('username', username);
                   localStorage.setItem('expireTime', expireTime.getTime());
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