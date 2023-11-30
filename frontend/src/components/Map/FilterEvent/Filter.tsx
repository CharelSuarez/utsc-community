"use client"
import "./Filter.css";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import AddEventModal from "@/components/Modal/AddEventModal/AddEventModal" 
import { useState } from "react";
import { createPortal } from 'react-dom';


export default function Filter(){

  const [showAddEventModal, setAddEventShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  const getStartDate = (date:string) => {
      setStartDate(date);
  }

  const getEndDate = (date:string) => {
      setEndDate(date);
  }

  const getLocation = (location:string) =>{
      setLocation(location)
  }
    return (
      <div className="filterAndAdd">
        <div className="filters">
          <Calendar getDate={getStartDate} label="Start Date"></Calendar>
          <Calendar getDate={getEndDate} label="End Date"></Calendar>
          <Location getLocation={getLocation}></Location>
        </div>
        <div className="submit">
          <button>Filter Events</button>
        </div>
        <div className="addEvent">
          <button onClick={() => setAddEventShowModal(true)}>Create an Event</button>
        </div>
        <div>
        </div>
        {showAddEventModal && createPortal(
                <AddEventModal onClose={() => setAddEventShowModal(false)}/>,
                document.body
            )}
      </div>
      );
}