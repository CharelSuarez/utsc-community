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
  const [reset, setReset] = useState(false);

  const getFilters = () =>{
    setStartDate(startDate);
    setEndDate(endDate);
    setLocation(location);
  }

  const resetEvents = () => {
    setReset(true);
    setStartDate("");
    setEndDate("");
    setLocation("");
  }

    return (
      <div className="filterAndAdd">
        <div className="filters">
          <Calendar getDate={setStartDateFilter} reset={reset} setReset={setReset} colour="white" label="Start Date"></Calendar>
          <Calendar getDate={setEndDateFilter} reset={reset} setReset={setReset}  colour="white" label="End Date"></Calendar>
          <Location getLocation={setLocationFilter} reset={reset} setReset={setReset} colour="white"></Location>
        </div>
        <div className="submit">
          <button className="button active buttonFilter" onClick={resetEvents}>Reset Filters</button>
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