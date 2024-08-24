<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                       
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="invoices_list">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th class="text-nowrap">Invoice No.</th>
                                            <th class="text-nowrap">Date</th>
                                            <th class="text-nowrap">Company</th>
                                            <th class="text-nowrap">Work</th>
                                            <th class="text-nowrap">Prof. Fee</th>
                                            <th class="text-nowrap">Roc Fee</th>
                                            <th class="text-nowrap">Invoice Amount</th>
                                            <th class="text-nowrap">Paid</th>
                                            <th class="text-nowrap">Balance</th>
                                            <th class="text-nowrap">Status</th>
                                            <th class="text-nowrap notexport">Action</th>
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
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/pdfmake.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/vfs_fonts.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.bootstrap4.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.html5.min.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/tables/jquery-datatable.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/ui/dialogs.js"></script>
<script type="text/javascript">
$(document).ready(function() {  
           var table = $('#invoices_list').DataTable({
            "ajax": { type: 'POST', url: base_url+"user/view_invoices_ajax"},
            dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [{
        extend: 'excel',
        text: 'Export to Excel',
        exportOptions: {
            columns: ':not(.notexport)'
        }
    },{
        extend: 'pdf',
        text: 'Export to PDF',
        pageSize: "A4",
 orientation: 'landscape',
        exportOptions: {
            columns: ':not(.notexport)'
        },
        customize : function(doc) {doc.pageMargins = [10, 10, 10,10 ]; },
    }],
            "columnDefs": [
                { className: "text-nowrap", "targets": [0] },
                /*{ targets: 3,
                   render: function ( data, type, row ) {
                     return data.length > 20 ?
                                data.substr( 0, 20 ) +'…' :
                                data;
                } }*/
            ],
            "columns": [
                { "data": "invoice_no"},
                { "data": "created_at"},
                { "data": "company" },
                { "data": "work" },
                { "data": "prof_fee" },
                { "data": "roc_fee" },
                { "data": "invoice_amount" },
                { "data": "paid_amount" },
                { "data": "balance_amount" },
                { "data": "status" },
                { "data": "action" }
            ],
            "order": [[1, 'desc']]
        });         
});
</script>