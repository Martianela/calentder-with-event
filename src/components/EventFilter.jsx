import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EventFilter = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventToShow, setEventToShow] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Filter events based on eventName
    const filteredEvents = events.filter((event) =>
      event.eventName.toLowerCase().includes(value.toLowerCase())
    );
    //console.log(filteredEvents);
    setEventToShow(filteredEvents);
  };
  //console.log(eventToShow);

  return (
    <div className="max-w-4xl w-full mt-10 bg-white p-3 rounded-lg">
      <div className="flex items-center ">
        <Input
          type="text"
          placeholder="Search by Event Name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md rounded-r-none"
        />
        <Button
          className="rounded-l-none"
          onClick={() => {
            setSearchTerm("");
            setEventToShow([]);
          }}
        >
          Clear Filter
        </Button>
      </div>
      <div className="mt-5 flex gap-2 flex-col">
        {eventToShow.length == 0 ? (
          <p className="text-gray-400 text-sm px-2">No event to show</p>
        ) : (
          eventToShow.map((event, index) => {
            const categoryColors = {
              Work: "bg-blue-100",
              Personal: "bg-green-100",
              Others: "bg-yellow-100",
            };
            const bgColor = categoryColors[event.category] || "bg-slate-50";
            return (
              <div
                key={`event-${index}`}
                className="p-3 bg-gray-50 w-full rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg">{event?.eventName}</h4>
                  <div className="flex items-center gap-3 capitalize text-gray-500 text-sm">
                    <p>
                      start-time <span>{event.startTime}</span>
                    </p>
                    <p className="">
                      end-time <span>{event.endTime}</span>
                    </p>
                  </div>
                  <p className={`${bgColor} p-1 px-4 rounded-full text-sm`}>
                    {event.category}
                  </p>
                </div>
                <p className="text-gray-700/80 text-sm mt-2 capitalize">
                  {event.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

EventFilter.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
};

export default EventFilter;
