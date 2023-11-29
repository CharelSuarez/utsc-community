import GroupTabs from "../../Profile/GroupTabs/GroupTabs";

interface GroupProps{
    groups: string[];
    addCurrent: (group: string[]) => void
}

export default function Group({groups, addCurrent} : GroupProps){

    return(<>

            <div className="container">
                <div className="text">Groups</div>
                {(  
                    groups.map((group) => <GroupTabs name={group} key={group} addCurrent = {addCurrent}/>)
                )}
            </div>

    </>)
}