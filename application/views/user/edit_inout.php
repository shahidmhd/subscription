<?php
$inout = $this->common_model->inout_by_id($param2);
//pr($inout);
?>
<div class="row clearfix">
  <div class="col-md-12 col-sm-12">
    <div class="form-group">
      <form class="form-auth-small" action="" name="edit_inout" id="edit_inout" method="POST" enctype="multipart/form-data">
        <div class="row clearfix">

          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Serial No.<sup>*</sup></label>
              <input type="text" class="form-control" name="serial_no" value="<?=$inout['serial_no']?>" />
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>In/Out<sup>*</sup></label>
              <select class="form-control show-tick" name="in_out">
                <option value="dsin" <?=($inout['in_out'] == 'dsin')?'selected':''?>>IN</option>
                <option value="dsout" <?=($inout['in_out'] == 'dsout')?'selected':''?>>OUT</option>
              </select>
            </div>
          </div>
          <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Director Name</label>
                                        <input type="text" class="form-control" name="director" value="<?=$inout['director']?>">
                                    </div>
                                </div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Taken/Return By<sup>*</sup></label>
              <input type="text" class="form-control" name="taken_by" value="<?=$inout['taken_by']?>" >
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Phone<sup>*</sup></label>
              <input type="text" class="form-control number" name="phone" value="<?=$inout['phone']?>" >
            </div>
          </div>
          <div class="col-md-12 col-sm-12">
            <div class="form-group">
              <label>Remarks</label>
              <textarea class="form-control" name="remarks" rows="4" cols="30"><?=$inout['remarks']?></textarea>
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

<script type = "text/javascript" >
  $(function() {

    $("#edit_inout").validate({
      rules: {    
        taken_by: {
          required:true
        },
        phone: {
          required:true
        },
        serial_no: {
          required:true,
          remote: {
                url: "user/checkSignatureExist",
                type: "post"
               }
        },
        in_out: {
          required:true
        }
      },
      messages: {
        taken_by: {
          required:"Please enter taken/return by"
        },
        phone: {
          required:"Please enter phone"
        },
        serial_no: {
          required:"Please enter serial number",
          remote: "Signature not exist"
        },
        in_out: {
          required:"Please choose in/out status"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        var in_out_id = '<?= $inout['in_out_id']?>';
        var form_data = new FormData(form);
        form_data.append('in_out_id',in_out_id);
        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/edit_inout_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              if (obj.status == 1) {
                toaster('success', obj.msg);
	$('#inout_list').DataTable().ajax.reload();
	$('#modal_ajax').modal('toggle');
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

  </script>
