import GroupTabs from "../Profile/GroupTabs/GroupTabs";
import "./container.css"

interface GroupProps{
    groups: string[];
    addCurrent: (group: string[]) => void
}

export default function Group({groups, addCurrent} : GroupProps){

    return(<>

            <div className="container">
                {groups.length == 0 ? <div>You have no group chats</div> :  groups.map((group) => <GroupTabs name={group} key={group} addCurrent = {addCurrent}/>)}
            </div>

    </>)
}