<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card">
            <div class="body">
                <div class="table-responsive">
                    <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="subscription_history_list">
                        <thead class="thead-dark">
                            <tr>
                                <th class="text-nowrap">Subscription Name</th>
                                <th class="text-nowrap">Purchase Date</th>
                                <th class="text-nowrap">Start Date</th>
                                <th class="text-nowrap">Expiry Date</th>
                                <th width="15%" class="text-nowrap">Amount</th>
                                <th width="15%" class="text-nowrap">Subscription Type</th>
                                <th width="15%" class="text-nowrap">Status</th>
                               
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
        var table = $('#subscription_history_list').DataTable({
            "ajax": {
                type: 'POST',
                url: base_url + "subscription/view_subscriptionhistory_ajax"
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
                "targets": [0]
            }],
            "columns": [{
                    "data": "subscription_name"
                },
                {
                    "data": "purchase_date"
                },
                {
                    "data": "start_date"
                },
                {
                    "data": "expiry_date"
                },
                {
                    "data": "amount"
                },
                {
                    "data": "subscription_type"
                },
                {
                    "data": "status"
                },
            ],
            "order": [
                [2, 'desc']
            ]
        });
    });
</script>