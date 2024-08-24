<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="<?= base_url()?>assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
<div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                <form class="form-auth-small" action="" name="attendance_report" id="attendance_report" method="POST" enctype="multipart/form-data">
                    <div class="card">
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-md-3 col-sm-12">
                                    <div class="form-group">
                                        <label>Employee</label>
                                        <select class="form-control show-tick" name="employee_id">
                                            <option value="">Select Employee</option>
                                            <?php foreach($employees as $row) { ?>
                                            <option value="<?= $row['employee_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
		<div class="col-md-3 col-sm-12">
                                    <div class="form-group">
                                     <label>From</label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="from_date" class="form-control" value="<?=date('d/m/Y')?>">
                                    </div>
                                </div>
		<div class="col-md-3 col-sm-12">
                                    <div class="form-group">
                                     <label>To</label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="to_date" class="form-control" value="<?=date('d/m/Y')?>">
                                    </div>
                                </div>
		<div class="col-md-3 col-sm-12 d-none">
                                    <div class="mt-4">
                                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Get Report" />
                                        <a href="<?=base_url('attendance')?>" class="btn btn-lg btn-danger">Reset</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                  </form>
                </div>
                <div class="col-lg-12">
                    <div class="card">
                       
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="attendance_list">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th class="text-nowrap">Date</th>
                                            <th class="text-nowrap">Employee</th>
                                            <th class="text-nowrap">Total Time</th>
                                            <th class="text-nowrap">Status</th>
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
<script src="<?= base_url()?>assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
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
var table;
$(document).ready(function() {  
        table = $('#attendance_list').DataTable({
            //"ajax": { type: 'POST', url: base_url+"user/attendance_ajax"},
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
                { className: "text-nowrap", "targets": [0,1] }
            ],
            "columns": [
                { "data": "attendance_date"},                
                { "data": "employee" },
                { "data": "totaltime" },
                { "data": "status" }
            ],
            "order": [[0, 'desc']]
        });
        
        $('select[name="employee_id"],input[name="from_date"],input[name="to_date"]').on('change',function(e){      
         //table.clear().draw();
         attendance_report();
       });
        
        $("#attendance_report").validate({
          rules: {            
             from_date: {
               required: function(element) {
                 return $('input[name="to_date"]').val().length > 0;
               }
             },
             to_date: {
               required: function(element) {
                 return $('input[name="from_date"]').val().length > 0;
               }
             }
         },
         messages: {            
            from_date: {
	required: "Please choose from date"
            },
            to_date: {
	required: "Please choose to date"
            }
         },
         submitHandler: function(form, e) {
	
               e.preventDefault();  	
               attendance_report();               
               return false;
               }
      });
        
        attendance_report();
        
});

function attendance_report(form_data) {
        var data = {
          "employee_id": $('select[name="employee_id"]').val(),
          "from_date": $('input[name="from_date"]').val(),
          "to_date": $('input[name="to_date"]').val()
        };
        $.ajax({
	type: 'POST',
	url: base_url + 'user/attendance_ajax',
	cache: false,
	async: false,
	data: data,
	
	success: function(response) {
	   var obj = $.parseJSON(response);
                   table.clear();
	   table.rows.add(obj).draw();
	},
	error: function(error) {
	   toaster('error',error);
	}
       });
    }
</script>