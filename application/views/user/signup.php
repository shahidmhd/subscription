<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/dropify/css/dropify.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css">
<div class="header">
    <p class="lead">Sign Up to your account</p>
</div>
<div class="container">
    <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
    <div class="row clearfix">
        <div class="col-12 m-auto">
            <form class="form-auth-small" action="" name="company_add" id="company_add" method="POST" enctype="multipart/form-data">
                <div class="card">
                    <div class="">
                        <div class="row clearfix">
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Company Name<sup>*</sup></label>
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>User name<sup>*</sup></label>
                                    <input type="text" class="form-control" name="company_code">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Email<sup>*</sup></label>
                                    <input type="email" class="form-control" name="email">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Password<sup>*</sup></label>
                                    <input type="password" class="form-control" name="password" id="password">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Confirm Password<sup>*</sup></label>
                                    <input type="password" class="form-control" name="confirm_password" id="confirm_password">
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Mobile<sup>*</sup></label>
                                    <input type="text" class="form-control number" name="mobile">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Mobile1</label>
                                    <input type="text" class="form-control number" name="mobile1">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea class="form-control" name="address" rows="4" cols="30"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Reg. No. <sup>*</sup></label>
                                    <input type="text" class="form-control" name="reg_no">
                                </div>
                            </div>
                            <div class="col-12">
                                <label>Company Logo</label>
                                <input type="file" name="file_name" id="file_name" class="dropify" accept=".jpg, .png, .jpeg" data-allowed-file-extensions="png jpg jpeg webp">
                                <div class="small text-info">Allowed file types: png, jpg, jpeg and webp only</div>
                                <div class="mt-3"></div>
                            </div>
                            <div class="col-12 text-right">
                                <span class="helper-text m-b-10">Already have an account? <a href="<?= base_url() . 'signin' ?>">Sign In</a></span>
                            </div>
                            <div class="row ">
                                <div class="col-sm-12">
                                    <div class="mt-4 text-right">
                                        <input type="reset" class="btn btn-lg btn-danger" value="Reset">
                                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="signup" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="alert d-none text-center" role="alert"></div>
        </div>
    </div>
</div>

<script src="<?= base_url() ?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js"></script>
<script src="<?= base_url() ?>assets/vendor/dropify/js/dropify.min.js"></script>

<script type="text/javascript">
    $(function() {
        $('.dropify').dropify({
            messages: {
                'remove': 'Remove',
                'error': ''
            },
            error: {
                'fileSize': 'The file size is too big ({{ value }} max).',
                'fileExtension': 'Invalid file type. Only {{ value }} are allowed.'
            },
            maxFileSize: '2M',
            showRemove: false

        });
        $("#company_add").validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true
                },
                company_code: {
                    required: true
                },
                password: {
                    required: true
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"
                },
                mobile: {
                    required: true
                },
                reg_no: {
                    required: true
                },

            },
            messages: {
                name: "Please enter company name",
                email: "Please enter email",
                company_code: "Please enter company code",
                password: "Please enter password",
                confirm_password: {
                    required: "Please confirm your password",
                    equalTo: "Passwords do not match"
                },
                reg_no: "please enter reg no",
                mobile: "Please enter mobile",


            },
            submitHandler: function(form, e) {
                e.preventDefault();
                $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
                // $('#confirm_password').remove();
                var form_data = new FormData(form);
                var file = document.getElementById('file_name').files[0];
                if (file) {
                    form_data.append('file_name', file);
                }

                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'common/signup_process',
                        cache: false,
                        async: false,
                        data: form_data,
                        contentType: false,
                        processData: false,
                        success: function(response) {


                            var obj = $.parseJSON(response);
                            if (obj.status == 1) {
                                setTimeout(function() {
                                    window.location.href = base_url + 'signin';
                                }, 2000);
                            } else {
                                $('.alert').html(obj.msg).removeClass('d-none').addClass('alert-danger');
                                $('.btnsmt').prop('disabled', false).attr('value', 'Save & Continue');
                            }

                        },
                        error: function(error) {
                            $('.alert').html('Something went wrong! Please try again.').removeClass('d-none').addClass('alert-danger');
                            $('.btnsmt').prop('disabled', false).attr('value', 'Save & Continue');
                        }
                    });
                }, 500);
                return false;
            }
        });

        $('#subsrciption_id').on('change', function() {
            var subscription_id = this.value;
            $.ajax({
                type: "POST",
                url: base_url + 'user/get_subscription_price',
                data: "subscription_id=" + subscription_id,
                async: false,
                cache: false,
                success: function(response) {
                    $('#subscription_amount').val(parseInt(response).toFixed(2));
                }
            });
        });

    });
</script>