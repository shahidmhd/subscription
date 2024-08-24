<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                       
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="directors_list">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th class="text-nowrap">Company</th>
                                            <th class="text-nowrap">Name</th>
                                            <th class="text-nowrap">Mobile</th>
                                            <th class="text-nowrap">Mobile1</th>
                                            <th class="text-nowrap">Address</th>
                                            <th class="text-nowrap">PAN/DIN</th>
                                            <th class="text-nowrap">Email Id</th>
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
        var table = $('#directors_list').DataTable({
            "ajax": { type: 'POST', url: base_url+"user/view_directors_ajax"},
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
        exportOptions: {
            columns: ':not(.notexport)'
        },
        customize : function(doc) {doc.pageMargins = [10, 10, 10,10 ]; },
    }],
            "columnDefs": [
                { className: "text-nowrap", "targets": [1] }
            ],
            "columns": [
                { "data": "company"}, 
                { "data": "name"},                
                { "data": "mobile" },
                { "data": "mobile1" },
                { "data": "address" },
                { "data": "pan_no" },
                { "data": "email_id" },
                { "data": "action" }
            ],
            "order": [[0, 'asc']]
        });         
});
</script>