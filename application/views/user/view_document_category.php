<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card">

            <div class="body">
                <div class="table-responsive">
                    <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="document_list">
                        <thead class="thead-dark">
                            <tr>
                                <th class="text-nowrap">Name</th>
                                <th class="text-nowrap text-center notexport">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?= base_url() ?>assets/user/bundles/datatablescripts.bundle.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/dataTables.buttons.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/jszip.min.js"></script>
<!-- <script src="<//?= base_url() ?>assets/vendor/jquery-datatable/buttons/pdfmake.min.js"></script>
<script src="<//?= base_url() ?>assets/vendor/jquery-datatable/buttons/vfs_fonts.js"></script> -->
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.bootstrap4.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.html5.min.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/tables/jquery-datatable.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/ui/dialogs.js"></script>
<script type="text/javascript">
    $(document).ready(function() {

        var table = $('#document_list').DataTable({
            "ajax": {
                type: 'POST',
                url: base_url + "user/view_document_categories_ajax",

            },
            dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons: [{
                extend: 'excel',
                text: 'Export to Excel',
                exportOptions: {
                    columns: ':not(.notexport)'
                }
            }, {
                extend: 'pdf',
                //orientation: 'landscape',
                text: 'Export to PDF',
                pageSize: "A4",
                exportOptions: {
                    columns: ':not(.notexport)'
                },
                customize: function(doc) {
                    doc.pageMargins = [10, 10, 10, 10];
                    /*doc.content[1].table.widths = 
                           Array(doc.content[1].table.body[0].length + 1).join('*').split('');*/
                },
            }],
            "columnDefs": [{
                className: "text-nowrap",
                "targets": [1]
            }],
            "columns": [{
                    "data": "name"
                },
                {
                    "data": "action"
                }
            ],
            "order": [
                [1, 'asc']
            ]
        });


    });

    function deleteCategory(category_id) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this data!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function() {
            $.ajax({
                type: 'POST',
                url: base_url + 'user/document_category_delete_process',
                cache: false,
                async: false,
                data: {
                    document_category_id: category_id
                },
                dataType: "html",
                success: function(response) {
                    var obj = $.parseJSON(response);
                    if (obj.status == 1) {
                        swal("Deleted!", obj.msg, "success");
                        $('#document_list').DataTable().ajax.reload();
                    } else {
                        swal("Cancelled", obj.msg, "error");
                    }
                },
                error: function(error) {
                    swal("Cancelled", "Something went wrong!", "error");
                }
            });
        });
    }
</script>