<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
                <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
                <form class="form-auth-small" action="" name="add_directors" id="add_directors" method="POST" enctype="multipart/form-data">
                    <div class="card">
                       <div class="header">
                           <a href="javascript:;" onclick="addMoreDirectors()" data-toggle="tooltip" data-placement="left" title="Add More" class="header-dropdown"><i class="icon-plus"></i></a>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Company<sup>*</sup></label>
                                        <select class="form-control show-tick" name="company_id[0]" id="cmp0">
                                            <option value="">Select Company</option>
                                            <?php foreach($companies as $row) { ?>
                                            <option value="<?= $row['company_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Name<sup>*</sup></label>
                                        <input type="text" class="form-control" name="name[0]" id="nm0">
                                    </div>
                                </div>
                                
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Mobile</label>
                                        <input type="text" class="form-control number" name="mobile[0]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Mobile1</label>
                                        <input type="text" class="form-control number" name="mobile1[0]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>PAN/DIN</label>
                                        <input type="text" class="form-control" name="pan_no[0]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Email Id</label>
                                        <input type="email" class="form-control" name="email_id[0]">
                                    </div>
                                </div>
		<div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <textarea class="form-control" name="address[0]" rows="4" cols="30"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="ajaxDirectors">
                            </div>
                            <input type="hidden" name="ajaxDirectors" class="ajaxDirectorsCount" value="1">
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

    $("#add_directors").validate({
      rules: {
        "name[0]": {
          required: true
        },
        "company_id[0]": {
          required:true
        }
      },
      messages: {
        "name[0]": "Please enter director name",
        "company_id[0]": "Please choose company"
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

        var form_data = new FormData(form);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/add_directors_process',
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
  
  function addMoreDirectors() {

    var count = $('body .ajaxDirectorsCount').val();

    $.ajax({
      type: 'POST',
      url: base_url + 'user/ajax_directors',
      cache: false,
      async: false,
      data: "count=" + count,
      dataType: "html",
      success: function(response) {
        $('.ajaxDirectors').append(response);
        var newcount = (parseInt(count) + 1);
        $('body .ajaxDirectorsCount').val(newcount);

        $('#add_directors select[name*=company_id]').each(function() {
          $(this).rules('add', {
            required: true,
            messages: {
              required: "Please choose company",
            }
          })
        });

        $('#add_directors input[name*=name]').each(function() {
          $(this).rules('add', {
            required: true,
            messages: {
              required: "Please enter director name",
            }
          })
        }); 

      },
      error: function(error) {
        toaster('error', error);
      }
    });
  }
  </script>
