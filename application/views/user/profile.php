<style>
    .profile-pic {
        width: 128px;
        height: 128px;
        object-fit: cover;
        border-radius: 50%;
    }

    .file-upload {
        display: none;
    }

    .circle {
        border-radius: 50%;
        width: 128px;
        height: 128px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        overflow: hidden;
        position: relative;
        display: inline-block;
    }

    .p-image {
        position: relative;
        top: -35px;
        right: -49px;
        color: #666666;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .upload-button {
        font-size: 1.2em;
    }

    .upload-button:hover {
        color: #999;
    }
</style>
<?php if (!empty($user_details)) { ?>
    <div class="row clearfix profilepage_2 blog-page">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="body">
                    <!-- <pre><//?php print_r($user_details); ?></pre> -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#details" role="tab">Details</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#password_tab" role="tab">Change Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#subscription_tab" role="tab">Subscription</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-4">
                        <div class="tab-pane active" id="details" role="tabpanel">
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-12">
                                    <div class="card profile-header">
                                        <div class="body">
                                            <form id="updateProfileForm" method="POST" enctype="multipart/form-data">
                                                <div class=" align-items-center">

                                                    <div class="circle">
                                                        <img class="profile-pic" src="<?= getUserImage($user_details['profile_photo']) ?>" alt="profile picture">
                                                    </div>
                                                    <div class="p-image">
                                                        <i class="fa fa-camera upload-button" title="select image"></i>
                                                        <input class="file-upload" name="profile_photo" id="profile_photo" type="file" accept="image/*" />
                                                    </div>

                                                </div>
                                                <div class=" align-items-center">
                                                    <button type="submit" class="btn btn-primary btn-block">
                                                        <i class="fa fa-upload"></i> Upload
                                                    </button>

                                                </div>
                                            </form>
                                            <div id="error-message" class="text-danger mt-2" style="text-align: center;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-12">
                                    <div class="card">
                                        <div class="body">
                                            <form class="form-auth-small" action="" name="edit_company" id="edit_company" method="POST" enctype="multipart/form-data">
                                                <div class="row clearfix">
                                                    <!-- Company Name Field -->
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Company Name<sup>*</sup></label>
                                                            <input type="text" class="form-control" name="name" value="<?= $user_details['name']; ?>" required>
                                                        </div>
                                                    </div>
                                                    <!-- Company Code Field -->
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Username<sup>*</sup></label>
                                                            <input type="text" class="form-control" name="company_code" value="<?= $user_details['company_code']; ?>" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Email<sup>*</sup></label>
                                                            <input type="email" class="form-control" name="email" value="<?= $user_details['email']; ?>" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Mobile1<sup>*</sup></label>
                                                            <input type="text" class="form-control" name="mobile" value="<?= $user_details['mobile']; ?>" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Mobile2</label>
                                                            <input type="text" class="form-control" name="mobile1" value="<?= $user_details['mobile1']; ?>">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="mt-4">
                                                            <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Update" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Change Password Tab -->
                        <div class="tab-pane" id="password_tab" role="tabpanel">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <div class="card">
                                        <div class="body">
                                            <form class="form-auth-small" action="" name="change_password" id="change_password" method="POST" enctype="multipart/form-data">
                                                <div class="row clearfix">
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Current Password<sup>*</sup></label>
                                                            <input type="password" class="form-control" name="old_password" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>New Password<sup>*</sup></label>
                                                            <input type="password" class="form-control" name="password" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="form-group">
                                                            <label>Confirm Password<sup>*</sup></label>
                                                            <input type="password" class="form-control" name="confirm_password" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12">
                                                        <div class="mt-4">
                                                            <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Submit" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Subscription Tab -->
                        <div class="tab-pane" id="subscription_tab" role="tabpanel">
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12 mx-auto">
                                    <div class="card">
                                        <div class="body">
                                            <?php
                                            $subscription_plans = [
                                                1 => 'Monthly',
                                                2 => 'Free',
                                                3 => 'Yearly'
                                            ];

                                            $subscription_types = [
                                                1 => 'Basic',
                                                2 => 'Premium'
                                            ];

                                            $has_subscription = isset($user_details['subscription_id']) && isset($user_details['subscription_type']) && !empty($user_details['subscription_id']) && !empty($user_details['subscription_type']);
                                            $subscription_expiry = isset($user_details['subscription_expiry']) ? $user_details['subscription_expiry'] : null;
                                            $is_expired = false;
                                            if ($subscription_expiry) {
                                                $current_date = date('Y-m-d');
                                                $is_expired = $subscription_expiry < $current_date;
                                            }
                                            ?>
                                            <div class="card-header text-center <?= $is_expired ? 'bg-danger' : 'bg-primary'; ?> text-white">
                                                <h4>Subscription Details</h4>
                                            </div>


                                            <!-- <div class="card-header text-center bg-primary text-white">
                                                <h4>Subscription Details</h4>
                                            </div> -->

                                            <div class="card-body text-center">
                                                <?php
                                                // Check if subscription details are available
                                                // $has_subscription = isset($user_details['subscription_id']) && isset($user_details['subscription_type']) && !empty($user_details['subscription_id']) && !empty($user_details['subscription_type']);

                                                if ($has_subscription) {
                                                    $subscription_plan = isset($subscription_plans[$user_details['subscription_id']]) ? $subscription_plans[$user_details['subscription_id']] : 'Unknown';
                                                    $subscription_type = isset($subscription_types[$user_details['subscription_type']]) ? $subscription_types[$user_details['subscription_type']] : 'Unknown';
                                                    $subscription_expiry = isset($user_details['subscription_expiry']) ? date('F j, Y', strtotime($user_details['subscription_expiry'])) : 'No Expiry Date';
                                                ?>
                                                    <div class="mb-3">
                                                        <h5 class="text-secondary">Subscription Plan</h5>
                                                        <p><?= $subscription_plan; ?></p>
                                                    </div>
                                                    <div class="mb-3">
                                                        <h5 class="text-secondary">Subscription Type</h5>
                                                        <p><?= $subscription_type; ?></p>
                                                    </div>
                                                    <div>
                                                        <h5 class="text-secondary">Expiry Date</h5>
                                                        <p><?= $subscription_expiry; ?></p>
                                                    </div>
                                                <?php
                                                } else {
                                                    // If no active subscription found
                                                ?>
                                                    <div class="mb-3">
                                                        <h5 class="text-danger">No active subscription found</h5>
                                                        <p>Please purchase or renew your subscription to access full features.</p>
                                                    </div>
                                                <?php
                                                }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- AJAX Call for Company Details Update -->
        <script type="text/javascript">
            $("#edit_company").validate({
                rules: {
                    name: {
                        required: true
                    },
                    company_code: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    mobile: {
                        required: true,
                        digits: true,
                        minlength: 10,
                        maxlength: 15
                    },

                },
                messages: {
                    name: {
                        required: "Please enter the company name"
                    },
                    company_code: {
                        required: "Please enter the company code"
                    },
                    email: {
                        required: "Please enter your email",
                        email: "Please enter a valid email address"
                    },
                    mobile: {
                        required: "Please enter your mobile number",
                        digits: "Please enter a valid mobile number",
                        minlength: "Mobile number should be at least 10 digits",
                        maxlength: "Mobile number should not exceed 15 digits"
                    },

                },
                submitHandler: function(form, e) {
                    e.preventDefault();

                    $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

                    var form_data = new FormData(form);
                    form_data.append('company_id', '<?= $user_details['company_id']; ?>');

                    $.ajax({
                        type: 'POST',
                        url: base_url + 'common/edit_company_process',
                        data: form_data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            var obj = $.parseJSON(response);
                            if (obj.status == 1) {
                                toaster('success', obj.msg);
                            } else {
                                toaster('error', obj.msg);
                            }
                            $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                        },
                        error: function(error) {
                            toaster('error', 'Something went wrong!');
                            $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                        }
                    });

                    return false;
                }
            });
            $('#updateProfileForm').on('submit', function(e) {
                e.preventDefault();
                var fileInput = document.getElementById('profile_photo');
                var file = fileInput.files[0];
                var errorMessage = $('#error-message');

                function showError(message) {
                    errorMessage.text(message);
                    setTimeout(function() {
                        errorMessage.text('');
                    }, 2000);
                }
                if (!file) {
                    showError('Please select a file.');
                    return false;
                }
                var validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
                if (validExtensions.indexOf(file.type) === -1) {
                    showError('Only JPG, JPEG, and PNG files are allowed.');
                    return false;
                }
                if (file.size > 2 * 1024 * 1024) {
                    showError('The file size is too large. Maximum allowed size is 2MB.');
                    return false;
                }
                var formData = new FormData(this);
                $.ajax({
                    url: base_url + 'common/update_profile_picture',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    beforeSend: function() {
                        console.log('Uploading...');
                    },
                    success: function(response) {
                        var jsonResponse = $.parseJSON(response);
                        if (jsonResponse.status == 1) {
                            toaster('success', jsonResponse.msg);
                            setTimeout(function() {
                                location.reload();
                            }, 2000);
                        } else {
                            alert(jsonResponse.msg);
                        }
                    },
                    error: function(xhr, status, error) {
                        // Handle any errors here
                        console.log('An error occurred:', xhr.responseText);
                        alert('An error occurred while uploading the profile picture.');
                    }
                });
            });
        </script>

        <!-- AJAX Call for Password Change -->
        <script type="text/javascript">
            $("#change_password").validate({
                rules: {
                    old_password: {
                        required: true,
                        minlength: 3
                    },
                    password: {
                        required: true,
                        minlength: 6
                    },
                    confirm_password: {
                        required: true,
                        equalTo: '[name="password"]'
                    }
                },
                messages: {
                    old_password: {
                        required: "Please enter your current password",
                        minlength: "Password must be at least 3 characters"
                    },
                    password: {
                        required: "Please enter a new password",
                        minlength: "Password must be at least 6 characters"
                    },
                    confirm_password: {
                        required: "Please confirm your password",
                        equalTo: "Passwords do not match"
                    }
                },
                submitHandler: function(form, e) {
                    e.preventDefault();

                    $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
                    var id = '<?= $user_details['employee_id'] ?>';
                    var form_data = new FormData(form);
                    form_data.append('employee_id', id);
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'common/change_password',
                        cache: false,
                        async: false,
                        data: form_data,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            var obj = $.parseJSON(response);
                            if (obj.status == 1) {
                                toaster('success', obj.msg);
                                $('input[name="old_password"], input[name="password"], input[name="confirm_password"]').val("");
                            } else {
                                toaster('error', obj.msg);
                            }
                            $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                        },
                        error: function(error) {
                            toaster('error', error);
                            $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                        }
                    });

                    return false;
                }
            });
        </script>

    <?php } else {
    $this->load->view('theme/user/notfound');
} ?>

    <script>
        $(document).ready(function() {

            var readURL = function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        $('.profile-pic').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $(".file-upload").on('change', function() {
                readURL(this);
            });

            $(".upload-button").on('click', function() {
                $(".file-upload").click();
            });
        });
    </script>