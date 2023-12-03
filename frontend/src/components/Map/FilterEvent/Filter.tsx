"use client"
import "./Filter.css";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import AddEventModal from "@/components/Modal/AddEventModal/AddEventModal" 
import { useState } from "react";
import { createPortal } from 'react-dom';

interface AddEventProp{
  onAddFunction: (state:boolean) => void;
  setStartDate: (filterElement:string) => void;
  setEndDate: (filterElement:string) => void;
  setLocation: (filterElement:string) => void;
}

export default function Filter({onAddFunction, setStartDate, setEndDate, setLocation}: AddEventProp){

  const [showAddEventModal, setAddEventShowModal] = useState(false);
  const [startDate, setStartDateFilter] = useState("");
  const [endDate, setEndDateFilter] = useState("");
  const [location, setLocationFilter] = useState("");

  const getStartDate = (date:string) => {
    setStartDateFilter(date);
  }

  const getEndDate = (date:string) => {
    setEndDateFilter(date);
  }

  const getLocation = (location:string) =>{
    setLocationFilter(location);
  }

  const getFilters = () =>{
    setStartDate(startDate);
    setEndDate(endDate);
    setLocation(location);
  }

    return (
      <div className="filterAndAdd">
        <div className="filters">
          <Calendar getDate={getStartDate} label="Start Date"></Calendar>
          <Calendar getDate={getEndDate} label="End Date"></Calendar>
          <Location getLocation={getLocation}></Location>
        </div>
        <div className="submit">
          <button className="button active buttonFilter" onClick={getFilters}>Filter Events</button>
        </div>
        <div className="submit">
          <button className="button active buttonFilter" onClick={() => setAddEventShowModal(true)}>Create an Event</button>
        </div>
        {showAddEventModal && createPortal(
                <AddEventModal onAddFunction={onAddFunction} onClose={() => setAddEventShowModal(false)}/>,
                document.body
            )}
      </div>
      );
}