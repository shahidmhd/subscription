"use strict";
$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listWeek'
    },
    defaultDate: new Date().toISOString().slice(0, 10),
    editable: false,
    droppable: false, // this allows things to be dropped onto the calendar
    drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
        }
    },
    eventLimit: false, // allow "more" link when too many events
    plugins: [ 'interaction' ],
    dateClick: function(info) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = 'red';
  },
    events: [
        {
            title: 'All Day Event',
            start: '2021-04-20',
            className: 'bg-info',
            
        },
        {
            title: 'All Day Event',
            start: '2021-04-20',
            className: 'bg-info',
            
        },
        {
            title: 'All Day Event',
            start: '2021-04-20',
            className: 'bg-info',
            
        },
        {
            title: 'All Day Event',
            start: '2021-04-20',
            className: 'bg-info',
            
        },
        {
            title: 'Long Event',
            start: '2021-04-20',
            end: '2021-04-23',
            className: 'bg-danger'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2021-04-15 16:30:00',
            className: 'bg-dark'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2021-04-14T16:00:00',
            className: 'bg-success'
        },
        {
            title: 'Conference',
            start: '2021-04-01',
            end: '2021-04-03',
            className: 'bg-primary'
        },
        {
            title: 'Meeting',
            start: '2021-04-25T10:30:00',
            end: '2021-04-29T12:30:00',
            className: 'bg-warning'
        },
        {
            title: 'Lunch',
            start: '2018-08-12T12:00:00',
            className: 'bg-dark'
        },
        {
            title: 'Meeting',
            start: '2018-08-12T14:30:00',
            className: 'bg-secondary'
        },
        {
            title: 'Happy Hour',
            start: '2018-07-12T17:30:00',
            className: 'bg-dark'
        },
        {
            title: 'Dinner',
            start: '2018-06-12T20:00:00',
            className: 'bg-warning'
        },
        {
            title: 'Birthday Party',
            start: '2018-08-13T07:00:00',
            className: 'bg-success'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-04-28',
            className: 'bg-primary'
        }
    ]
});

    