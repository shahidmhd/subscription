<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">

<?php 
$employees  = $this->common_model->selectAll('employees',array('status'=>'active','role_id !='=>'5'),'*');
$companies  = $this->common_model->selectAll('company','','*');
$work = $this->common_model->selectOne('works',array('work_id'=>$param2),'*');
$employee_id = $this->session->userdata('employee_id');
$role_id = $this->session->userdata('role_id');
?>
<div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                <form class="form-auth-small" action="" name="edit_work" id="edit_work" method="POST" enctype="multipart/form-data">
                   
                            <div class="row clearfix">
                               
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Title<sup>*</sup></label>
                                        <input type="text" class="form-control" name="title" value="<?=$work['title']?>">
                                      </div>
                                    </div>
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Description<sup>*</sup></label>
                                        <textarea class="form-control" name="description" rows="4" cols="30"><?=$work['description']?></textarea>
                                      </div>
                                    </div>
		
		
                                 
                                      <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Company<sup>*</sup></label>
                                        <select class="form-control show-tick" name="company_id">
                                            <option value="">Select Company</option>
                                            <?php foreach($companies as $row) { 
                                            if($work['created_by'] != $employee_id && $work['company_id'] != $row['company_id'] && $role_id != 5) {
                                                continue;
                                            }
                                            ?>
                                            <option value="<?= $row['company_id']?>" <?=($work['company_id']==$row['company_id'])?'selected':''?>><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                      </div>
                                    </div>
                                     <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Assigned To<sup>*</sup></label>
                                        <select class="form-control show-tick" name="assigned_to">
                                            <option value="">Select Employee</option>
                                            <?php foreach($employees as $row) { 
                                            if($work['created_by'] != $employee_id && $work['assigned_to'] != $row['employee_id'] && $role_id != 5) {
                                                continue;
                                            }
                                            ?>
                                            <option value="<?= $row['employee_id']?>" <?=($work['assigned_to']==$row['employee_id'])?'selected':''?>><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Start Date<sup>*</sup></label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="work_date" class="form-control"  onkeydown="return false;" value="<?=get_date($work['work_date'])?>">
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Expected Finish Date</label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="last_date" class="form-control" onkeydown="return false;" value="<?=get_date($work['last_date'])?>">
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Status<sup>*</sup></label>
                                        <select class="form-control show-tick" name="status">
                                            <option value="">Select Status</option>
                                            <option value="allotted" <?=($work['status']== 'allotted')?'selected':''?>>Allotted</option>
                                            <option value="ready_to_check" <?=($work['status']== 'ready_to_check')?'selected':''?>>Ready to Check</option>
                                            <option value="ready_to_file" <?=($work['status']== 'ready_to_file')?'selected':''?>>Ready to File</option>
		            <option value="filed" <?=($work['status']== 'filed')?'selected':''?>>Filed</option>
                                            <option value="finished" <?=($work['status']== 'finished')?'selected':''?>>Finished</option>
                                        </select>
                                      </div>
                                    </div>
		    <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Checked By</label>
                                        <input type="text" class="form-control" name="checked_by" value="<?=$work['checked_by']?>">
                                    </div>
                                </div>
		    <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Remarks</label>
                                        <textarea class="form-control" name="remarks" rows="4" cols="30"><?=$work['remarks']?></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                            <div class="row">
                                 <div class="col-sm-12">
                                    <div class="text-right mt-4">
                                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Update" />
                                    </div>
                                </div>
                                </div>
                            
                        
                  </form>
                </div>
            </div>

<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type = "text/javascript" >
  $(function() {

    $("#edit_work").validate({
      rules: {
        company_id: {
          required:true
        },
        assigned_to: {
          required:true
        },
        title: {
          required:true,
        },
        description: {
          required:true
        },
        work_date: {
          required:true
        },
        status: {
          required:true
        }
      },
      messages: {
        company_id: {
          required:"Please choose company"
        },
        assigned_to: {
          required:"Please choose employee"
        },
        title: {
          required:"Please enter title"
        },
        description: {
          required:"Please enter description"
        },
        work_date: {
          required:"Please choose start date"
        },
        status: {
          required:"Please choose status"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        
        var work_id = '<?=$param2?>';

        var form_data = new FormData(form);
        form_data.append('work_id',work_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/edit_work_process',
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
  </script>
