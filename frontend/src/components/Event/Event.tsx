import "./Event.css";
interface EventProps {
    title: string;
    description: string;
    location: string;
    date: string;
}
export default function Event({title, description, location, date}:EventProps){
    return (
            <div className="box">
                <div className="innerbox">
                    <h1>{title}</h1>
                </div>
                <div className="content">
                    <div className="description">{description}</div>
                    <div className="eventdetails">
                        <div className="location">{location}
                            <span className="tooltiptext">Location</span>
                        </div>
                        <div className="date">{date}
                            <span className="tooltiptext">Date</span>
                        </div>
                    </div>
                </div>
            </div>
      );
}
