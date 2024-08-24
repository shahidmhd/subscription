<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
                <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
                <form class="form-auth-small" action="" name="add_signature" id="add_signature" method="POST" enctype="multipart/form-data">
                    <div class="card">
                      
                        <div class="body">
                            <div class="row clearfix">
                                
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Company<sup>*</sup></label>
                                        <select class="form-control show-tick" name="company_id" id="cmp0">
                                            <option value="">Select Company</option>
                                            <?php foreach($companies as $row) { ?>
                                            <option value="<?= $row['company_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Director<sup>*</sup></label>
                                        <select class="form-control show-tick" name="director_id" id="dir0">
                                            <option value="">Select Director</option>                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Serial Number<sup>*</sup></label>
                                        <input type="text" class="form-control" name="serial_no" id="ser0">
                                    </div>
                                </div>
                                
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Expiry Date<sup>*</sup></label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="expiry_date" class="form-control" id="dte0" onkeydown="return false;">
                                    </div>
                                </div>
		<div class="col-md-12">
                                      <div class="form-group">
                                        <label>Remarks</label>
                                        <textarea class="form-control" name="remarks" rows="4" cols="30"></textarea>
                                      </div>
                                    </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>In/Out</label>
                                        <select class="form-control show-tick" name="in_out" id="ino0">
                                            <option value="dsin">IN</option>
		            <option value="dsout">OUT</option>
                                        </select>
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

    $("#add_signature").validate({
      rules: {    
        company_id: {
          required:true
        },
        director_id: {
          required:true
        },
        serial_no: {
          required:true,
          remote: {
                url: "user/checkDupSignature",
                type: "post"
               }
        },
        expiry_date: {
          required:true
        },
        in_out: {
          required:true
        }
      },
      messages: {
        company_id: {
          required:"Please choose company"
        },
        director_id: {
          required:"Please choose director"
        },
        serial_no: {
          required:"Please enter serial number",
          remote: "Signature already exist"
        },
        expiry_date: {
          required:"Please enter expiry date"
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
            url: base_url + 'user/add_signature_process',
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
    
    $(document).on("change",'select[name="company_id"]',function(){
      var company_id = $(this).val();
        get_directors(company_id);          
    });
    

  });

  </script>
