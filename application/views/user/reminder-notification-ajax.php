<?php //pr($notifi);?>
<?php if(!empty($notifi)) {?>
<li class="header text-white"><strong>You have <?=count($notifi)?> new reminders!</strong></li>
<?php foreach($notifi as $row) {?>
<li>
  <a href="javascript:void(0);" onclick="showAjaxModal('<?=base_url().'user/popup/view_reminder/'.$row['reminder_id']?>','View Reminder');">
    <div class="media">
      <div class="media-left">
        <i class="icon-calendar text-warning"></i>
      </div>
      <div class="media-body">
        <p class="text text-warning"><?=nl2br($row['title'])?></p>
        <span class="timestamp text-white"><?=get_date($row['reminder_date'])?></span>
      </div>
    </div>
  </a>
</li>
<?php } ?>
<?php } else {?>
<li class="header p-0 text-white"><strong>You have no reminders for today!</strong></li>
<?php } ?>
