import "./Event.css";
import EventModal from "@/components/Modal/EventModal/EventModal" 
import { useRef, useState } from "react";
import { createPortal } from 'react-dom';

interface EventProps {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    _id: string;
}
export default function Event({title, description, location, startDate, endDate, startTime, endTime, _id}:EventProps){

    const [showEventModal, setEventShowModal] = useState(false);

    return (
        <>
            <div className="box" onClick={() => setEventShowModal(true)}>
                <div className="innerbox">
                    <h1>{title}</h1>
                </div>
                <div className="content">
                    <div className="description">{description}</div>
                    <div className="eventdetails">
                        <div className="location">{location}
                            <span className="tooltiptext">Location</span>
                        </div>
                        <div className="date">{startDate}
                            <span className="tooltiptext">Date</span>
                        </div>
                    </div>
                </div>
            </div>
            {showEventModal && createPortal(
                <EventModal onClose={() => setEventShowModal(false)} title={title} description={description} 
                location={location} startDate={startDate} endDate={endDate} _id={_id} startTime={startTime} endTime={endTime}/>,
                document.body
            )}
            </>
      );
}
