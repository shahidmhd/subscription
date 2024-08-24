<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css">
<div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                <form class="form-auth-small" action="" name="client_assignment" id="client_assignment" method="POST" enctype="multipart/form-data">
                    <div class="card mb-3">
                        <div class="body">
                            <div class="row clearfix">                                                                
                                <div class="col-md-3 col-sm-12">                                    
                                    <div class="form-group">
                                      <label>Clients<sup>*</sup></label>
                                        <select class="form-control show-tick" name="client_id" id="client_id" onchange="getAssignments()">
                                            <option value="">Select Client</option>
                                            <?php foreach($clients as $row) { ?>
                                            <option value="<?= $row['client_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-12">                                    
                                    <div class="form-group">
                                      <label>Employees<sup>*</sup></label>
                                        <select class="form-control show-tick" name="employee_id">
                                            <option value="">Select Employee</option>
                                            <?php foreach($employees as $row) { ?>
                                            <option value="<?= $row['employee_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-12">                                    
                                    <div class="form-group mt-4">
                                        <input type="submit" class="btn btn-lg btn-primary btnsmt" value="Assign" />
                                        <input type="reset" class="btn btn-lg btn-danger" value="Cancel">
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                  </form>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="header">
                            <h2>Current Assignments</h2>
                        </div>
                        <div class="body">
                           <div class="table-responsive">
                                <table class="table table-hover dataTable table-custom table-striped m-b-0 c_list" id="assignment_list">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>
                                                &nbsp;
                                            </th>
                                            <th>Employee</th>
                                            <th>Type</th>
                                            <th>Client</th>
                                            
                                            <th>Assigned Date</th>
                                            <th>Unassigned Date</th>
                                            <th>Status</th> 
                                            <th>Action</th>
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
<script type = "text/javascript" >
  var table;
$(function() {

  table = $('#assignment_list').on( 'draw.dt', function () {
            console.log( 'Loading' );
        }).DataTable({
    "columns": [
      {"data": "profile_photo"},
      {"data": "employee"},
      {"data": "type"},
      {"data": "client"},
      
      {"data": "assigned_date"},
      {"data": "unassigned_date"},
      {"data": "status"},
      {"data": "action"}
    ],
    "order": [
      [1, 'desc']
    ]
  });

  $("#client_assignment").validate({
    rules: {
      client_id: {
        required: true
      },
      employee_id: {
        required: true
      }
    },
    messages: {
      client_id: "Please choose client",
      employee_id: "Please choose employee"
    },
    submitHandler: function(form, e) {
      e.preventDefault();

      $('.btnsmt').prop('disabled', true).attr('value', 'Processing...');
      var form_data = new FormData(form);
      setTimeout(function() {
        $.ajax({
          type: 'POST',
          url: base_url + 'user/client_assignment_process',
          cache: false,
          async: false,
          data: form_data,
          contentType: false,
          processData: false,
          success: function(response) {

            var obj = $.parseJSON(response);
            if (obj.status == 1) {
              toaster('success', obj.msg);
              $('.btnsmt').prop('disabled', false).attr('value', 'Save');              
              getAssignments();
            } else {
              toaster('error', obj.msg);
              $('.btnsmt').prop('disabled', false).attr('value', 'Save');
            }

          },
          error: function(error) {
            toaster('error', error);
            $('.btnsmt').prop('disabled', false).attr('value', 'Save');
          }
        });
      }, 500);
      return false;
    }
  });

});

function getAssignments() {

  var client_id = $('body #client_id').val();
  if (client_id != "") {
    $.ajax({
      type: 'POST',
      url: base_url + 'user/get_assignments',
      cache: false,
      async: false,
      data: "client_id=" + client_id,
      dataType: "html",
      success: function(response) {
        var obj = JSON.parse(response);
        table.clear();
        table.rows.add(obj).draw();
      }
    });
  } else {
    toaster('error', "Please choose client!");
  }

}

</script>
