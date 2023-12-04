import './AddEventModal.css';
import Modal from "@/components/Modal/Modal";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import Time from "@/components/Map/Time/Time";
import { useRef, useState } from "react";
import { addEvent } from "@/api/event"
import {getUsername} from "@/api/auth";

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
        event.preventDefault();

        if (!titleRef.current || !descriptionRef.current) {
            return;
        }

        const title = titleRef.current.value == null ? '' : titleRef.current.value;
        const description = descriptionRef.current.value == null ? '' : descriptionRef.current.value;
        const start = new Date(startDate.concat("T".concat(startTime).concat(":00.000Z")));
        const end = new Date(endDate.concat("T".concat(endTime).concat(":00.000Z")));

        if(!title || !description || !startDate || !endDate || !startTime || !endTime || !location)
            return;

        
        if(start.toISOString() > end.toISOString())
            return;
        
        var createdBy = getUsername();
        if(!createdBy){
            createdBy = "";
        }
        addEvent(title, description, start, end, location, createdBy).then((result) => {
            
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
            <div className="contentAdd">
                <label>Event Title:
                    <input className="titleAdd" ref={titleRef} type='text'></input>
                </label>
                <label>Event Description:
                    <input className="descriptionAdd" ref={descriptionRef} type='text'></input>
                </label>
                <div className="eventdetails">
                    <div className='dateTime'>
                        <Calendar getDate={setStartDate} reset={false} setReset={()=>{}} label="Start Date"></Calendar>
                        <Calendar getDate={setEndDate} reset={false} setReset={()=>{}} label="End Date"></Calendar>
                    </div>
                    <div className='dateTime'>
                        <Time getTime={setStartTime} label="Start Time"></Time>
                        <Time getTime={setEndTime} label="End Time"></Time>
                    </div>
                    <div className="locationAdd">
                        <Location getLocation={setLocation} reset={false} setReset={()=>{}}></Location>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button active red" onClick={onClose}>Cancel</button>
                    <button className="button active" onClick={onClickCreate}>Create</button>
                </div>
            </div>
        </>
    )
}

export default function AddEventModal({onClose, onAddFunction}: EventModalProps){
    return (        
        <Modal children={getModalChildren({onClose, onAddFunction})} onClose={onClose} type="modalEvent"/>
    );
}
