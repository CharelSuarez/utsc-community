import "@/components/Map/FilterEvent/Filter.css";
import { useRef } from "react";

interface TimeProps {
    label: string;
    getTime: (date:string) => void;
}

export default function Time({label, getTime} : TimeProps){
    const timeRef = useRef<HTMLInputElement>(null);

    const onInput = (event: React.InputHTMLAttributes<HTMLButtonElement>) => {
        if (!timeRef.current) {
            return;
        }

        const time = timeRef.current.value == null ? '' : timeRef.current.value;
        getTime(time);
    }

    return (
        <div className="oneFilter">
            <label>{label}:</label>
            <input type="time" ref={timeRef} onInput={onInput}></input>
        </div>
      );
}