import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { createEventId } from './event-utils';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { EventModal,eventModalOpen } from './EventModal';
// import CalendarSidebar from './CalendarSidebar';
const Calendar = () => {
  let toggle = true;
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/calendarEvents/').then((res) => {
      setEvents(res.data);
    });
    console.log('랜더링');
  }, [toggle]);
  const handleDateSelect = (e) => {
    console.log(e.view.calendar.addEvent);
    let title = prompt('Please enter a new title for your event');
    let calendarApi = e.view.calendar;
    calendarApi.unselect();
    if (title) {
      axios.post('http://localhost:3003/calendarEvents', {
        allDay: e.allDay,
        end: e.endStr,
        id: uuid(),
        start: e.startStr,
        title,
        resourceEditable: true
      });
      calendarApi.addEvent({
        allDay: e.allDay,
        end: e.endStr,
        id: uuid(),
        start: e.startStr,
        title,
        resourceEditable: true
      });
      toggle = !toggle;
    }
  };
  //삭제 함수
  const handleEventClick = (e) => {
    console.log(e);
    const eventTitle = e.el.fcSeg.eventRange.def.title;
    const deleteId = e.el.fcSeg.eventRange.def.publicId;
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`${eventTitle}를 삭제하시겠습니까?`)) {
      e.event.remove();
      axios.delete(`http://localhost:3003/calendarEvents/${deleteId}`);
    }
  };
  //드롭 
  const eventDrop = (info) =>{
    // alert(info.event.start.toISOString())
    console.log(info.event)
    const updateId = info.event._def.publicId
    axios.get(`http://localhost:3003/calendarEvents/${updateId}`).then((res) =>{
      axios.put(`http://localhost:3003/calendarEvents/${updateId}`,{...res.data,start:info.event.start.toISOString(), end:info.event.end.toISOString() })
    })
  }

  return (
    <>
      <EventModal />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable
        selectable
        droppable
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth dayGridWeek dayGridDay',
        }}
        events={events}
        eventClick={(e) => {
          handleEventClick(e);
        }}
        eventDrop = {eventDrop}
        select={(e) => {
          handleDateSelect(e);
          eventModalOpen()
        }}
      />
    </>
  );
};

export default Calendar;
