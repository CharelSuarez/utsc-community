import "./Location.css";
import "@/components/Map/FilterEvent/Filter.css";
import { useRef } from "react";

interface LocationsProps {
  getLocation: (date:string) => void;
}

export default function Location({getLocation} : LocationsProps){
  const locationRef = useRef<HTMLSelectElement>(null);

  const onInput = (event: React.InputHTMLAttributes<HTMLButtonElement>) => {
      if (!locationRef.current) {
          return;
      }

      const location = locationRef.current.value == null ? '' : locationRef.current.value;
      getLocation(location);
  }
    return (
        <div className="oneFilter">
        <label>Location:</label>
        <select name="locations" id="locations" ref={locationRef} onInput={onInput}>
          <option disabled selected> -- select an option -- </option>
          <option value="SW">SW</option>
          <option value="MW">MW</option>
          <option value="IC">IC</option>
          <option value="AC">AC</option>
        </select>
      </div>
      );
}