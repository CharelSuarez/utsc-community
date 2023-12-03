import "./Pagination.css";

interface PaginationProps {
  pageNumber: number;
  setPageNumber: (pageNumber:number) => void;
}

export default function Pagination({pageNumber, setPageNumber}: PaginationProps){
  const changePageNumber = (increment:number) => {
    if(pageNumber == 0 && increment == -1){
      return;
    }
    setPageNumber(pageNumber + increment);
  }

    return (
      <div className="pageBox">
        <img src='/icons/prevEvents.png' alt='previous' onClick={() => changePageNumber(-1)} />
        <img src='/icons/nextEvents.png' alt='next' onClick={() => changePageNumber(1)} />
      </div>
      );
}