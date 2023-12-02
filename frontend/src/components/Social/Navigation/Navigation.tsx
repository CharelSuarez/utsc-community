import "./navigation.css"

import Form from "../Form/Form"

import { useEffect, useState } from "react";
import { addFriend, addGroup, getAllGroup} from "@/api/social";
import Container from "../Container/Container";
import GroupTabs from "../Profile/GroupTabs";

interface NaviProps{
    current: (users: string[]) => void
    update: (id: string) => void
}

interface GroupProps{
    users: string[]
    _id: string
}


export default function Navigation({current, update}: NaviProps ){
    const [friend, setUsers] = useState<string[]>([]);
    const [group, setGroup] = useState<string[]>([]);
    const [list, setList] = useState<GroupProps[]>([]);

    useEffect(() => {
        getAllGroup().then(function(doc){
            setList(doc.group)
            if(doc.group.length != 0){
                current(doc.group[0].users);
                update(doc.group[0]._id);
            }
        });
    },[]);
    
    return(
        <>
            <div className="navigation-main">
                {/* <div className="search">
                    <Form addFriend = {(username: string) => addFriend(username).then((friends) => setUsers(friends.user))}/>
                </div> */}
                {/* <div className="group-add">
                    {group}
                    <button onClick={() => addGroup(group).then((doc) => { current(doc.users); setList([...list, doc]); update(doc._id) })}>Add Groups</button>
                </div> */}
                {/* <Container users={friend} addGroup={(user: string) => setGroup([...group, user])} /> */}

                {list.length == 0 ? <div>You have no group chats</div> :  
                list.map((group) => <GroupTabs name={group.users.join(',')} key={group._id} addCurrent = {current} update={update} id={group._id}/>)}
            </div>
        </>
    )
}