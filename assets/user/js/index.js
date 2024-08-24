$(function() {
    "use strict";
    
    $.fn.exists = function() {
        return this.length > 0;
    };
    
    var menu = localStorage.getItem("menu");
    if ( menu === "layout-fullwidth") {
        $("body").addClass("layout-fullwidth");
        $(".btn-toggle-fullwidth").find(".fa").toggleClass("fa-expand fa-compress");
    }
    
    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top-140 }, 500);
    });
        
     
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");
    $.validator.addMethod("numberonly", function(value, element) {
        return this.optional(element) || /^[0-9.]+$/i.test(value);
    }, "Number only please");
    $.validator.addMethod("email", function(value, element) {
        return this.optional(element) || /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value);
    }, "Email Id format is wrong");
    $.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
    }, "Letters & numbers only");
    $.validator.addMethod("purl", function(value, element) {
        return this.optional(element) || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
    }, "Letters, hyphen and number only");
    $.validator.addMethod("amount", function(value, element) {
        return this.optional(element) || /^[+-]?([0-9]*[.])?[0-9]+$/i.test(value);
    }, "Invalid amount");
    $(document).find('body .amount').keypress(function(event) {
        return isNumber(event, this)
    });
    $(document).find('body .number').keypress(function(event) {
        return isNumberonly(event, this)
    });
    $.validator.addMethod("uaephone", function(value, element) {
        return this.optional(element) || /^(?:\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/i.test(value);
    }, "Invalid phone");
    $.validator.addMethod("needsSelection", function (value, element) {
        var count = $(element).find('option:selected').length;
        return count > 0;
    });
    
    setInterval(sessioncheck,10000);     
    
});




var xhr1;
function sessioncheck() {

  try {
    xhr1.abort();
  } catch (e) {}
  xhr1 = $.ajax({
    type: 'GET',
    url: base_url + 'user/sessioncheck',
    cache: false,
    async: true,
    dataType: 'json',
    error: function(error) {
      console.log(error);
    },
    success: function(data) {
      if (data.message == "nosession") {
        toastr.error('The authentication session has expired. You will now be redirected to login page.');
        setTimeout(function() {
          window.location.replace(base_url);
        }, 4000);
      } else {

        if(data.reminder.reminder <= 0) {
    		$('body .reminder').addClass('d-none').removeClass('bell');
    	} else {
    		$('body .reminder').removeClass('d-none').addClass('bell').html(data.reminder.reminder);
    	}
        if(data.general.general <= 0) {
    		$('body .other').addClass('d-none').removeClass('bell');
    	} else {
    		$('body .other').removeClass('d-none').addClass('bell').html(data.general.general);
    	}
        
      }
    }
  });
}

function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode != 45 || $(element).val().indexOf('-') != -1) && (charCode != 46 || $(element).val().indexOf('.') != -1) && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isNumberonly(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode < 48 || charCode > 57))
        return false;
    return true;
}
function toaster(type,message) {
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-top-right';    
    toastr[type](message);
}

function reminderNotifications() {
  $.ajax({
    type: 'GET',
    url: base_url + 'user/reminderNotifications',
    cache: true,
    async: true,
    dataType: 'html',
    success: function(data) {
      $('body .rmwrapper').html(data);
    }
  });
}

function generalNotifications() {
  $.ajax({
    type: 'GET',
    url: base_url + 'user/generalNotifications',
    cache: true,
    async: true,
    dataType: 'html',
    success: function(data) {
      $('body .genwrapper').html(data);
    }
  });
}

//read other notifications
function readNotifications(notification_id = "") {
  $.ajax({
    type: 'POST',
    url: base_url + 'user/readNotifications',
    cache: true,
    async: true,
    dataType: 'html',
    data: "notification_id=" + notification_id,
    success: function(data) {
      sessioncheck();
    }
  });
}


function get_directors(company_id,director_id="") {
    
    $.ajax({
        type: 'POST',
        url: base_url + 'user/get_directors',
        cache: false,
        async: false,
        data: 'company_id=' + company_id,
        dataType: 'json',
        success: function(response) {
            var html = '<option value="">Select Director</option>';
            response.result.forEach(function(director) {
                var selected = (director.director_id == director_id) ? 'selected' : '';
                html += '<option value="' + director.director_id + '" ' + selected + '>' + director.name + '</option>';
            });
            $('body select[name="director_id"]').html(html);
        },
        error: function(error) {
            console.log('error');
        }
    });

}

function deleteEmployee(employee_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/employee_delete_process',
            cache: false,
            async: false,
            data: "employee_id="+employee_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#employees_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteCompany(company_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/company_delete_process',
            cache: false,
            async: false,
            data: "company_id="+company_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#companies_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteDirector(director_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/director_delete_process',
            cache: false,
            async: false,
            data: "director_id="+director_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#directors_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function unAssignClient(assignment_id) {
    
    swal({
        title: "Are you sure?",
        text: "want to unassign the employee?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, unassign now!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/client_unassign_process',
            cache: false,
            async: false,
            data: "assignment_id="+assignment_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Unassigned!", obj.msg, "success");
                getAssignments();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
   
}

function deleteAssignment(assignment_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/assignment_delete_process',
            cache: false,
            async: false,
            data: "assignment_id="+assignment_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                getAssignments();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteAttendance(attendance_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/attendance_delete_process',
            cache: false,
            async: false,
            data: "attendance_id="+attendance_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                getAttendance(); 
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteAdvance(sadvance_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/advance_delete_process',
            cache: false,
            async: false,
            data: "sadvance_id="+sadvance_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                getAdvance(); 
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteSignature(signature_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/signature_delete_process',
            cache: false,
            async: false,
            data: "signature_id="+signature_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#signatures_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteReminder(reminder_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/reminder_delete_process',
            cache: false,
            async: false,
            data: "reminder_id="+reminder_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                toaster('success',obj.msg);
                if($("#calendar").length !== 0) {
                  calendar.refetchEvents();
                }
                $('#modal_ajax').modal('toggle');
              } else {
                toaster('success',obj.msg);          
              }
            },
            error: function(error) {	      
                toaster('success',error);
            }
         });
    });
}

function deleteWork(work_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/work_delete_process',
            cache: false,
            async: false,
            data: "work_id="+work_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#works_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}

function deleteInvoice(invoice_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/invoice_delete_process',
            cache: false,
            async: false,
            data: "invoice_id="+invoice_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#invoices_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}
function deleteInout(in_out_id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        
        $.ajax({
            type: 'POST',
            url: base_url + 'user/inout_delete_process',
            cache: false,
            async: false,
            data: "in_out_id="+in_out_id,
            dataType:"html",
            success: function(response) {              
              var obj = $.parseJSON(response);		          
	          if(obj.status==1) {
                swal("Deleted!", obj.msg, "success");
                $('#inout_list').DataTable().ajax.reload();
              } else {
                swal("Cancelled", obj.msg, "error");             
              }
            },
            error: function(error) {	      
                swal("Cancelled", "Something went wrong!", "error");
            }
         });
    });
}