import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarData } from '../types';

const Calendar = (events: CalendarData) => {

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      titleFormat={{
        month: 'short',
        year: 'numeric',
        day: 'numeric',
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
      contentHeight={500}
    />
  )
}

export default Calendar;