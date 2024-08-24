<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
    <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
        <form class="form-auth-small" action="" name="company_add" id="company_add" method="POST" enctype="multipart/form-data">
            <div class="card">
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Subscription Name<sup>*</sup></label>
                                <input type="text" class="form-control" name="name" value="<?= $subscription_details['name']; ?>">
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Duration<sup>*</sup></label>
                                <input type="text" class="form-control number" name="duration" value="<?= $subscription_details['duration']; ?>">
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Price</label>
                                <input type="text" class="form-control number" name="price" value="<?= $subscription_details['price']; ?>">
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Maximum workers</label>
                                <input type="text" class="form-control number" name="max_workers" value="<?= $subscription_details['max_workers']; ?>">
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12">
                            <div class="form-group select2">
                                <label>Status.<sup>*</sup></label>
                                <select class="form-control" name="status">
                                    <option value="">Select</option>
                                    <option value="active" <?= (($subscription_details['status'] == 'active')? "selected" : ""); ?>>Active</option>
                                    <option value="de-active" <?= (($subscription_details['status'] == 'de-active')? "selected" : ""); ?>>De-active</option>
                                </select>
                            </div>
                        </div>

                        
                    </div>

                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="mt-4 text-right">
                                <input type="hidden" name="subsrciption_id" value="<?= $subscription_details['subsrciption_id'] ?>" />
                                <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Save" />
                                <input type="reset" class="btn btn-lg btn-danger" value="Reset">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script src="<?= base_url() ?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript">
    $(function() {

        $("#company_add").validate({
            rules: {
                name: {
                    required: true
                },
                duration: {
                    required: true
                },
                price: {
                    required: true
                },
                max_workers: {
                    required: true
                },
                status: {
                    required: true
                }
            },
            messages: {
                name: "Please enter company name",
                duration: "Please choose duration",
                price: "Please enter price",
                max_workers: "Please enter Max workers",
                status: "Please enter status",
                
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

                var form_data = new FormData(form);

                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'user/edit_subscription_process',
                        cache: false,
                        async: false,
                        data: form_data,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            var obj = $.parseJSON(response);
                            if (obj.status == 1) {
                                toaster('success', obj.msg);
                                setTimeout(function() {
                                    window.location.reload();
                                }, 2000);
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