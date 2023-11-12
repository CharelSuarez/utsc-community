import "./Calendar.css";
import "@/components/Map/FilterEvent/Filter.css";
interface CalendarProps {
    label: string;
}

export default function Calendar({label} : CalendarProps){
    return (
        <div className="oneFilter">
            <label>{label}:</label>
            <input type="date"></input>
        </div>
      );
}