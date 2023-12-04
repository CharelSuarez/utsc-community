"use client";
import "./Events.css";
import Event from "@/components/Map/Event/Event" 
import { useEffect, useState } from "react"
import { getEvents } from "@/api/event"

interface EventProps {
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  guests: string[];
  _id: string;
}

interface PageProps{
  onAdd: boolean;
  onAddFunction: (state:boolean) => void;
  pageNumber: number;
  setPageNumber: (pageNumber:number) => void;
  startDateFilter: string;
  endDateFilter: string;
  locationFilter: string;
  setCurrentEvent: (event: any) => void;
}
export default function Events({onAdd, onAddFunction, pageNumber, setPageNumber, startDateFilter, 
    endDateFilter, locationFilter, setCurrentEvent}: PageProps){
  const [event, setEvent] = useState<EventProps[]>([]);
  useEffect(() =>{
    getEvents(pageNumber, startDateFilter, endDateFilter, locationFilter).then((events)=>{
      if(events.events.length == 0 && pageNumber > 0){
        setPageNumber(pageNumber - 1);
        return;
      }
      setEvent(events.events)
      onAddFunction(false);
    })
  }, [onAdd, pageNumber, startDateFilter, endDateFilter, locationFilter]);
    return (
      <div className="eventBox">
        {(  
            event.map((event) => 
              <Event key={event._id} title={event.name} description={event.description} location={event.location} 
                startDate={event.startDate} endDate={event.endDate} createdBy={event.createdBy} guests={event.guests} 
                _id={event._id} onAddFunction={onAddFunction} setCurrentEvent={setCurrentEvent}
              />
            )
        )}
      </div>
    );
}