<!-- new -->
<div class="header">
	<p class="lead">Sign in to your account</p>
</div>
<div class="body">

	<div class="form-group d-flex">

		<div class="form-check">
			<input class="form-check-input" type="radio" name="accountType" id="companyAccount" value="company" checked>
			<label class="form-check-label" for="companyAccount">
				Company
			</label>
		</div>
		<div class="form-check pl-5">
			<input class="form-check-input" type="radio" name="accountType" id="userAccount" value="user">
			<label class="form-check-label" for="userAccount">
				Admin
			</label>
		</div>
	</div>


	<form class="form-auth-small" id="userLoginForm" action="" name="signin" method="POST">
		<div class="form-group">
			<label for="username" class="control-label sr-only">User Name</label>
			<input type="text" class="form-control" name="username" id="username" value="" placeholder="Username" autocomplete="off" autofocus>
		</div>
		<div class="form-group">
			<label for="password" class="control-label sr-only">Password</label>
			<input type="password" class="form-control" name="password" id="password" value="" placeholder="Password" autocomplete="off">
		</div>
		<button type="submit" class="btn btn-primary btn-lg btn-block btnsmt">SIGN IN</button>
		<div class="bottom">
			<span class="helper-text m-b-10"><i class="fa fa-lock"></i> <a href="<?= base_url() . 'forgot' ?>">Forgot password?</a></span>
			<!-- <span class="helper-text m-b-10">

				<a href="<//?= base_url() . 'signup' ?>">Sign Up</a>
			</span> -->
			<span class="helper-text m-b-10">Create new account? <a href="<?= base_url() . 'signup' ?>">Sign Up</a></span>
		</div>
	</form>


	<form class="form-auth-small d-none" id="companyLoginForm" action="" name="companySignin" method="POST">
		<div class="form-group">
			<label for="companyCode" class="control-label sr-only">User Name</label>
			<input type="text" class="form-control" name="companyCode" id="companyCode" value="" placeholder="Username" autocomplete="off" autofocus>
		</div>
		<div class="form-group">
			<label for="companyPassword" class="control-label sr-only">Password</label>
			<input type="password" class="form-control" name="companyPassword" id="companyPassword" value="" placeholder="Password" autocomplete="off">
		</div>
		<button type="submit" class="btn btn-primary btn-lg btn-block btnsmt">SIGN IN</button>
		<div class="bottom">
			<span class="helper-text m-b-10"><i class="fa fa-lock"></i> <a href="<?= base_url() . 'forgot' ?>">Forgot password?</a></span>
			<!-- <span class="helper-text m-b-10">

				<a href="<//?= base_url() . 'signup' ?>">Sign Up</a>
			</span> -->
			<span class="helper-text m-b-10">Create new account? <a href="<?= base_url() . 'signup' ?>">Sign Up</a></span>

		</div>
	</form>

	<div class="alert d-none text-center" role="alert"></div>
</div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
		const userAccountRadio = document.getElementById('userAccount');
		const companyAccountRadio = document.getElementById('companyAccount');
		const userLoginForm = document.getElementById('userLoginForm');
		const companyLoginForm = document.getElementById('companyLoginForm');
		const forgotPasswordLinks = document.querySelectorAll('.bottom .fa-lock');

		function toggleLoginForm() {
			if (userAccountRadio.checked) {
				userLoginForm.classList.remove('d-none');
				companyLoginForm.classList.add('d-none');
				forgotPasswordLinks.forEach(link => link.closest('span').classList.add('d-none'));

			} else if (companyAccountRadio.checked) {
				companyLoginForm.classList.remove('d-none');
				userLoginForm.classList.add('d-none');
				forgotPasswordLinks.forEach(link => link.closest('span').classList.remove('d-none'));
			}
		}

		userAccountRadio.addEventListener('change', toggleLoginForm);
		companyAccountRadio.addEventListener('change', toggleLoginForm);

		toggleLoginForm();

		// Form validation and submission logic for User Login
		$("#userLoginForm").validate({
			rules: {
				username: {
					required: true
				},
				password: {
					required: true
				}
			},
			messages: {
				username: "Please enter username",
				password: "Please enter password"
			},
			submitHandler: function(form, e) {
				e.preventDefault();
				$('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');
				var formData = new FormData(form);
				setTimeout(function() {
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
								setTimeout(function() {
									window.location.href = base_url + 'dashboard';
								}, 2000);
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
				}, 500);
				return false;
			}
		});

		// Form validation and submission logic for Company Login
		$("#companyLoginForm").validate({
			rules: {
				companyCode: {
					required: true
				},
				companyPassword: {
					required: true
				}
			},
			messages: {
				companyCode: "Please enter company code",
				companyPassword: "Please enter password"
			},
			submitHandler: function(form, e) {
				e.preventDefault();
				$('.btnsmt').prop('disabled', true).html('<i class="fa fa-circle-o-notch fa-spin mr-2"></i>Processing...');
				var formData = new FormData(form);
				setTimeout(function() {
					$.ajax({
						type: 'POST',
						url: base_url + 'common/companySigninProcess',
						processData: false,
						contentType: false,
						cache: false,
						async: false,
						data: formData,
						success: function(result) {
							var obj = $.parseJSON(result);
							if (obj.status == '1') {
								setTimeout(function() {
									window.location.href = base_url + 'dashboard';
								}, 2000);
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
				}, 500);
				return false;
			}
		});
	});
</script>