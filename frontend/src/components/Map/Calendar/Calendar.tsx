import "./Calendar.css";
import "@/components/Map/FilterEvent/Filter.css";
import { useRef } from "react";

interface CalendarProps {
    label: string;
    getDate: (date:string) => void;
}

export default function Calendar({label, getDate} : CalendarProps){
    const dateRef = useRef<HTMLInputElement>(null);

    const onInput = (event: React.InputHTMLAttributes<HTMLButtonElement>) => {
        if (!dateRef.current) {
            return;
        }

        const date = dateRef.current.value == null ? '' : dateRef.current.value;
        getDate(date);
    }

    return (
        <div className="oneFilter">
            <label>{label}:</label>
            <input type="date" ref={dateRef} onInput={onInput}></input>
        </div>
      );
}