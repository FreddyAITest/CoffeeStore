import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Coffee Tasting',
      date: new Date(2023, 7, 15), // August 15, 2023
      description: 'Join us for a tasting of our new single-origin beans from Ethiopia.',
      time: '6:00 PM - 8:00 PM'
    },
    {
      id: 2,
      title: 'Latte Art Workshop',
      date: new Date(2023, 7, 20), // August 20, 2023
      description: 'Learn how to create beautiful latte art with our head barista.',
      time: '3:00 PM - 5:00 PM'
    },
    {
      id: 3,
      title: 'Live Music Night',
      date: new Date(2023, 7, 25), // August 25, 2023
      description: 'Enjoy acoustic performances from local musicians while sipping your favorite coffee.',
      time: '7:00 PM - 9:00 PM'
    },
    {
      id: 4,
      title: 'Book Club Meeting',
      date: new Date(2023, 8, 5), // September 5, 2023
      description: 'This month we\'re discussing "The Coffee Trader" by David Liss.',
      time: '5:30 PM - 7:00 PM'
    }
  ];

  // Function to check if a date has events
  const hasEvents = (date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Function to get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Custom tile content to mark dates with events
  const tileContent = ({ date, view }) => {
    if (view === 'month' && hasEvents(date)) {
      return <div className="event-dot"></div>;
    }
    return null;
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Get events for the selected date
  const selectedDateEvents = getEventsForDate(date);

  return (
    <div className="calendar-page">
      <div className="container">
        <h1 className="page-title">Events Calendar</h1>
        
        <div className="calendar-container">
          <div className="calendar-wrapper">
            <Calendar 
              onChange={handleDateChange} 
              value={date}
              tileContent={tileContent}
              className="react-calendar"
            />
          </div>
          
          <div className="events-panel">
            <h2 className="date-header">
              {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            
            {selectedDateEvents.length > 0 ? (
              <div className="events-list">
                {selectedDateEvents.map(event => (
                  <div className="event-card" key={event.id}>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-time">{event.time}</p>
                    <p className="event-description">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events">
                <p>No events scheduled for this date.</p>
                <p>Check another date or come back soon for updates!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="upcoming-events">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date - b.date)
              .slice(0, 4)
              .map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-date">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-time">{event.time}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;