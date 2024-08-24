<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
  <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
    <form class="form-auth-small" action="" name="company_edit" id="company_edit" method="POST" enctype="multipart/form-data">
      <div class="card">
        <div class="body">
          <div class="row clearfix">
            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Company Name<sup>*</sup></label>
                <input type="text" class="form-control" name="name" value="<?= $company_details['name'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile<sup>*</sup></label>
                <input type="text" class="form-control number" name="mobile" value="<?= $company_details['mobile'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Mobile1</label>
                <input type="text" class="form-control number" name="mobile1" value="<?= $company_details['mobile1'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Status<sup>*</sup></label>
                <select class="form-control show-tick" name="status">
                  <option value="">Select Status</option>
                  <option value="active" <?= ($company_details['status'] == 'active') ? 'selected' : '' ?>>Active</option>
                  <option value="inactive" <?= ($company_details['status'] == 'inactive') ? 'selected' : '' ?>>Inactive</option>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" name="address" rows="4" cols="30"><?= $company_details['address'] ?></textarea>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Reg. No.<sup>*</sup></label>
                <input type="text" class="form-control" name="reg_no" value="<?= $company_details['reg_no'] ?>">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Subscription<sup>*</sup></label>
                <select class="form-control show-tick" name="subsrciption_id" id="subsrciption_id">
                  <option value="">Select Status</option>
                  <?php foreach ($subscriptions as $val) { ?>
                    <option value="<?= $val['subsrciption_id']; ?>" <?= (( $val['subsrciption_id'] == $company_details['subsrciption_id'])?"selected" : "") ?>><?= $val['name']; ?> </option>
                  <?php } ?>
                </select>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Subscription Date <sup>*</sup></label>
                <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="subscription_added_on" class="form-control" onkeydown="return false;" value="<?= date('d/m/Y', strtotime($company_details['subscription_added_on'])); ?>" />
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="form-group">
                <label>Status<sup>*</sup></label>
                <select class="form-control show-tick" name="status">
                  <option value="">Select Status</option>
                  <option value="active" <?= (($company_details['status'] =='active')? " selected" : "") ?> >Active</option>
                  <option value="inactive" <?= (($company_details['status'] =='inactive')? " selected" : "") ?>>Inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-12 col-sm-12">
              <div class="form-group">
                <label>Amount <sup>*</sup></label>
                <input type="text"  name="subscription_amount" id="subscription_amount" class="form-control" value="<?= $company_details['subscription_amount']; ?>" readonly />
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
    </form>
  </div>
</div>

<script src="<?= base_url() ?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript">
  $(function() {

    $("#company_edit").validate({
      rules: {
        name: {
          required: true
        },
        mobile: {
          required: true
        },
        reg_no: {
          required: true
        },
        subsrciption_id: {
          required: true
        },
        subscription_added_on: {
          required: true
        },
        status: {
          required: true
        }
      },
      messages: {
        name: "Please enter company name",
        status: "Please choose status",
        mobile: "Please enter mobile",
        subsrciption_id: "Please choose subscription",
        subscription_added_on: "Please enter date",
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        var company_id = '<?= $company_details['company_id'] ?>';
        var form_data = new FormData(form);
        form_data.append('company_id', company_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/edit_company_process',
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

    $('#subsrciption_id').on('change', function(){
      var subscription_id = this.value;
      $.ajax({
        type : "POST",
        url : base_url + 'user/get_subscription_price',
        data : "subscription_id="+ subscription_id,
        async : false,
        cache :false,
        success : function(response){
          $('#subscription_amount').val(parseInt(response).toFixed(2));
        }
      });
    });
  

  });
</script>