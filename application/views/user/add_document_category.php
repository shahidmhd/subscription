<div class="row clearfix">
    <div class="col-lg-6 col-md-6 col-sm-6 m-auto">
        <form class="form-auth-small" action="" name="document_add" id="document_add" method="POST" enctype="multipart/form-data">
            <div class="card">
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Name<sup>*</sup></label>
                                <input type="text" class="form-control" name="name">
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="mt-4 text-right">
                                <input type="submit" id="btnsmt" class="btn btn-lg btn-primary btnsmt" value="Save" />
                                <input type="reset" class="btn btn-lg btn-danger" value="Reset">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>



<script type="text/javascript">
    $(function() {

        $("#document_add").validate({
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

                setTimeout(function() {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'user/add_documentcategory_process',
                        cache: false,
                        async: false,
                        data: form_data,
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            var obj = $.parseJSON(response);
                            console.log(obj);

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
                            console.log(error);
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