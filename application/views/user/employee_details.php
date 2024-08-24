 <div class="row clearfix profilepage_2 blog-page">
        <div class="col-lg-3 col-md-12">
            <div class="card profile-header">
                <div class="body">
                    <div class="profile-image"> <img src="<?= getUserImage($employee_details['profile_photo']) ?>" style="object-fit: cover;width: 200px;height: 200px;border-radius: 50%;" alt="<?= $employee_details['name'] ?>"> </div>
                    <div>
                        <h6 class="m-b-1"><strong><?= $employee_details['name'] ?></strong></h6>
                        <div class="m-b-1"><strong><?= $employee_details['role'] ?></strong></div>
                    </div>
                </div>
            </div>

            <!-- <div class="sticky-top profile-menu">
                <div class="card">
                    <div class="body">
                        <ul class="nav">
                            <li>
                                <a href="#general" class="scrollLink"><i class="fa fa-circle text-danger"></i>General Details</a>
                            </li>
                            <li>
                                <a href="#work" class="scrollLink"><i class="fa fa-circle text-info"></i>Work Details</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </div>
     
        <div class="col-lg-9 col-md-12">
            <div class="card" id="general">
                <div class="body">
                    <div class="table-responsive">
                        <table class="table table-hover m-b-0">
                            <tbody>

                                <tr>
                                    <td>Name:</td>
                                    <td><?= $employee_details['name'] ?></td>
                                </tr>


                                <tr>
                                    <td>Address:</td>
                                    <td><?= ($employee_details['address'] != "") ? nl2br($employee_details['address']) : "-" ?></td>
                                </tr>


                                <tr>
                                    <td>Mobile:</td>
                                    <td><?= ($employee_details['mobile'] != "") ? $employee_details['mobile'] : "-" ?></td>
                                </tr>
                                <tr>
                                    <td>Mobile 1:</td>
                                    <td><?= ($employee_details['mobile1'] != "") ? $employee_details['mobile1'] : "-" ?></td>
                                </tr>
                                <tr>
                                    <td>Email Id:</td>
                                    <td><?= ($employee_details['email_id'] != "") ? $employee_details['email_id'] : "-" ?></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <?php if (check_permission(2) || ($employee_details['employee_id'] == $session_id)) { ?>
                <div class="card" id="password">
                    <div class="header">
                        <h2>Change Password</h2>
                    </div>
                    <div class="body pt-0">
                        <form class="form-auth-small" action="" name="change_password" id="change_password" method="POST" enctype="multipart/form-data">
                            <div class="row clearfix">
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Old Password<sup>*</sup></label>
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
            <?php } ?>
        </div>
    </div>
    <script type="text/javascript">
        $("#change_password").validate({
            rules: {
                old_password: {
                    required: true,
                    minlength: 3
                },
                password: {
                    required: true,
                    minlength: 3
                },
                confirm_password: {
                    required: true,
                    minlength: 3,
                    equalTo: '[name="password"]'
                }
            },
            messages: {
                old_password: {
                    required: "Please enter your old password",
                    minlength: "Password must be at least 3 characters"
                },
                password: {
                    required: "Please enter a new password",
                    minlength: "Password must be at least 3 characters"
                },
                confirm_password: {
                    required: "Please confirm your password",
                    equalTo: "Passwords do not match"
                }
            },
            submitHandler: function(form, e) {

                e.preventDefault();

                $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

                var id = '<?= $employee_details['employee_id'] ?>';
                var form_data = new FormData(form);
                form_data.append('employee_id', id);

                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'user/employee_change_password',
                        cache: false,
                        async: false,
                        data: form_data,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            var obj = $.parseJSON(response);
                            if (obj.status == 1) {
                                toaster('success', obj.msg);
                                $('input[name="password"]').val("");
                                $('input[name="confirm_password"]').val("");
                                $('.btnsmt').prop('disabled', false).attr('value', 'Submit');

                            } else {
                                toaster('error', obj.msg);
                                $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                            }
                        },
                        error: function(error) {
                            toaster('error', error);
                            $('.btnsmt').prop('disabled', false).attr('value', 'Submit');
                        }
                    });
                }, 500);
                return false;
            }
        });
    </script>
