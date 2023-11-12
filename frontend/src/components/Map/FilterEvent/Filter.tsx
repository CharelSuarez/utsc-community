import "./Filter.css";
import Events from "@/components/Map/Events/Events";
export default function Filter(){
    return (
      <div className="filterBox">
        <div className="filters">

          <div className="oneFilter">
            <label>Start Date:</label>
            <input type="date"></input>
          </div>

          <div className="oneFilter">
            <label>End Date:</label>
            <input type="date"></input>
          </div>

          <div className="oneFilter">
            <label>Location:</label>
            <select name="locations" id="locations">
              <option value="SW">SW</option>
              <option value="MW">MW</option>
              <option value="IC">IC</option>
              <option value="AC">AC</option>
            </select>
          </div>

          <button></button>
          
        </div>
        <Events></Events>
      </div>
      
      );
}