<?php //print_r($this->session->userdata()); 
?>
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card">

            <div class="body">
                <div class="table-responsive">
                    <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="signatures_list">
                        <thead class="thead-dark">
                            <tr>
                                <th width="20%">Company</th>
                                <th class="">Task</th>
                                <th class="">Description</th>
                                <th width="20%">Assign to</th>
                                <th width="10%">Date</th>
                                <th width="10%">Last Date</th>
                                <th width="10%">Status</th>
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
        var table = $('#signatures_list').DataTable({
            "ajax": {
                type: 'POST',
                url: base_url + "user/view_tasks_ajax",
                data: {
                    'filter': '<?= $filter; ?>'
                }
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
                text: 'Export to PDF',
                pageSize: "A4",
                exportOptions: {
                    columns: ':not(.notexport)'
                },
                customize: function(doc) {
                    doc.pageMargins = [10, 10, 10, 10];
                },
            }],
            "columnDefs": [{
                className: "text-nowrap",
                "targets": [0, 3]
            }],
            "columns": [{
                    "data": "company"
                },
                {
                    "data": "task"
                },
                {
                    "data": "description"
                },
                {
                    "data": "assign_to"
                },
                {
                    "data": "date"
                },
                {
                    "data": "last_date"
                },
                {
                    "data": "status"
                }
            ],
            "order": [
                [0, 'asc']
            ]
        });
    });
</script>