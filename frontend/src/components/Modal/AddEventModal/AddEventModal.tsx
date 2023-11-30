import './../EventModal/EventModal.css';
import Modal from "@/components/Modal/Modal";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import Time from "@/components/Map/Time/Time";
import { useRef, useState } from "react";
import { addEvent } from "@/api/event"

interface EventModalProps {
    onClose: () => void;
}

function getModalChildren({onClose}: EventModalProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");

    const getStartDate = (date:string) => {
        setStartDate(date);
    }

    const getEndDate = (date:string) => {
        setEndDate(date);
    }

    const getStartTime = (time:string) => {
        setStartTime(time);
    }

    const getEndTime = (time:string) => {
        setEndTime(time);
    }

    const getLocation = (location:string) =>{
        setLocation(location)
    }

    const onClickCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!titleRef.current || !descriptionRef.current) {
            return;
        }

        const title = titleRef.current.value == null ? '' : titleRef.current.value;
        const description = descriptionRef.current.value == null ? '' : descriptionRef.current.value;
    
        console.log(title);
        console.log(description);
        console.log(startDate);
        console.log(endDate);
        console.log(startTime);
        console.log(endTime);
        console.log(location);

        if(!title || !description || !startDate || !endDate || !startTime || !endTime || !location){
            return;
        }

        addEvent(title, description, startDate, endDate, startTime, endTime, location, "ME");


        titleRef.current.value = '';
        descriptionRef.current.value = '';

        onClose();
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
                    <Calendar getDate={getStartDate} label="Start Date"></Calendar>
                    <Calendar getDate={getEndDate} label="End Date"></Calendar>
                    <Time getTime={getStartTime} label="Start Time"></Time>
                    <Time getTime={getEndTime} label="End Time"></Time>
                    <Location getLocation={getLocation}></Location>
                </div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onClickCreate}>Create</button>
            </div>
        </>
    )
}

export default function AddEventModal({onClose}: EventModalProps){
    return (        
        <Modal children={getModalChildren({onClose})} onClose={onClose} type="modalEvent"/>
    );
}
