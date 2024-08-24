<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/dropify/css/dropify.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css">
<div class="row clearfix">
  <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
    <form class="form-auth-small" action="" name="employee_add" id="employee_add" method="POST" enctype="multipart/form-data">
      <div class="card">
        <div class="body">
          <div class="row clearfix">
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Company<sup>*</sup></label>
                <select class="form-control show-tick" name="company_id" id="company_id">
                  <!-- <option value="">Select Company</option> -->
                  <?php foreach ($companies as $value) { ?>
                    <option id="company_id" value="<?= $value['company_id'] ?>"><?= $value['name'] ?></option>
                  <?php } ?>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Employee Name<sup>*</sup></label>
                <input type="text" class="form-control" name="name">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile1<sup>*</sup></label>
                <input type="text" class="form-control number" name="mobile">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile2</label>
                <input type="text" class="form-control number" name="mobile1">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Status<sup>*</sup></label>
                <select class="form-control show-tick" name="status">
                  <option value="">Select Status</option>
                  <option value="active" selected>Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Username<sup>*</sup></label>
                <input type="text" class="form-control" name="username">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Password<sup>*</sup></label>
                <input type="text" class="form-control" name="password">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Role<sup>*</sup></label>
                <select class="form-control show-tick" name="role_id">
                  <option value="1" selected>Employee</option>
                </select>

              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Email Id<sup>*</sup></label>
                <input type="email" class="form-control" name="email_id">
              </div>
            </div>
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Current Address</label>
                <textarea class="form-control" name="address" rows="4" cols="30"></textarea>
              </div>
            </div>

          </div>
          <div class="row clearfix">
            <div class="col-12">
              <label>Profile Photo</label>
              <input type="file" name="file_name" id="file_name" class="dropify" accept=".jpg, .png, .jpeg" data-allowed-file-extensions="png jpg jpeg webp">
              <div class="small text-info">Allowed file types: png, jpg, jpeg and webp only</div>
              <div class="mt-3"></div>
            </div>
            <div class="col-sm-12">
              <div class="mt-4 text-right">
                <input type="submit" id="btnsmt" class="btn btn-lg btn-primary btnsmt" value="Save" />
                <input type="reset" class="btn btn-lg btn-danger" value="Reset">
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
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
    $("#employee_add").validate({
      rules: {
        name: {
          required: true
        },
        status: {
          required: true
        },
        mobile: {
          required: true
        },
        role_id: {
          required: true
        },
        email_id: {
          required: true,
          email: true,
          remote: {
            url: "user/checkDupEmail",
            type: "post",
            data: {
              company_id: function() {
                return $('#company_id').val();
              }
            }
          }
        },
        username: {
          required: true,
          remote: {
            url: "user/checkUsername",
            type: "post"
          }
        },
        password: {
          required: true,
          minlength: 6
        },
        // file_name: {
        //   extension: "jpg|png"
        // }
      },
      messages: {
        name: "Please enter employee name",
        status: "Please choose status",
        role_id: "Please choose role",
        email_id: {
          required: "Please enter email id",
          email: "Invalid email",
          remote: "Email id already exist"
        },
        mobile: "Please enter mobile number",
        username: {
          required: "Please enter username",
          remote: "Username already exist"
        },
        password: {
          required: "Please enter password",
          minlength: "Password must be at least 6 characters long"
        },
        // file_name: "Only .jpg and .png files are allowed"
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

        var form_data = new FormData(form);
        //append files
        var file = document.getElementById('file_name').files[0];
        if (file) {
          form_data.append('file_name', file);
        }

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/add_employee_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              console.log(obj);

              if (obj.status == 1) {
                toaster('success', obj.msg);
                setTimeout(function() {
                  window.location.reload();
                }, 2000);
              } else {
                toaster('error', obj.msg);
                $('.btnsmt').prop('disabled', false).attr('value', 'Save & Continue');
              }

            },
            error: function(error) {
              console.log(error);

              toaster('error', error);
              $('.btnsmt').prop('disabled', false).attr('value', 'Save & Continue');
            }
          });
        }, 500);
        return false;
      }
    });

  });
</script>