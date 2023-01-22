import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
const Calendar = () => {
  return (
    <>
      <FullCalendar
        defaultView='dayGridMonth'
        plugins={[dayGridPlugin]}
        events={[{ title: 'event 1', date: '2023-01-13' }]}
      />
    </>
  );
};

export default Calendar;
