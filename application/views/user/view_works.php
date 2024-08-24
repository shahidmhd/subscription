<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <form class="form-auth-small" action="" name="get_work" id="get_work" method="POST" enctype="multipart/form-data">
            <div class="card">
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-md-3 col-sm-12">
                            <div class="form-group">
                                <label>From<sup>*</sup></label>
                                <input type="text" data-provide="datepicker" id="min" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="from_date" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-12">
                            <div class="form-group">
                                <label>To<sup>*</sup></label>
                                <input type="text" data-provide="datepicker" id="max" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="to_date" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-12">
                            <div class="form-group">
                                <label>Status<sup>*</sup></label>
                                <select name="status" id="status" class="form-control">
                                    <option value="">Select Status</option>
                                    <option value="allotted">Pending</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-12">
                            <div class="form-group">
                                <label>Employees<sup>*</sup></label>
                                <select class="form-control show-tick" name="assigned_to" id="assigned_to">
                                    <option value="">Select Employee</option>
                                    <?php foreach ($employees as $row) { ?>
                                        <option value="<?= $row['employee_id'] ?>"><?= $row['name'] ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                        <?php if (!empty($companies)) : ?>
                            <div class="col-md-3 col-sm-12">
                                <div class="form-group">
                                    <label>Company<sup>*</sup></label>
                                    <select name="company_id" id="company_id" class="form-control">
                                        <option value="">Select Company</option>
                                        <?php foreach ($companies as $company) : ?>
                                            <option value="<?= $company['company_id']; ?>">
                                                <?= $company['name']; ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>

                </div>
            </div>
        </form>
    </div>
    <div class="col-lg-12">
        <div class="card">
            <div class="body">
                <div class="table-responsive">
                    <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list no-alignment" id="works_list">
                        <thead class="thead-dark">
                            <tr>
                                <th class="text-nowrap">Title</th>
                                <th class="text-nowrap">Company</th>
                                <th class="text-nowrap">Assigned To</th>
                                <th class="text-nowrap">Task Type</th>
                                <th class="text-nowrap">Sub Tasks</th>
                                <th class="text-nowrap">Work Date</th>
                                <th class="text-nowrap">Expected Finish Date</th>
                                <th class="text-nowrap">Invoice No.</th>
                                <th class="text-nowrap">Status</th>
                                <th class="text-nowrap">Checked By</th>
                                <th class="text-nowrap">Remarks</th>
                                <th class="text-nowrap">Updated Date</th>
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
<script src="<?= base_url() ?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
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
    var table;
    var minDate, maxDate;
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var min = minDate;
            var max = maxDate;
            var date = data[5];
            if ((min == "" && max == "") ||
                (min == undefined && max == undefined) ||
                (min === null && max === null) ||
                (min <= date && date <= max)) {
                return true;
            }
            return false;
        }
    );


    $(document).ready(function() {

        table = $('#works_list').DataTable({
            "ajax": {
                type: 'POST',
                url: base_url + "user/view_works_ajax",
                data: function(d) {
                    d.filter = '<?= $filter ?>';
                    d.parent_id = '<?= $parent_id ?>';
                    d.status = $('#status').val();
                    d.assigned_to = $('#assigned_to').val();
                    d.company = $('#company_id').val()
                }
                // data: {
                //     'filter': '<//?= $filter ?>',
                //     'parent_id': '<//?= $parent_id ?>'

                // }
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
                orientation: 'landscape',
                exportOptions: {
                    columns: ':not(.notexport)'
                },
                customize: function(doc) {
                    doc.pageMargins = [10, 10, 10, 10];
                },
            }],
            "columnDefs": [{
                    className: "text-nowrap",
                    "targets": [7]
                },
                /*{ targets: [0,10],
                   render: function ( data, type, row ) {
                     return data.length > 20 ?
                                data.substr( 0, 20 ) +'…' :
                                data;
                } }*/
            ],
            "columns": [{
                    "data": "title"
                },
                {
                    "data": "company"
                },
                {
                    "data": "assigned_to"
                },
                {
                    "data": "tasktype"
                },
                {
                    "data": "subtasks"
                },
                {
                    "data": "work_date"
                },
                {
                    "data": "last_date"
                },
                {
                    "data": "invoice_no"
                },
                {
                    "data": "status"
                },
                {
                    "data": "checked_by"
                },
                {
                    "data": "remarks"
                },
                {
                    "data": "modified_at"
                },
                {
                    "data": "action"
                }
            ],
            "order": [
                [5, 'asc']
            ]
        });

        $('#min, #max').on('change', function() {
            minDate = $('#min').val();
            maxDate = $('#max').val();
            table.draw();
        });

        $('#status, #assigned_to,#company_id').on('change', function() {
            table.ajax.reload();
        });


    });
</script>