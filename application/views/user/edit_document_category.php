<div class="row clearfix">
    <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
        <form class="form-auth-small" action="" name="document_edit" id="document_edit" method="POST" enctype="multipart/form-data">
            <div class="card">
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Name<sup>*</sup></label>
                                <input type="text" class="form-control" name="name" value="<?= $category_details['name'] ?>">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="mt-4 text-right">
                                <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Update" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script src="<?= base_url() ?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js"></script>
<script src="<?= base_url() ?>assets/vendor/dropify/js/dropify.min.js"></script>
<script type="text/javascript">
    $(function() {

        $("#document_edit").validate({
            rules: {
                name: {
                    required: true
                },
            },
            messages: {
                name: "Please enter category name",
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');

                var form_data = new FormData(form);
                var category_id = '<?= $category_details['id'] ?>';

                form_data.append('category_id', category_id);

                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'user/edit_document_category_process',
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
                                $('.btnsmt').prop('disabled', false).attr('value', 'Update');
                            }

                        },
                        error: function(error) {
                            toaster('error', error);
                            $('.btnsmt').prop('disabled', false).attr('value', 'Update');
                        }
                    });
                }, 500);
                return false;
            }
        });
    });
</script>