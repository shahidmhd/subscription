<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
    <div class="col-md-12 col-sm-12">
        <div class="form-group">
           <form class="form-auth-small" action="" name="create_reminder" id="create_reminder" method="POST" enctype="multipart/form-data">
            <div class="row clearfix">               
                 
                <div class="col-md-12 col-sm-12">
                     <div class="form-group">
                        <label>Title<sup>*</sup></label>
                            <input type="text" class="form-control" name="title"/>
                    </div>
                </div>
				<div class="col-md-12 col-sm-12">
                     <div class="form-group">
                        <label>Reminder Date<sup>*</sup></label>
                            <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="reminder_date" class="form-control" onkeydown="return false;">
                    </div>
                </div>
				
                <div class="col-md-12 col-sm-12">
                     <div class="form-group">
                        <label>Description<sup>*</sup></label>
                            <textarea name="description" class="form-control" rows="4"></textarea>
                    </div>
                </div>
				<div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Highlight<sup>*</sup></label>
                                        <select class="form-control show-tick" name="color">
                                            <option value="red">Red</option>
											<option value="green">Green</option>
											<option value="blue">Blue</option>
											<option value="orange">Orange</option> 
                                        </select>
                                    </div>
                                </div>
                <div class="col-sm-12 text-right">
                   
                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Save" />
                   
                </div>
            </div>
           </form>
        </div>
    </div>
</div>
<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript">
$("#create_reminder").validate({		  
          rules: {            
            title: {
                required:true             
            },
            reminder_date: {
                required:true             
            },
			description: {
				required:true
			},
			color: {
				required:true
			}
          },
          messages: {           
            title: {
                required:"Please enter title"           
            },
            reminder_date: {
                required:"Please choose reminder date"
            },
			description: {
				required:"Please enter description"
			},
			color: {
				required: "Please choose highlight color"
			}
          },
          submitHandler: function(form, e) {
            
            
               e.preventDefault();
               
               $('.btnsmt').prop('disabled', true).attr('value','Processing...');
               var form_data = new FormData(form);
                 setTimeout(function(){      
                        $.ajax({
                         type: 'POST',
                         url: base_url + 'user/create_reminder_process',
                         cache: false,
                         async: false,
                         data: form_data,
                         contentType: false,
                         processData: false,
                         success: function(response) {
                                                       
                            var obj = $.parseJSON(response);		          
                            if(obj.status==1) {
                               toaster('success',obj.msg);
							   if($("#calendar").length !== 0) {
                                 calendar.refetchEvents();
                               }							   
                               $('#modal_ajax').modal('toggle');
                            } else {
                              toaster('error',obj.msg);
                              $('.btnsmt').prop('disabled', false).attr('value','Approve');
                            }
                             
                         }, error: function(error) {	      
							toaster('error',error);
							$('.btnsmt').prop('disabled', false).attr('value','Approve');
					     }
                         
                        });
                 },500);
         
               return false;
          }
});
</script>