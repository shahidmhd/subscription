<?php //pr($notifi);?>
<?php if(!empty($notifi)) {?>
<?php /* <li class="header text-white"><strong>You have <?=count($notifi)?> new notifications!</strong></li> */?>
<?php foreach($notifi as $row) {
  
  if($row['read_status'] == 0) {
    $new = '<span class="badge badge-info">NEW</span>';
  } else {
    $new = "";
  }
  
  if($row['notification_type'] == 'work-assignment') {    
    $details = json_decode(@$row['notification_details']);   
    ?>
<li>
  <a href="javascript:void(0);" onclick="showAjaxModal('<?=base_url().'user/popup/view_work/'.$details->work_id?>','View Work');readNotifications('<?php echo $row['notification_id'];?>');">
    <div class="media">
      <div class="media-left">
        <i class="icon-check text-warning"></i>
      </div>
      <div class="media-body">
        <p class="text text-warning">New Work Assigned to You! <?=$new?></p>
        <span class="timestamp text-white"><?=get_date($row['created_date'])?></span>
      </div>
    </div>
  </a>
</li>
<?php }
if($row['notification_type'] == 'work-update') {    
    $details = json_decode(@$row['notification_details']);    
    ?>
<li>
  <a href="javascript:void(0);" onclick="showAjaxModal('<?=base_url().'user/popup/view_work/'.$details->work_id?>','View Work');readNotifications('<?php echo $row['notification_id'];?>');">
    <div class="media">
      <div class="media-left">
        <i class="icon-pencil text-warning"></i>
      </div>
      <div class="media-body">
        <p class="text text-warning">Work you have created is recently updated! <?=$new?></p>
        <span class="timestamp text-white"><?=get_date($row['created_date'])?></span>
      </div>
    </div>
  </a>
</li>
<?php } ?>
<?php } ?>
<?php } else {?>
<li class="header p-0 text-white"><strong>You have no notifications!</strong></li>
<?php } ?>
