<link rel="stylesheet" href="<?= base_url() ?>assets/vendor/fullcalendar/lib/main.css">
<div class="row clearfix">

  <?php if (check_permission(14) || check_permission(15) || check_permission(16)) { ?>
    <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="card text-center l-amber text-white">
        <a href="<?= base_url() ?>user/view_tasks/tasks">
          <div class="body">
            <div class="p-2 text-light">
              <h4><?= $tasks; ?></h4>
              <span>Tasks</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="card text-center l-parpl text-white">
        <a href="<//?= base_url() ?>user/view_tasks/allotted">
          <div class="body">
            <div class="p-2 text-light">
              <h4><//?= $allotted; ?></h4>
              <span>Task Allotted</span>
            </div>
          </div>
        </a>
      </div>
    </div> -->
  <?php } ?>
  <?php if (check_permission(17) || check_permission(18) || check_permission(19) || check_permission(20) || check_permission(21)) { ?>
    <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="card text-center l-blush text-white">
        <!-- <a href="<?= base_url() ?>user/view_works/pending"> -->
        <a href="<?= base_url() ?>user/view_tasks/pending">
          <div class="body">
            <div class="p-2 text-light">
              <h4><?= $pending; ?></h4>
              <span>Task Pending</span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="card text-center l-blush text-white">
        <a href="<?= base_url() ?>user/view_tasks/finished">
          <div class="body">
            <div class="p-2 text-light">
              <h4><?= $finished; ?></h4>
              <span>Task Finished</span>
            </div>
          </div>
        </a>
      </div>
    </div>

  <?php } ?>
  <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card text-center l-parpl text-white">
      <a href="<?= base_url() ?>view-employees">
        <div class="body">
          <div class="p-2 text-light">
            <h4><?= $total_employees; ?></h4>
            <span>Employees</span>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card text-center l-parpl text-white">
      <a href="<?= base_url() ?>view-employees/active">
        <div class="body">
          <div class="p-2 text-light">
            <h4><?= $active_employees; ?></h4>
            <span>Active Employees</span>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card text-center l-parpl text-white">
      <a href="<?= base_url() ?>view-employees/inactive">
        <div class="body">
          <div class="p-2 text-light">
            <h4><?= $inactive_employees; ?></h4>
            <span>InActive Employees</span>
          </div>
        </div>
      </a>
    </div>
  </div>

</div>
<?php if (check_permission(27)) { ?>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="body">
          <div id="calendar" style="width:100% !important;display:inline-block;"></div>
        </div>
      </div>
    </div>
  </div>

  <script src="<?= base_url() ?>assets/vendor/fullcalendar/lib/main.js"></script><!--/ calender javascripts -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');

      calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek'
        },
        initialDate: new Date().toISOString().slice(0, 10),
        editable: false,
        navLinks: true, // can click day/week names to navigate views
        dayMaxEvents: true, // allow "more" link when too many events
        handleWindowResize: true,
        events: {
          url: base_url + 'user/get_reminders',
          //failure: function() {
          //  toaster('warning','No reminders!');  
          //}
        },
        windowResize: function(arg) {
          //alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);       
        },
        eventClick: function(info) {
          var url = base_url + 'user/popup/view_reminder/' + info.event.id;
          showAjaxModal(url, 'View Reminder');
        },
        dateClick: function(info) {
          var url = base_url + 'user/popup/create_reminder';
          showAjaxModal(url, 'Create Reminder');
          setTimeout(function() {
            $('body input[name="reminder_date"]').val(formatDate(info.dateStr));
          }, 1000);
        }
      });

      calendar.render();



    });

    function formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];
      return day + '/' + month + '/' + year;
    }
  </script>
<?php } ?>