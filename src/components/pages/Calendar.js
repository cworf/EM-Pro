import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from '../../assets/data/events.js';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

function Calendar(props){

  return (
    <div style={{height: '80vh'}}>
      <BigCalendar
        selectable
        events={events}
        defaultView="month"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={slotInfo =>
          alert(
            `selected slot:
            start ${slotInfo.start.toLocaleString()}
            end: ${slotInfo.end.toLocaleString()}
            action: ${slotInfo.action}`
          )
        }
      />
    </div>
  );
}

export default Calendar;
