import "./Filter.css";
import Calendar from "@/components/Map/Calendar/Calendar";
import Location from "@/components/Map/Location/Location";

export default function Filter(){
    return (
        <div className="filters">
          <Calendar label="Start Date"></Calendar>
          <Calendar label="End Date"></Calendar>
          <Location></Location>
          <button></button>
        </div>
      
      );
}