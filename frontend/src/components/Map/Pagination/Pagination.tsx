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
        <button onClick={() => changePageNumber(- 1)}></button>
        <button onClick={() => changePageNumber(1)}></button>
      </div>
      );
}