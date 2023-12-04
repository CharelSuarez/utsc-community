import "./Location.css";
import "@/components/Map/FilterEvent/Filter.css";
import { BUILDINGS } from "@/util/building/Building"; 
import { useRef, useEffect } from "react";

interface LocationsProps {
  getLocation: (date:string) => void;
  reset: boolean;
  setReset: (flag:boolean) => void;
  colour: string;
}

export default function Location({getLocation, reset, setReset, colour} : LocationsProps){
  const locationRef = useRef<HTMLSelectElement>(null);
  
  const onInput = (event: React.InputHTMLAttributes<HTMLButtonElement>) => {
      if (!locationRef.current) {
          return;
      }

      const location = locationRef.current.value == 'NONE' ? '' : locationRef.current.value;
      getLocation(location);
  }

  useEffect(()=>{
    if(reset){
        if (locationRef.current) {
          locationRef.current.value = 'NONE';
        }
        setReset(false);
    }

}, [reset]);
    return (
        <div className="oneFilter">
        <label className={colour}>Location:</label>
        <select className="location"name="locations" id="locations" ref={locationRef} onInput={onInput} defaultValue={"NONE"}>
          <option value="NONE" disabled> - select option - </option>
          {(  
            Object.entries(BUILDINGS).map(([key, value]) => <option value={key} key={key}>{value.name}</option>)
        )}
        </select>
      </div>
      );
}