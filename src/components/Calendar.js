import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './event-utils';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import CalendarSidebar from './CalendarSidebar';
const Calendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/calendarEvents/').then((res) => {
      setEvents(res);
    });
  }, []);
  const handleDateSelect = (e) => {
    console.log(e.view.calendar);
    let title = prompt('Please enter a new title for your event');
    let calendarApi = e.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: e.startStr,
        end: e.endStr,
        allDay: e.allDay,
      });
    }
  };

  return (
    <>
      {/* <CalendarSidebar /> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        initialEvents={events}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth dayGridWeek dayGridDay',
        }}
        events={events}
        // dateClick={(e) => {
        //   handleDateSelect(e);
        // }}
        select={(e) => {
          handleDateSelect(e);
        }}
      />
    </>
  );
};

export default Calendar;
