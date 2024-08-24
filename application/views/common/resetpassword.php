<div class="header">
    <p class="lead">Reset my password</p>
</div>
<div class="body">
    <p>Please enter your new password below.</p>
    <form class="form-auth-small" action="" name="reset_password" id="reset_password" method="POST">
        <div class="form-group">
            <input type="password" class="form-control" name="new_password" id="new_password" placeholder="New Password" required>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required>
        </div>
        <!-- Hidden input to store the employee_id -->
        <input type="hidden" name="employee_id" id="hiddenEmployeeId" value="">
        <button type="submit" class="btn btn-primary btn-lg btn-block btnsmt">RESET PASSWORD</button>
        <div class="bottom">
            <span class="helper-text">Know your password? <a href="<?= base_url() . 'signin' ?>">Login</a></span>
        </div>
    </form>
    <div class="alert d-none text-center" role="alert"></div>
</div>


<script>
    $(document).ready(function() {

        $('#reset_password').validate({
            rules: {
                new_password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#new_password"
                }
            },
            messages: {
                new_password: {
                    required: "Please enter your new password.",
                    minlength: "Your password must be at least 6 characters long."
                },
                confirm_password: {
                    required: "Please confirm your new password.",
                    equalTo: "Passwords do not match."
                }
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var companyid = localStorage.getItem('company_id');
                $('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');

                var formData = new FormData(form);
                if (companyid) {
                    formData.append('id', companyid);
                }
                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'common/forgot_password_post',
                        processData: false,
                        contentType: false,
                        cache: false,
                        async: false,
                        data: formData,
                        success: function(result) {
                            var obj = $.parseJSON(result);
                            if (obj.status == '1') {
                                localStorage.removeItem('company_id');
                                setTimeout(function() {
                                    window.location.href = base_url + 'signin';
                                }, 2000);
                            } else {
                                $('.alert').html(obj.msg).removeClass('d-none').addClass('alert-danger');
                                $('.btnsmt').prop('disabled', false).html('RESET PASSWORD');
                                fadeAlert();
                            }
                        },
                        error: function(error) {
                            $('.alert').html('Something went wrong! Please try again.').removeClass('d-none').addClass('alert-danger');
                            $('.btnsmt').prop('disabled', false).html('RESET PASSWORD');
                            fadeAlert();
                        }
                    });
                }, 500);
                return false;
            }
        });
    });
</script>