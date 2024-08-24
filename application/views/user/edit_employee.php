<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/dropify/css/dropify.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css">
<div class="row clearfix">
  <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
    <form class="form-auth-small" action="" name="employee_edit" id="employee_edit" method="POST" enctype="multipart/form-data">
      <div class="card">
        <div class="body">
          <div class="row clearfix">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Employee Name<sup>*</sup></label>
                <input type="text" class="form-control" name="name" value="<?= $employee_details['name'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile1<sup>*</sup></label>
                <input type="text" class="form-control number" name="mobile" value="<?= $employee_details['mobile'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile2</label>
                <input type="text" class="form-control number" name="mobile1" value="<?= $employee_details['mobile1'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Status<sup>*</sup></label>
                <select class="form-control show-tick" name="status">
                  <option value="">Select Status</option>
                  <option value="active" <?= ($employee_details['status'] == 'active') ? 'selected' : '' ?>>Active</option>
                  <option value="inactive" <?= ($employee_details['status'] == 'inactive') ? 'selected' : '' ?>>Inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Email Id<sup>*</sup></label>
                <input type="email" class="form-control" name="email_id" value="<?= $employee_details['email_id'] ?>">
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
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Current Address</label>
                <textarea class="form-control" name="address" rows="4" cols="30"><?= $employee_details['address'] ?></textarea>
              </div>
            </div>

          </div>
          <div class="row clearfix">
            <div class="col-12">
              <label>Profile Photo</label>
              <input type="file" name="file_name" id="file_name" class="dropify" data-id="<?= $employee_details['employee_id'] ?>" data-default-file="<?= getUserImage($employee_details['profile_photo']) ?>">
              <div class="mt-3"></div>
            </div>

            <div class="col-sm-12">
              <div class="mt-4 text-right">
                <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Update" />
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
<script src="<?= base_url() ?>assets/user/js/pages/forms/dropify.js"></script>
<script type="text/javascript">
  $(function() {

    $("#employee_edit").validate({
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
            url: base_url + "user/checkDupEmail",
            type: "post",
            data: {
              'employee_id': function() {
                return '<?= $employee_details['employee_id'] ?>';
              }
            },
          }
        }
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
        mobile: "Please enter mobile number"
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

        var form_data = new FormData(form);
        var employee_id = '<?= $employee_details['employee_id'] ?>';
        //append files
        var file = document.getElementById('file_name').files[0];
        if (file) {
          form_data.append('file_name', file);
        }
        form_data.append('employee_id', employee_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/edit_employee_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              if (obj.status == 1) {
                toaster('success', obj.msg);
                setTimeout(function() {
                  window.location.reload();
                }, 2000);
              } else {
                toaster('error', obj.msg);
                $('.btnsmt').prop('disabled', false).attr('value', 'Update');
              }

            },
            error: function(error) {
              toaster('error', error);
              $('.btnsmt').prop('disabled', false).attr('value', 'Update');
            }
          });
        }, 500);
        return false;
      }
    });
  });
</script>