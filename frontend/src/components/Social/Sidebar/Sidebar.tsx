import { useState } from "react";
import Tab from "../Tab/Tab";
import "./Sidebar.css"


export default function Sidebar(){
    const [active, setActive] = useState<string>("Messages");

    return (<>
        <div className="sidebar">
            <div className="title">UTSC</div>
            <div className="tabs">
                <div className="social-holder">
                    <div className="title">Social</div>
                    <div className="tab-holder">
                        <Tab label="Messages" image="/message.png" active={active} update={setActive} />
                        <Tab label="Friends" image="/friends.png" active={active} update={setActive} />
                    </div>
                </div>
                <div className="navi">
                    <div className="title">Navigation</div>
                    <div className="tab-holder">
                        <Tab label="Dashboard" image="/dashboard.png" active={active} update={setActive} />
                        <Tab label="Events" image="/event.png" active={active} update={setActive} />
                        <Tab label="Map" image="/map.png" active={active} update={setActive} />
                    </div>
                </div>
            </div>
            <div className="sign">
                <Tab label="Sign Out" image="/exit.png" active={active} update={setActive} />
            </div>
        </div>

    
    </>)
}