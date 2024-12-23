import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const EventModal = ({
  date,
  onClose,
  onSave,
  events,
  OnDelete,
  editingEventIndex,
  setEditingEventIndex,
}) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");

  // If editing, populate the modal fields with the event's current data
  React.useEffect(() => {
    if (editingEventIndex !== null) {
      const eventToEdit = events[editingEventIndex];
      setEventName(eventToEdit.eventName);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setDescription(eventToEdit.description || "");
      setCategory(eventToEdit.category);
    }
  }, [editingEventIndex, events]);

  const handleSave = () => {
    if (eventName && startTime && endTime) {
      onSave({ eventName, startTime, endTime, description, category });
      onClose();
    }
  };

  const handleEdit = (index) => {
    setEditingEventIndex(index); // Set the index of the event to be edited
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium">
            {editingEventIndex === null ? `Add Event` : `Edit Event`} for{" "}
            {date.toDateString()}
          </h3>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <div className="flex space-x-2 items-center">
            <Label htmlFor="start-time">Start</Label>
            <Input
              type="time"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-fit"
            />
            <Label htmlFor="end-time">End time</Label>
            <Input
              type="time"
              id="end-time"
              className="w-fit"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Event Category</SelectLabel>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={handleSave}>
            {editingEventIndex === null ? "Save Event" : "Save Changes"}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
        <div className="mt-4">
          <h4 className="text-lg">Events:</h4>
          <ul className="list-disc space-y-2">
            {events.map((event, index) => {
              const categoryColors = {
                Work: "bg-blue-50",
                Personal: "bg-green-50",
                Others: "bg-yellow-50",
              };
              const bgColor = categoryColors[event.category] || "bg-slate-50";
              return (
                <li
                  key={index}
                  className={`flex w-full justify-between p-1 px-4 rounded-md ${bgColor}`}
                >
                  <div>
                    <p>
                      <strong>{event.eventName}</strong>{" "}
                      <span className="text-sm">
                        {event.startTime} - {event.endTime}
                      </span>
                    </p>
                    {event.description && (
                      <p className="text-sm text-gray-500">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-2 flex">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => OnDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  OnDelete: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  editingEventIndex: PropTypes.number,
  setEditingEventIndex: PropTypes.func.isRequired,
};

export default EventModal;
