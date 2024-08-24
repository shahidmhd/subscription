$(function() {
    "use strict";
       
     $("#signin").validate({
       rules: {
         username:{
            required:true
         },
         password: {
            required:true
         }
      },

      messages: {
         username:"Please enter username",
         password:"Please enter password"
      },

      submitHandler: function(form, e) {

          e.preventDefault();          
          $('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');
          var formData = new FormData(form);
          setTimeout(function(){
          $.ajax({
                type: 'POST',
                url: base_url + 'common/signinProcess',
                processData: false,
                contentType: false,
                cache: false,
                async: false,
                data: formData,
                success: function(result) {
                   var obj = $.parseJSON(result);
                   if (obj.status == '1') {
                     //$('.alert').html(obj.message).removeClass('d-none').addClass('alert-success');
                     setTimeout(function(){
                       window.location.href = base_url+'dashboard';
                     },2000);
                   } else {
                     $('.alert').html(obj.message).removeClass('d-none').addClass('alert-danger');
                     $('.btnsmt').prop('disabled', false).html('SIGN IN');
                     fadeAlert();
                   }
                },
                error: function(error) {
                    $('.alert').html('Something went wrong!').removeClass('d-none').addClass('alert-danger');
                    $('.btnsmt').prop('disabled', false).html('SIGN IN');
                    fadeAlert();
                }
            });
          },500);
            return false;
        }
  });
     
     $("#forgot").validate({
       rules: {
         username:{
            required:true
         }
      },

      messages: {
         username:"Please enter username"
      },

      submitHandler: function(form, e) {

          e.preventDefault();          
          $('.btnsmt').prop('disabled', true).html('Processing...');
          var formData = new FormData(form);        
          return false;
        
        }
  });
    
});

function fadeAlert() {
    setTimeout(function() {
        $(".alert").html('').addClass('d-none').removeClass(function (index, css) {
	      return (css.match (/\balert-\S+/g) || []).join(' ');
       });;
    }, 4000);
}