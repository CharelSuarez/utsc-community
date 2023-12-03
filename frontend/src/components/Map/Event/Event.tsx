import "./Event.css";
import EventModal from "@/components/Modal/EventModal/EventModal" 
import { useState } from "react";
import { createPortal } from 'react-dom';

interface EventProps {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    guests: string[];
    _id: string;
    onAddFunction: (state:boolean) => void;
}

export default function Event({title, description, location, startDate, endDate, createdBy, guests, _id, onAddFunction}:EventProps){

    const [showEventModal, setEventShowModal] = useState(false);

    return (
        <>
            <div className="box" >
                <div className="innerbox" onClick={() => setEventShowModal(true)}>
                    <h1>{title}</h1>
                </div>
                <div className="content">
                    <div className="description">{description}</div>
                    <div className="eventdetails">
                        <div className="location">{location}
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
