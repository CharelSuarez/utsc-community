import "./Location.css";
import "@/components/Map/FilterEvent/Filter.css";

export default function Location(){
    return (
        <div className="oneFilter">
        <label>Location:</label>
        <select name="locations" id="locations">
          <option value="SW">SW</option>
          <option value="MW">MW</option>
          <option value="IC">IC</option>
          <option value="AC">AC</option>
        </select>
      </div>
      );
}