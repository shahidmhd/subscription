<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
                <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
                <form class="form-auth-small" action="" name="add_inout" id="add_inout" method="POST" enctype="multipart/form-data">
                    <div class="card">
                      
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Serial Number<sup>*</sup></label>
                                        <input type="text" class="form-control" name="serial_no">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>In/Out<sup>*</sup></label>
                                        <select class="form-control show-tick" name="in_out">
                                            <option value="dsin">IN</option>
		            <option value="dsout">OUT</option>
                                        </select>
                                    </div>
                                </div>
		<div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Director Name</label>
                                        <input type="text" class="form-control" name="director">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Taken/Return By<sup>*</sup></label>
                                        <input type="text" class="form-control" name="taken_by">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Phone<sup>*</sup></label>
                                        <input type="text" class="form-control number" name="phone">
                                    </div>
                                </div>
		<div class="col-md-12 col-sm-12">                                    
                                    <div class="form-group">
                                        <label>Remarks</label>
                                        <textarea class="form-control" name="remarks" rows="4" cols="30"></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="mt-4 text-right">
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

<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type = "text/javascript" >
  $(function() {

    $("#add_inout").validate({
      rules: {    
        taken_by: {
          required:true
        },
        phone: {
          required:true
        },
        serial_no: {
          required:true,
          remote: {
                url: "user/checkSignatureExist",
                type: "post"
               }
        },
        in_out: {
          required:true
        }
      },
      messages: {
        taken_by: {
          required:"Please enter taken/return by"
        },
        phone: {
          required:"Please enter phone"
        },
        serial_no: {
          required:"Please enter serial number",
          remote: "Signature not exist"
        },
        in_out: {
          required:"Please choose in/out status"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

        var form_data = new FormData(form);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/add_inout_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              if (obj.status == 1) {
                toaster('success', obj.msg);
	setTimeout(function(){
	  window.location.reload();
	},2000);
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
