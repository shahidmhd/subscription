<div class="header">
    <p class="lead">Recover my password</p>
</div>
<div class="body">
    <p>Please enter the OTP sent to your registered email.</p>
    <form class="form-auth-small" action="" name="forgot" id="forgot" method="POST">
        <div class="form-group">
            <input type="text" class="form-control" name="otp" id="otp" placeholder="Enter OTP" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block btnsmt">Verify OTP</button>
        <div class="bottom">
            <span class="helper-text">Didn't receive the OTP? <a href="javascript:void(0);" id="resendOtpBtn">Resend OTP</a></span>
            <span class="helper-text">Know your password? <a href="<?= base_url() . 'signin' ?>">Login</a></span>
        </div>
    </form>
    <div class="alert d-none text-center" role="alert"></div>
</div>

<script>
    $(document).ready(function() {
        $('#forgot').validate({
            rules: {
                otp: {
                    required: true,
                    digits: true,
                    minlength: 6,
                    maxlength: 6
                }
            },
            messages: {
                otp: {
                    required: "Please enter the OTP.",
                    digits: "The OTP should be numeric.",
                    minlength: "The OTP should be 6 digits.",
                    maxlength: "The OTP should be 6 digits."
                }
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var companyid = localStorage.getItem('company_id');
                $('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');
                var formData = new FormData(form);
                // Manually append employee_id to FormData
                if (companyid) {
                    formData.append('id', companyid);
                }
                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'common/verify_otp_post',
                        processData: false,
                        contentType: false,
                        cache: false,
                        data: formData,
                        success: function(result) {
                            var obj = $.parseJSON(result);
                            if (obj.status == '1') {
                                setTimeout(function() {
                                    window.location.href = base_url + 'reset_password';
                                }, 2000);
                            } else {
                                $('.alert').html(obj.msg).removeClass('d-none').addClass('alert-danger');
                                $('.btnsmt').prop('disabled', false).html('Submit');
                            }
                        },
                        error: function() {
                            $('.alert').html('Something went wrong! Please try again.').removeClass('d-none').addClass('alert-danger');
                            $('.btnsmt').prop('disabled', false).html('Submit');
                        }
                    });
                }, 500);
                return false;
            }
        });
        // Resend OTP functionality
        $('#resendOtpBtn').on('click', function() {
            var companyid = localStorage.getItem('company_id');

            if (!companyid) {
                $('.alert').html('Unable to resend OTP. Please try again.').removeClass('d-none').addClass('alert-danger');
                return;
            }
            $('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Resending...');

            $.ajax({
                type: 'POST',
                url: base_url + 'common/resend_otp_post',
                data: {
                    company_id: companyid
                },
                success: function(result) {
                    var obj = $.parseJSON(result);
                    if (obj.status == '1') {
                        $('.alert').html('OTP has been resent successfully!').removeClass('d-none').addClass('alert-success');
                    } else {
                        $('.alert').html(obj.message).removeClass('d-none').addClass('alert-danger');
                    }
                    $('.btnsmt').prop('disabled', false).html('Verify OTP');
                },
                error: function() {
                    $('.alert').html('Something went wrong! Please try again.').removeClass('d-none').addClass('alert-danger');
                    $('.btnsmt').prop('disabled', false).html('Verify OTP');
                }
            });
        });
    });
</script>