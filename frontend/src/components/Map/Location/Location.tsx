import "./Location.css";
import "@/components/Map/FilterEvent/Filter.css";
import { useRef, useEffect } from "react";

interface LocationsProps {
  getLocation: (date:string) => void;
  reset: boolean;
  setReset: (flag:boolean) => void;
}

export default function Location({getLocation, reset, setReset} : LocationsProps){
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
        <label>Location:</label>
        <select className="location"name="locations" id="locations" ref={locationRef} onInput={onInput}>
          <option value="NONE" disabled selected> - select option - </option>
          <option value="SW">SW</option>
          <option value="MW">MW</option>
          <option value="IC">IC</option>
          <option value="AC">AC</option>
        </select>
      </div>
      );
}