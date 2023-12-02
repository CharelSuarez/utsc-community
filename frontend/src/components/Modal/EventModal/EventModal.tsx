import './EventModal.css';
import Modal from "@/components/Modal/Modal";
import { attendEvent, unattendEvent, cancelEvent } from "@/api/event";
import {getUsername, getUserId} from "@/api/auth";

interface EventModalProps {
    onClose: () => void;
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

function getModalChildren({onClose, title, description, location, startDate, endDate, createdBy, guests, _id, onAddFunction}: EventModalProps) {
    console.log(guests);

    var btnName:string = "Attend Event";
    const attendee = getUsername();
    if(attendee){
        if(getUsername() == createdBy){
            btnName = "Cancel Event";
        }
        else if(checkIfAttending(guests, attendee)){
            btnName = "Unattend Event"
        }
    }
    const eventOnClick = () => {
        if(attendee){
            if(btnName == "Attend Event"){
                attendEvent(attendee, _id);
                onAddFunction(true);
            }
            else if(btnName == "Unattend Event"){
                unattendEvent(attendee, _id);
                onAddFunction(true);
            }
            else if(btnName == "Cancel Event"){
                cancelEvent(_id);
                onAddFunction(true);
            }
            onClose();
        }
    };
    
return (
    <>
        <div className="title">
            <h1>{title}</h1>
            <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
            <button onClick={eventOnClick}>{btnName}</button>
        </div>
        <div className="content">
            <div className="hostAttendees">
                <label>Hosted By:
                    <div className="host">{createdBy}</div>
                </label>
                <label>Number of Attendants:
                    <div className="attendees">{guests.length}</div>
                </label>
            </div>
            <label>Event Description:
                <div className="description">{description}</div>
            </label>
            <div className="eventdetails">
                <label>Location:
                    <div className="Location">{location}</div>
                </label>
                <label>Date:
                    <div className="date">{new Date(startDate).toLocaleDateString()}{"-"}{new Date(endDate).toLocaleDateString()}</div>
                </label>
                <label>Time:
                    <div className="time">{new Date(startDate).toLocaleTimeString()}{"-"}{new Date(endDate).toLocaleTimeString()}</div>
                </label>
            </div>
        </div>
    </>
)
}

export default function EventModal({onClose, title, description, location, startDate, endDate, createdBy, guests, _id, onAddFunction}: EventModalProps){
    return (        
        <Modal children={getModalChildren({onClose, title, description, location, startDate, endDate, createdBy, guests, _id, onAddFunction})} onClose={onClose} type="modalEvent"/>
    );
}

function checkIfAttending(arr: String[], val: String) {
    return arr.some((arrVal) => val === arrVal);
  }