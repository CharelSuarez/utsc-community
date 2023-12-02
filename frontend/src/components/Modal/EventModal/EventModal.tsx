import './EventModal.css';
import Modal from "@/components/Modal/Modal";

interface EventModalProps {
    onClose: () => void;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    _id: string;
}

function getModalChildren({onClose, title, description, location, startDate, endDate, createdBy, _id }: EventModalProps) {
    console.log(startDate);
    console.log(endDate);
return (
    <>
        <div className="title">
            <h1>{title}</h1>
            <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
            <button>Attend Event</button>
        </div>
        <div className="content">
            <label>Hosted By:
                <div className="host">{createdBy}</div>
            </label>
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

export default function EventModal({onClose, title, description, location, startDate, endDate, createdBy, _id }: EventModalProps){
    return (        
        <Modal children={getModalChildren({onClose, title, description, location, startDate, endDate, createdBy, _id })} onClose={onClose} type="modalEvent"/>
    );
}
