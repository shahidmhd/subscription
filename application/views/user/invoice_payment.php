<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">

<?php 
$invoice = $this->common_model->selectOne('invoices',array('invoice_id'=>$param2),'*');

define('CURRENCY',$this->settings->get_settings('currency'));

if(!empty($invoice)) {
	
	$history = $this->common_model->selectAll('payment_history',array('invoice_id'=>$invoice['invoice_id']),'*');
	//pr($history);
	
?>
<div class="row clearfix">
	<?php if(!empty($history)) {?>
	<div class="col-md-12">
		<h5>Payment History:</h5>
	<div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Paid Date</th>
                                            <th>Paid Amount</th>
                                        </tr>
									</thead>
                                   
                                    <tbody>
										<?php $i=1; foreach($history as $row) {?>
                                        <tr>
                                            <td><?=$i?></td>
                                            <td><?=get_date($row['modified_at'])?></td>
                                            <td><?= CURRENCY.' '.$row['paid_amount']?></td>
                                        </tr>
                                      <?php $i++; } ?>
                                    </tbody>
                                </table>
                            </div>
	</div>
	<?php } ?>
	<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body p-2">
                            <div class="p-0 text-light">
                                <h4><?= CURRENCY.' '.$invoice['invoice_amount']?></h4>
                                <span>Invoice Amount</span>
                            </div>
                        </div>
                    </div>
                </div>
	
	<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body p-2">
                            <div class="p-0 text-light">
                                <h4><?= CURRENCY.' '.$invoice['paid_amount']?></h4>
                                <span>Paid</span>
                            </div>
                        </div>
                    </div>
                </div>
	<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card text-center l-blush text-white">
                        <div class="body p-2">
                            <div class="p-0 text-light">
                                <h4><?= CURRENCY.' '?><span class="balance"><?=$invoice['balance_amount']?></span></h4>
                                <span>Balance</span>
                            </div>
                        </div>
                    </div>
                </div>
</div>
<?php if($invoice['status'] == 'pending') {?>
<div class="row clearfix">
  <div class="col-lg-12 col-md-12 col-sm-12">
    <form class="form-auth-small" action="" name="payment" id="payment" method="POST" enctype="multipart/form-data">
      <div class="row clearfix">
        <div class="col-md-4">
          <div class="form-group">
            <label>Amount<sup>*</sup></label>
            <input type="text" class="form-control amount" name="paid_amount" value="">
          </div>
        </div>
		<div class="col-md-4">
          <div class="form-group">
			<label>Invoice Status</label>
                    <input type="hidden" name="status" value="pending" />
                    <label class="fancy-checkbox mr-0 mb-0"><input class="checkbox-tick" type="checkbox" name="status" value="paid"><span>&nbsp;Close Invoice</span></label>                    
                    </div>
        </div> 
        <div class="col-md-4">
	<label>Balance Amount</label>
	<h5><?= CURRENCY.' '?><span class="tmnt">0.00</span></h5>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="text-right">
            <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Pay Now" />
            <input type="reset" class="btn btn-lg btn-danger" value="Reset">
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
<?php } ?>

<?php if($invoice['status']=='paid') {?>
<div class="alert alert-success text-center" role="alert">Invoice Closed!</div>
<?php } ?>
<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type = "text/javascript" >
  $(function() {

    $("#payment").validate({
      rules: {
        paid_amount: {
          required:true,
          amount:true
        }
      },
      messages: {
        paid_amount: {
          required:"Please enter amount",
          amount: "Invalid amount"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
        
        var invoice_id = '<?=$invoice['invoice_id']?>';

        var form_data = new FormData(form);
        form_data.append('invoice_id',invoice_id);

        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: base_url + 'user/payment_process',
            cache: false,
            async: false,
            data: form_data,
            contentType: false,
            processData: false,
            success: function(response) {

              var obj = $.parseJSON(response);
              if (obj.status == 1) {
                toaster('success', obj.msg);
                $('#invoices_list').DataTable().ajax.reload();
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
		var balance  = $('.balance').text();
            $('body .amount').each(function() { 
                tot += Number($(this).val());               
            });
           
            if(tot=='' || tot== null || tot === 'undefined' || isNaN(tot)) {
                tot = 0;
            }			
            tot = Number(balance)-Number(tot);
            $('.tmnt').html(tot.toFixed(2));
     }
  </script>
<?php } ?>
