<style>
    /* Custom Switch for Active and Inactive */
    .custom-switch .custom-control-input:checked~.custom-control-label::before {
        background-color: green;
        /* Green for Active */
        border-color: green;
    }

    .custom-switch .custom-control-input~.custom-control-label::before {
        background-color: red;
        /* Red for Inactive */
        border-color: red;
    }

    .custom-switch .custom-control-input:checked~.custom-control-label::before {
        background-color: green;
        /* Ensure the switch stays green when checked */
    }

    /* Optional: Customize the switch knob */
    .custom-switch .custom-control-input:checked~.custom-control-label::after {
        background-color: white;
        /* Knob color */
    }

    .custom-switch .custom-control-input~.custom-control-label::after {
        background-color: white;
        /* Knob color */
    }
</style>
<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card">

            <div class="body">
                <div class="table-responsive">
                    <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="employees_list">
                        <thead class="thead-dark">
                            <tr>
                                <th class="text-nowrap notexport">Profile</th>
                                <th class="text-nowrap">Name</th>
                                <th class="text-nowrap">Mobile</th>
                                <th class="text-nowrap">Mobile1</th>
                                <th class="text-nowrap">Address</th>
                                <th class="text-nowrap">Email Id</th>
                                <th class="text-nowrap">Username</th>
                                <th class="text-nowrap">Role</th>
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
<!-- <script src="<//?= base_url() ?>assets/vendor/jquery-datatable/buttons/pdfmake.min.js"></script>
<script src="<//?= base_url() ?>assets/vendor/jquery-datatable/buttons/vfs_fonts.js"></script> -->
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.bootstrap4.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/jquery-datatable/buttons/buttons.html5.min.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/tables/jquery-datatable.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/ui/dialogs.js"></script>
<script type="text/javascript">
    $(document).ready(function() {

        var table = $('#employees_list').DataTable({
            "ajax": {
                type: 'POST',
                url: base_url + "user/view_employees_ajax",
                data: function(d) {
                    d.filter_status = '<?= $filters; ?>';
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
                "targets": [1, 2, 3]
            }],
            "columns": [{
                    "data": "profile_photo"
                },
                {
                    "data": "name"
                },
                {
                    "data": "mobile"
                },
                {
                    "data": "mobile1"
                },
                {
                    "data": "address"
                },
                {
                    "data": "email_id"
                },
                {
                    "data": "username"
                },
                {
                    "data": "role"
                },
                {
                    "data": "status"
                },
                {
                    "data": "action"
                }
            ],
            "order": [
                [1, 'asc']
            ]
        });

        $('#employees_list').on('change', '.status-toggle', function() {
            var employeeId = $(this).data('id');
            var newStatus = $(this).is(':checked') ? 'active' : 'inactive';

            $.ajax({
                url: base_url + "user/change_employee_status",
                type: "POST",
                data: {
                    employee_id: employeeId,
                    status: newStatus
                },
                success: function(response) {
                    var obj = $.parseJSON(response);
                    if (obj.status == 'success') {
                        // alert('Status updated successfully.');
                    } else {
                        toaster('error', obj.message);
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);

                    }
                },
                error: function() {
                    alert('Error occurred while updating status.');
                }
            });
        });
    });
</script>