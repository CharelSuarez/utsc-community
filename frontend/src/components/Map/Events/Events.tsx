"use client";
import "./Events.css";
import Event from "@/components/Map/Event/Event" 
import { useEffect, useState } from "react"
import { getEvents } from "@/api/event"

interface EventProps {
  name: string;
  description: string;
  location: string;
  date: string;
}

export default function Events(){
  const [event, setEvent] = useState<EventProps[]>([]);

  useEffect(() =>{
    getEvents(0).then((events)=>{
      setEvent(events.events)
    })
  }, []);
    return (
      <div className="eventBox">
        {(  
            event.map((event) => <Event title={event.name} description={event.description} location={event.location} date={event.date}/>)
        )}
      </div>
    );
}