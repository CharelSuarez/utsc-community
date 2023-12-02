import './../EventModal/EventModal.css';
import Modal from "@/components/Modal/Modal";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import Time from "@/components/Map/Time/Time";
import { useRef, useState } from "react";
import { addEvent } from "@/api/event"

interface EventModalProps {
    onClose: () => void;
    onAddFunction: (state:boolean) => void;
}

function getModalChildren({onClose, onAddFunction}: EventModalProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");

    const onClickCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(startTime);
        event.preventDefault();

        if (!titleRef.current || !descriptionRef.current) {
            return;
        }

        const title = titleRef.current.value == null ? '' : titleRef.current.value;
        const description = descriptionRef.current.value == null ? '' : descriptionRef.current.value;

        if(!title || !description || !startDate || !endDate || !startTime || !endTime || !location){
            return;
        }

        addEvent(title, description, startDate.concat("T".concat(startTime).concat(":00.000Z")), endDate.concat("T".concat(endTime).concat(":00.000Z")), location, "ME").then((result) => {
            
            if(result != null){
                onClose();
                onAddFunction(true);
            }
        });
        
        titleRef.current.value = '';
        descriptionRef.current.value = '';
    };
    
    return (
        <>
            <img className='close-button' src='https://i.imgur.com/O3YBoxX.png' alt='close' onClick={onClose} />
            <div className="content">
                <label>Event Title:
                    <input ref={titleRef} type='text'></input>
                </label>
                <label>Event Description:
                    <input ref={descriptionRef} type='text'></input>
                </label>
                <div className="eventdetails">
                    <Calendar getDate={setStartDate} label="Start Date"></Calendar>
                    <Calendar getDate={setEndDate} label="End Date"></Calendar>
                    <Time getTime={setStartTime} label="Start Time"></Time>
                    <Time getTime={setEndTime} label="End Time"></Time>
                    <Location getLocation={setLocation}></Location>
                </div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onClickCreate}>Create</button>
            </div>
        </>
    )
}

export default function AddEventModal({onClose, onAddFunction}: EventModalProps){
    return (        
        <Modal children={getModalChildren({onClose, onAddFunction})} onClose={onClose} type="modalEvent"/>
    );
}
