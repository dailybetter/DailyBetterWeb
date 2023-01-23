import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';

// import CalendarSidebar from './CalendarSidebar';
const Calendar = () => {
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

  const handleEvents = (e) => {
    e.setState({
      currentEvents: e,
    });
  };

  return (
    <>
      {/* <CalendarSidebar /> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        initialEvents={INITIAL_EVENTS}
        eventsSet={(e) => {
          handleEvents(e);
        }}
        dateClick={(e) => {
          handleDateSelect(e);
        }}
      />
    </>
  );
};

export default Calendar;
