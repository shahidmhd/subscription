<!-- VENDOR CSS -->
 <link rel="stylesheet" href="<?php echo base_url();?>assets/vendor/bootstrap/css/bootstrap.min.css"> 
<link rel="stylesheet" href="<?php echo base_url();?>assets/vendor/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="<?php echo base_url();?>assets/vendor/toastr/toastr.min.css">
<link rel="stylesheet" href="<?php echo base_url();?>assets/vendor/sweetalert/sweetalert.css"/>

<!-- MAIN CSS -->
<link rel="stylesheet" href="<?php echo base_url();?>assets/common/css/main.css">
<link rel="stylesheet" href="<?php echo base_url();?>assets/common/css/color_skins.css">
<link rel="stylesheet" href="<?php echo base_url();?>assets/user/css/custom.css">

<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<script src="<?= base_url() ?>assets/user/bundles/libscripts.bundle.js"></script>
<script src="<?= base_url() ?>assets/user/bundles/vendorscripts.bundle.js"></script>
<script src="<?php echo base_url();?>assets/common/js/jquery.validate.min.js"></script>
<script type="text/javascript">
var base_url = '<?php echo base_url();?>';
var calendar;
</script>
<!--
<script type="text/javascript">
  window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage;                            //Webkit, Safari, Chrome
});
</script>
-->