<?php
$work = $this->common_model->work_by_id($param2);
// pr($work);
?>

<div class="row clearfix">
    <div class="col-md-12 col-sm-12">
        <div class="form-group">
           <form class="form-auth-small" action="" name="delete_reminder" id="delete_reminder" method="POST" enctype="multipart/form-data">
            <div class="row clearfix">               
                 
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Title:</strong></div>
						<div class="col-md-8 mb-3 wb"><?= nl2br($work['title'])?></div>
					</div>
                </div>
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Description:</strong></div>
						<div class="col-md-8 mb-3 wb"><?= nl2br($work['description'])?></div>
					</div>
                </div>
				<div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Work Date:</strong></div>
						<div class="col-md-8 mb-3"><?= get_date($work['work_date'])?></div>
					</div>
                </div>
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Expected Finish Date:</strong></div>
						<div class="col-md-8 mb-3"><?= get_date($work['last_date'])?></div>
					</div>
                </div>
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Assigned To:</strong></div>
						<div class="col-md-8 mb-3"><?= $work['assigned_to']?></div>
					</div>
                </div>
                 <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Task Type:</strong></div>
						<div class="col-md-8 mb-3"><?= task_type($work['tasktype'])?></div>
					</div>
                </div>
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Subtasks:</strong></div>
						<div class="col-md-8 mb-3"><?= $work['subtasks']?></div>
					</div>
                </div>
                 <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Status:</strong></div>
						<div class="col-md-8 mb-3"><?= work_status($work['status'])?></div>
					</div>
                </div>
				 <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Checked by:</strong></div>
						<div class="col-md-8 mb-3 wb"><?= $work['checked_by']?></div>
					</div>
                </div>
				 <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Remarks:</strong></div>
						<div class="col-md-8 mb-3 wb"><?= nl2br($work['remarks'])?></div>
					</div>
                </div>
                <div class="col-md-12 col-sm-12">
					<div class="row">
						<div class="col-md-4"><strong class="text-danger">Modified Date:</strong></div>
						<div class="col-md-8 mb-3"><?= get_date($work['modified_at'])?></div>
					</div>
                </div>
				
            </div>
           </form>
        </div>
    </div>
</div>