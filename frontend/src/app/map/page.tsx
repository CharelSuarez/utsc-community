import Filter from "@/components/Map/FilterEvent/Filter";
import Events from "@/components/Map/Events/Events";
import Pagination from "@/components/Map/Pagination/Pagination";

export default function Page() {
    return (
        <div>
            <Filter></Filter>
            <Events></Events>
            <Pagination></Pagination>
        </div>
        
    );
  }