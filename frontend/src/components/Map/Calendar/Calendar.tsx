import "./Calendar.css";
import "@/components/Map/FilterEvent/Filter.css";
import { useEffect, useRef } from "react";

interface CalendarProps {
    label: string;
    getDate: (date:string) => void;
    reset: boolean;
    setReset: (flag:boolean) => void;
    colour: string;
}

export default function Calendar({label, getDate, reset, setReset, colour} : CalendarProps){
    const dateRef = useRef<HTMLInputElement>(null);

    const onInput = (event: React.InputHTMLAttributes<HTMLButtonElement>) => {
        if (!dateRef.current) {
            return;
        }

        const date = dateRef.current.value == null ? '' : dateRef.current.value;
        getDate(date);
    }

    useEffect(()=>{
        if(reset){
            if (dateRef.current) {
                dateRef.current.value = '';
            }
            setReset(false);
        }

    }, [reset]);

    return (
        <div className="oneFilter">
            <label className={colour}>{label}:</label>
            <input className="calendar" type="date" ref={dateRef} onInput={onInput}></input>
        </div>
      );
}