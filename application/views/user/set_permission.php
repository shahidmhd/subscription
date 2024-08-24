<?php
$modules = $this->common_model->selectAll('modules','','*');
$permissions = $this->common_model->selectOne('permissions',array('role_id'=>$param2),'GROUP_CONCAT(module_id) as permissions');
//pr($this->session->userdata());
if(!empty($modules)) {
   $permissions_array = explode(",",$permissions['permissions']);

?>

<div class="row clearfix">
    <div class="col-md-12 col-sm-12">
        <div class="form-group">          
            <div class="row clearfix">                
				<?php $i=0; foreach($modules as $row) {?> 
                <div class="col-md-6 col-sm-6">                     
                       <label for="view<?=$i?>" class="fancy-checkbox"><input class="checkbox-tick" type="checkbox" name="view<?=$i?>" id="view<?=$i?>" <?=(in_array($row['module_id'],$permissions_array))?'checked="checked"':''?> onclick="changePermission(this,'<?=$row['module_id']?>')"><span><?=$row['name']?></span></label>
                </div>
				<?php $i++;} ?> 
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">

	  function changePermission(ths,module_id) {
          
          var role_id = '<?=$param2?>';
          var value;
          if ($(ths).is(":checked")) {
            value = 1;
          } else {
            value = 0;
          }
          
          $.ajax({
            type: 'POST',
            url: base_url + 'user/permission_process',
            cache: false,
            async: false,
            data: "role_id="+role_id+"&module_id="+module_id+"&value="+value,
            dataType:"html",          
            success: function(response) {              
              var obj = $.parseJSON(response);		          
                if(obj.status==1) {
                toaster('success',obj.msg);
              } else {
                toaster('error',obj.msg);            
              }
            },
            error: function(error) {	      
                toaster('error',obj.msg);
            }
        });
		  
		  return false;
          
       }

</script>
<?php } else {
$this->load->view('theme/user/notfound');
} ?>