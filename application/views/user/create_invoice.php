<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">

<?php 
$work = $this->common_model->work_by_id($param2);//pr($work);
$invoice = $this->common_model->selectOne('invoices',array('work_id'=>$param2),'*');

define('CURRENCY',$this->settings->get_settings('currency'));

if(!empty($invoice)) {
?>
<div class="row clearfix">
	<div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body">
                            <div class="p-2 text-light">
                                <h4><?= CURRENCY.' '.$invoice['prof_fee']?> + <?= CURRENCY.' '.$invoice['roc_fee']?></h4>
                                <span>Professional Fee + ROC Fee</span>
                            </div>
                        </div>
                    </div>
                </div>
	
	<div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body">
                            <div class="p-2 text-light">
                                <h4><?= CURRENCY.' '.$invoice['invoice_amount']?></h4>
                                <span>Invoice Amount</span>
                            </div>
                        </div>
                    </div>
                </div>
	<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body">
                            <div class="p-2 text-light">
                                <h4><?=$invoice['invoice_no']?></h4>
                                <span>Invoice No.</span>
                            </div>
                        </div>
                    </div>
                </div>
</div>
<?php } else { ?>
<div class="row clearfix">
  <div class="col-lg-12 col-md-12 col-sm-12">
    <form class="form-auth-small" action="" name="create_invoice" id="create_invoice" method="POST" enctype="multipart/form-data">
      <div class="row clearfix">
        <div class="col-md-4">
          <div class="form-group">
            <label>Professional Fee<sup>*</sup></label>
            <input type="text" class="form-control amount" name="prof_fee" value="<?=(isset($invoice['prof_fee']))?$invoice['prof_fee']:0?>">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label>ROC Fee<sup>*</sup></label>
            <input type="text" class="form-control amount" name="roc_fee" value="<?=(isset($invoice['roc_fee']))?$invoice['roc_fee']:0?>">
          </div>
        </div>
        <div class="col-md-4">
	<label>Invoice Amount</label>
	<h5><?= CURRENCY.' '?><span class="tmnt"><?=(isset($invoice['invoice_amount']))?$invoice['invoice_amount']:'0.00'?></span></h5>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="text-right">
            <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Create" />
            <input type="reset" class="btn btn-lg btn-danger" value="Reset">
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type = "text/javascript" >
  $(function() {

    $("#create_invoice").validate({
      rules: {
        prof_fee: {
          required:true,
          amount:true
        },
        roc_fee: {
          required:true,
          amount:true
        }
      },
      messages: {
        prof_fee: {
          required:"Please enter professional fee",
          amount: "Invalid amount"
        },
        roc_fee: {
          required:"Please enter roc fee",
          amount: "Invalid amount"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        
        var work_id = '<?=$work['work_id']?>';
        var company_id = '<?=$work['company_id']?>';

        var form_data = new FormData(form);
        form_data.append('work_id',work_id);
        form_data.append('company_id',company_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/create_invoice_process',
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
    
    $(document).on('keyup','body .amount', function () {
            calcAmount();            
      });
  });
  
function calcAmount() {
        var tot = 0;	
            $('body .amount').each(function() { 
                tot += Number($(this).val());               
            });
           
            if(tot=='' || tot== null || tot === 'undefined' || isNaN(tot)) {
                tot = 0;
            }			
            tot = Number(tot);
            $('.tmnt').html(tot.toFixed(2));
     }
  </script>
<?php } ?>
