import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";

const CalendarGrid = ({ onDateClick, events = {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calculate start and end of the month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Array of days in a week (abbreviated)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the start day of the month (0 for Sun, 1 for Mon, etc.)
  const startDay = startOfMonth.getDay();

  // Generate the days of the current month
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  // Add empty cells for the days before the 1st of the month
  const emptyCells = Array(startDay).fill(null);

  // Combine empty cells and the actual days in the month
  const calendarDays = [...emptyCells, ...daysInMonth];

  // Handlers for previous and next month navigation
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth} className="w-24">
          Previous
        </Button>
        <h2 className="text-2xl font-medium">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <Button className="w-24" onClick={handleNextMonth}>
          Next
        </Button>
      </div>

      {/* Render the days of the week */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {weekDays.map((day, index) => (
          <div key={index} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Render the days of the current month with empty cells for alignment */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`flex justify-center items-center border p-2 cursor-pointer rounded-lg ${
              day ? "hover:bg-blue-100" : "bg-gray-100"
            }`}
            onClick={day ? () => onDateClick(day) : undefined}
          >
            {day ? (
              <>
                <span className="text-lg font-semibold">{day.getDate()}</span>
                {events[day.toDateString()]?.length > 0 && (
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1"></div>
                )}
              </>
            ) : (
              <span className="text-lg font-semibold"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop Types Validation
CalendarGrid.propTypes = {
  onDateClick: PropTypes.func.isRequired,
  events: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    )
  ),
};

export default CalendarGrid;
