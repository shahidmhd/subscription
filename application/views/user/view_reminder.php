<?php
$reminder = $this->common_model->selectOne('reminders',array('reminder_id'=>$param2),'*');
?>

<div class="row clearfix">
    <div class="col-md-12 col-sm-12">
        <div class="form-group">
           <form class="form-auth-small" action="" name="delete_reminder" id="delete_reminder" method="POST" enctype="multipart/form-data">
            <div class="row clearfix">               
                 
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Title:</strong></div>
						<div class="col-md-8 mb-3"><?= nl2br($reminder['title'])?></div>
					</div>
                </div>
				<div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Reminder Date:</strong></div>
						<div class="col-md-8 mb-3"><?= get_date($reminder['reminder_date'])?></div>
					</div>
                </div>
				<div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Description:</strong></div>
						<div class="col-md-8"><?= nl2br($reminder['description'])?></div>
					</div>
                </div>
				
				
                				
                <div class="col-sm-12 mt-4">
                   <?php if(check_permission(26)) {?>
                        <input type="button" class="btn btn-lg btn-primary btnsmt pull-left" value="Edit" onclick="showAjaxModal('<?=base_url('user/popup/edit_reminder/'.$reminder['reminder_id'])?>','Edit Reminder')"/>
				   <?php } ?>
				   <?php if(check_permission(28)) {?>
					<input type="button" class="btn btn-lg btn-danger btnsmt2 pull-right" value="Delete" onclick="deleteReminder('<?=$reminder['reminder_id']?>')"/>
					<?php } ?>
                   
                </div>
            </div>
           </form>
        </div>
    </div>
</div>