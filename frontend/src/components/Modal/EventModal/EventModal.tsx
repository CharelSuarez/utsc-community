import '../Modal.css';
import { useRef } from "react";
import Modal from "@/components/Modal/Modal";
import { MouseEventHandler } from "react";
import { login } from "@/api/auth";

interface EventModalProps {
    onClose: () => void;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    _id: string;
}


export default function EventModal({onClose, title, description, location, startDate, endDate, _id }: EventModalProps){
    return (        
    <>
        <div className="modalEvent">
            <div className="innerbox">
                <h1>{title}</h1>
                <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
                <button>Attend Event</button>
            </div>
            <div className="content">
                <label>Event Description:
                    <div className="description">{description}</div>
                </label>
                <div className="eventdetails">
                    <div className="location">{location}</div>
                    <div className="date">{startDate}</div>
                </div>
            </div>
        </div>
    </>
    );
}
