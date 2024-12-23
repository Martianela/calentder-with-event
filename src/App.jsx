import { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const saveEvent = (event) => {
    const dateKey = selectedDate.toDateString();
    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), event],
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  const deleteEvent = (eventIndex) => {
    const dateKey = selectedDate.toDateString();
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter((_, index) => index !== eventIndex),
    };
    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey]; // Remove the date key if no events are left
    }
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-4xl font-medium mb-8">Event Calendar</h1>
      <CalendarGrid onDateClick={handleDateClick} events={events} />
      {selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={saveEvent}
          OnDelete={deleteEvent}
          events={events[selectedDate.toDateString()] || []}
        />
      )}
    </div>
  );
};

export default App;
