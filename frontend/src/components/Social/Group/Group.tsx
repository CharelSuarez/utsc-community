import { useEffect, useState } from "react"
import "./Group.css"
import { addGroup, getAllGroup, getFriends } from "@/api/social";
import GroupTabs from "../Profile/GroupTabs";
import Profile from "../Profile/Profile";

interface GroupProps {
    users: string[]
    _id: string
}

export default function Group() {
    const [group, setGroup] = useState<GroupProps[]>([])
    const [friends, setFriends] = useState<string[]>([])
    const [create, addCreate] = useState<string[]>([])

    useEffect(() => {
        getAllGroup().then((doc) => setGroup(doc.group))
        getFriends().then((doc) => setFriends(doc.chat));
    }, []);

    let key = 0;

    return (
        <>
            <div className="section">
                <div className="subsection">
                    <div className="title">Your Groups</div>
                    <div className="container">
                        {group.map((item) => <GroupTabs name={item.users.join(',')} key={item._id} addCurrent={() => null} update={() => null} id={item._id} />)}
                    </div>
                </div>

                <div className="subsection">
                    <div className="title">Your Friends</div>
                    <div className="container">
                        {(create.length != 0) ?
                            <button className="add" onClick={function () {
                                if (create.length == 0) return;
                                addGroup(create).then(function (doc) {
                                    setGroup([...group, doc])
                                    addCreate([]);
                                });
                            }}><img src="/icons/add.png" /></button> :
                            (friends.length != 0) ? <div className="empty">Click to Add Friends</div> :
                                <div className="empty">Add Friends</div>}

                        <div className="users">
                            {create.map((user) => <Profile name={user} key={key++} update={()=> null} addGroup={() => null} />)}
                        </div>
                    </div>
                    <div className="friend-container">
                        {friends.map((friend) => <Profile name={friend} key={key++} update={()=> null} addGroup={(user) => addCreate([...create, user])} />)}
                    </div>
                </div>
            </div>
        </>
    )
}