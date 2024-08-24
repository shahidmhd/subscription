<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
  <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
    <form class="form-auth-small" action="" name="edit_director" id="edit_director" method="POST" enctype="multipart/form-data">
      <div class="card">
        <div class="body">
          <div class="row clearfix">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Company<sup>*</sup></label>
                <select class="form-control show-tick" name="company_id">
                  <option value="">Select Company</option>
                  <?php foreach ($companies as $row) { ?>
                    <option value="<?= $row['company_id'] ?>" <?= ($director_details['company_id'] == $row['company_id']) ? 'selected' : '' ?>><?= $row['name'] ?></option>
                  <?php } ?>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Name<sup>*</sup></label>
                <input type="text" class="form-control" name="name" value="<?= $director_details['name'] ?>">
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile</label>
                <input type="text" class="form-control number" name="mobile" value="<?= $director_details['mobile'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile1</label>
                <input type="text" class="form-control number" name="mobile1" value="<?= $director_details['mobile1'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>PAN/DIN</label>
                <input type="text" class="form-control" name="pan_no" value="<?= $director_details['pan_no'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Email Id</label>
                <input type="email" class="form-control" name="email_id" value="<?= $director_details['email_id'] ?>">
              </div>
            </div>
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" name="address" rows="4" cols="30"><?= $director_details['address'] ?></textarea>
              </div>
            </div>
          </div>

          <div class="row clearfix">
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
<script type="text/javascript">
  $(function() {

    $("#edit_director").validate({
      rules: {
        name: {
          required: true
        },
        company_id: {
          required: true
        }
      },
      messages: {
        name: "Please enter director name",
        company_id: "Please choose company"
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        var director_id = '<?= $director_details['director_id'] ?>';
        var form_data = new FormData(form);
        form_data.append('director_id', director_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/edit_directors_process',
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
                $('.btnsmt').prop('disabled', false).attr('value', 'Save & Continue');
              }

            },
            error: function(error) {
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