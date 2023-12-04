import "./Event.css";
import EventModal from "@/components/Modal/EventModal/EventModal" 
import { useState } from "react";
import { createPortal } from 'react-dom';
import { BUILDINGS } from "@/util/building/Building";

interface EventProps {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    guests: string[];
    _id: string;
    setCurrentEvent: (event: any) => void;
    onAddFunction: (state:boolean) => void;
}

export default function Event({title, description, location, startDate, endDate, createdBy, guests, _id, setCurrentEvent, onAddFunction}:EventProps){

    const [showEventModal, setEventShowModal] = useState(false);

    return (
        <>
            <div className="ebox">
                <div className="innerbox" onClick={() => {
                    setEventShowModal(true);
                    setCurrentEvent({_id, title, description, location, startDate, endDate, createdBy, guests});
                    console.log("Set event owo.")
                }}>
                    <h1>{title.substring(0, 10) + (title.length <= 10 ? "" : "...")}</h1>
                </div>
                <div className="eventContent">
                    <div className="description">{description.substring(0, 125) + (description.length <= 125 ? "" : "...")}</div>
                    <div className="eventdetails">
                        <div className="location">{(BUILDINGS[location]?.name || "").substring(0, 15) + (description.length <= 25 ? "" : "...")}
                            <span className="tooltiptext">Location</span>
                        </div>
                        <div className="date">{new Date(startDate).toLocaleDateString()}
                            <span className="tooltiptext">Date</span>
                        </div>
                    </div>
                </div>
            </div>
            {showEventModal && createPortal(
                <EventModal onClose={() => setEventShowModal(false)} title={title} description={description} 
                location={location} startDate={startDate} endDate={endDate} createdBy={createdBy} guests={guests} _id={_id} onAddFunction={onAddFunction}/>,
                document.body
            )}
            </>
      );
}
