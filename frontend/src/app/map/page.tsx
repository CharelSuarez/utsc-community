import Filter from "@/components/Map/FilterEvent/Filter";
import Events from "@/components/Map/Events/Events";
import Pagination from "@/components/Map/Pagination/Pagination";
import Create from "@/components/Map/CreateEvent/Create";

import "./Page.css"

export default function Page() {
    return (
        <div className="map">
            <div className="filterAndEvents">
                <Filter></Filter>
                <Events></Events>
                <Pagination></Pagination>   
            </div>
            <Create></Create>
        </div>
    );
  }