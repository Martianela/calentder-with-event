import { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import EventFilter from "./components/EventFilter";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const saveEvent = (event) => {
    const dateKey = selectedDate.toDateString();
    const existingEvents = events[dateKey] || [];

    // Function to check if two events overlap
    const isOverlapping = (newEvent, existingEvent) => {
      const newStart = new Date(`${dateKey} ${newEvent.startTime}`).getTime();
      const newEnd = new Date(`${dateKey} ${newEvent.endTime}`).getTime();
      const existingStart = new Date(
        `${dateKey} ${existingEvent.startTime}`
      ).getTime();
      const existingEnd = new Date(
        `${dateKey} ${existingEvent.endTime}`
      ).getTime();

      return (
        newStart < existingEnd && newEnd > existingStart // Overlap condition
      );
    };

    // Check for overlap with existing events
    const hasOverlap = existingEvents.some((existingEvent) =>
      isOverlapping(event, existingEvent)
    );

    if (hasOverlap) {
      toast.error(
        "This event overlaps with an existing event. Please choose a different time."
      );
      return;
    }

    // If no overlap, add the event
    const updatedEvents = {
      ...events,
      [dateKey]: [...existingEvents, event],
    };

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const editEvent = (updatedEvent) => {
    const dateKey = selectedDate.toDateString();
    const updatedEvents = { ...events };
    updatedEvents[dateKey][editingEventIndex] = updatedEvent;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEditingEventIndex(null); // Reset the editing state after saving
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
          onSave={editingEventIndex === null ? saveEvent : editEvent}
          OnDelete={deleteEvent}
          events={events[selectedDate.toDateString()] || []}
          editingEventIndex={editingEventIndex}
          setEditingEventIndex={setEditingEventIndex}
        />
      )}
      <EventFilter events={Object.values(events).flat()} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
