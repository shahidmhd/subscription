<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
  <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
    <form class="form-auth-small" action="" name="add_work" id="add_work" method="POST" enctype="multipart/form-data">
      <div class="card">

        <div class="body">
          <div class="row clearfix">

            <div class="col-md-12">
              <div class="form-group">
                <label>Title<sup>*</sup></label>
                <input type="text" class="form-control" name="title">
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label>Description<sup>*</sup></label>
                <textarea class="form-control" name="description" rows="4" cols="30"></textarea>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Company<sup>*</sup></label>
                <select class="form-control show-tick" name="company_id">
    <option value="">Select Company</option>
    <?php 
    $role_id = $this->session->userdata('role_id');
    foreach ($companies as $index => $row) { ?>
        <option value="<?= $row['company_id'] ?>" <?= ($role_id != 5 && $index == 0) ? 'selected' : '' ?>><?= $row['name'] ?></option>
    <?php } ?>
</select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Assigned To<sup>*</sup></label>
                <select class="form-control show-tick" name="assigned_to">
                  <option value="">Select Employee</option>
                  <?php foreach ($employees as $row) { ?>
                    <option value="<?= $row['employee_id'] ?>"><?= $row['name'] ?></option>
                  <?php } ?>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Start Date<sup>*</sup></label>
                <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="work_date" class="form-control" onkeydown="return false;">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Expected Finish Date</label>
                <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="last_date" class="form-control" onkeydown="return false;">
              </div>
            </div>
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Checked By</label>
                <input type="text" class="form-control" name="checked_by">
              </div>
            </div>
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Remarks</label>
                <textarea class="form-control" name="remarks" rows="4" cols="30"></textarea>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="text-right mt-4">
                <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Save" />
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
<script type="text/javascript">
  $(function() {

    $("#add_work").validate({
      rules: {
        company_id: {
          required: true
        },
        assigned_to: {
          required: true
        },
        title: {
          required: true,
        },
        description: {
          required: true
        },
        work_date: {
          required: true
        }
      },
      messages: {
        company_id: {
          required: "Please choose company"
        },
        assigned_to: {
          required: "Please choose employee"
        },
        title: {
          required: "Please enter title"
        },
        description: {
          required: "Please enter description"
        },
        work_date: {
          required: "Please choose start date"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

        var form_data = new FormData(form);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/add_work_process',
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
                $('.btnsmt').prop('disabled', false).attr('value', 'Save');
              }

            },
            error: function(error) {
              toaster('error', error);
              $('.btnsmt').prop('disabled', false).attr('value', 'Save');
            }
          });
        }, 500);
        return false;
      }
    });
  });
</script>