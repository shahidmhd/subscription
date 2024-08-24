<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                       
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="permissions_list">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th class="text-nowrap">Role</th>
                                            <th class="text-nowrap" width="10%">Action</th>
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
<script src="<?= base_url() ?>assets/user/js/pages/tables/jquery-datatable.js"></script>
<script src="<?= base_url() ?>assets/user/js/pages/ui/dialogs.js"></script>
<script type="text/javascript">
$(document).ready(function() {  
        var table = $('#permissions_list').DataTable({
            "ajax": { type: 'POST', url: base_url+"user/view_permissions_ajax"},
            "columnDefs": [
                { className: "text-nowrap", "targets": [0] }
            ],
            "columns": [
                { "data": "role"},
                { "data": "action" }
            ],
            "order": [[0, 'asc']]
        });         
});
</script>