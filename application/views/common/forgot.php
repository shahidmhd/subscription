<div class="header">
	<p class="lead">Recover my password</p>
</div>
<div class="body">
	<p>Please enter your registered email below to receive instructions for
		resetting password.</p>
	<form class="form-auth-small" action="" name="forgot" id="forgot" method="POST">
		<div class="form-group">
			<input type="email" class="form-control" name="email" id="email" placeholder="Email Address" required>
		</div>
		<button type="submit" class="btn btn-primary btn-lg btn-block btnsmt">Send
			OTP</button>
		<div class="bottom">
			<span class="helper-text">Know your password? <a
					href="<?= base_url() . 'signin' ?>">Login</a></span>
		</div>
	</form>
	<div class="alert d-none text-center" role="alert"></div>

</div>

<script>
	$(document).ready(function() {
		$('#forgot').validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				email: {
					required: "Please enter your registered email address.",
					email: "Please enter a valid email address."
				}
			},
			submitHandler: function(form, e) {
				e.preventDefault();
				$('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');
				var formData = new FormData(form);
				setTimeout(function() {
					$.ajax({
						type: 'POST',
						url: base_url + 'common/verify_email_post',
						processData: false,
						contentType: false,
						cache: false,
						async: false,
						data: formData,
						success: function(result) {
							var obj = $.parseJSON(result);
							console.log(obj);
							
							if (obj.status == '1') {
								console.log(obj, "obj");
								localStorage.setItem('company_id', obj.id);
								setTimeout(function() {
									window.location.href = base_url + 'verify-otp';
								}, 2000);
							} else {
								console.log(obj);
								
								$('.alert').html(obj.msg).removeClass('d-none').addClass('alert-danger');
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
				}, 500);
				return false;
			}
		});
	});
</script>