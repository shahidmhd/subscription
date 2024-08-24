<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">

<?php 
$employees  = $this->common_model->selectAll('employees',array('status'=>'active','role_id !='=>'5'),'*');
?>
<div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                <form class="form-auth-small" action="" name="split_work" id="split_work" method="POST" enctype="multipart/form-data">
                   
                            <div class="row clearfix">
                               
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Title<sup>*</sup></label>
                                        <input type="text" class="form-control" name="title[0]" id="ttl0">
                                      </div>
                                    </div>
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Description<sup>*</sup></label>
                                        <textarea class="form-control" name="description[0]" id="des0" rows="4" cols="30"></textarea>
                                      </div>
                                    </div>
                                 
		
                                     <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Assigned To<sup>*</sup></label>
                                        <select class="form-control show-tick" name="assigned_to[0]" id="ass0">
                                            <option value="">Select Employee</option>
                                            <?php foreach($employees as $row) { ?>
                                            <option value="<?= $row['employee_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Start Date<sup>*</sup></label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="work_date[0]" id="wdt0" class="form-control"  onkeydown="return false;">
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Expected Finish Date</label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="last_date[0]" id="ldt0" class="form-control" onkeydown="return false;">
                                      </div>
                                    </div>
		    <div class="col-md-6 col-sm-12">
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
		
                            </div>  
                            
                            <div class="ajaxSplit">
                            </div>
                            <input type="hidden" name="ajaxSplit" class="ajaxSplitCount" value="1">
                            
                            <div class="row">
                                 <div class="col-sm-12">
                                    <div class="text-right mt-4">
                                        
                                        <input type="button" class="btn btn-lg btn-warning btnsmt2" value="Split More" onclick="addMoreSplit()"/>
                                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Save" />
                                    </div>
                                </div>
                                </div>
                            
                        
                  </form>
                </div>
            </div>

<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type = "text/javascript" >
  $(function() {

    $("#split_work").validate({
      rules: {
        "assigned_to[0]": {
          required:true
        },
        "title[0]": {
          required:true,
        },
        "description[0]": {
          required:true
        },
        "work_date[0]": {
          required:true
        }
      },
      messages: {
        "assigned_to[0]": {
          required:"Please choose employee"
        },
        "title[0]": {
          required:"Please enter title"
        },
        "description[0]": {
          required:"Please enter description"
        },
        "work_date[0]": {
          required:"Please choose start date"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        
        var work_id = '<?=$param2?>';
        var company_id = '<?=$param3?>';

        var form_data = new FormData(form);
        form_data.append('work_id',work_id);
        form_data.append('company_id',company_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/split_work_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              if (obj.status == 1) {
                toaster('success', obj.msg);
                $('#works_list').DataTable().ajax.reload();
                $('#modal_ajax').modal('toggle');
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
  
  function addMoreSplit() {

    var count = $('body .ajaxSplitCount').val();

    $.ajax({
      type: 'POST',
      url: base_url + 'user/ajax_split',
      cache: false,
      async: false,
      data: "count=" + count,
      dataType: "html",
      success: function(response) {
        $('.ajaxSplit').append(response);
        var newcount = (parseInt(count) + 1);
        $('body .ajaxSplitCount').val(newcount);
      },
      error: function(error) {
        toaster('error', error);
      }
    });
  }

  </script>
