import './AddEventModal.css';
import Modal from "@/components/Modal/Modal";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";
import Time from "@/components/Map/Time/Time";
import { useRef, useState } from "react";
import { addEvent } from "@/api/event"
import {getUserId} from "@/api/auth";

interface EventModalProps {
    onClose: () => void;
    onAddFunction: (state:boolean) => void;
}

function getModalChildren({onClose, onAddFunction}: EventModalProps) {

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
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
        
        addEvent(title, description, start, end, location).then((result) => {
            
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
                    <textarea maxlength="25" className="titleAdd" ref={titleRef} type='text'></textarea>
                </label>
                <label>Event Description:
                    <textarea className="descriptionAdd" ref={descriptionRef} ></textarea>
                </label>
                <div className="eventdetails">
                    <div className='dateTime'>
                        <Calendar getDate={setStartDate} reset={false} setReset={()=>{}} colour="black" label="Start Date"></Calendar>
                        <Calendar getDate={setEndDate} reset={false} setReset={()=>{}} colour="black" label="End Date"></Calendar>
                    </div>
                    <div className='dateTime'>
                        <Time getTime={setStartTime} label="Start Time" colour="black"></Time>
                        <Time getTime={setEndTime} label="End Time" colour="black"></Time>
                    </div>
                    <div className="locationAdd">
                        <Location getLocation={setLocation} reset={false} setReset={()=>{}} colour="black"></Location>
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
