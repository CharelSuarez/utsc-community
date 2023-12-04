import { useEffect, useRef, useState } from "react"
import "./Group.css"
import { addGroup, getAllGroup, getFriends } from "@/api/social";
import GroupTabs from "../Profile/GroupTabs";
import Profile from "../Profile/Profile";

interface GroupProps {
    users: string[]
    _id: string
    name: string
}

export default function Group() {
    const [loaded, setLoad] = useState<boolean>(false);

    const [group, setGroup] = useState<GroupProps[]>([])
    const [friends, setFriends] = useState<string[]>([])
    const [create, addCreate] = useState<string[]>([])
    const [groupName, updateName] = useState<string>("Group")

    function handle(event: React.ChangeEvent<HTMLInputElement>) {
        updateName(event.target.value);
    }

    useEffect(() => {
        getAllGroup().then((doc) => setGroup(doc.group));
        getFriends().then((doc) => setFriends(doc.chat));
        setLoad(true);
    }, []);

    function remove(user: string) {
        addCreate(create.filter((val) => val != user));
        setFriends([...friends, user]);
    }

    function add(user: string) {
        if (create.includes(user)) return;

        setFriends(friends.filter((val) => val != user));
        addCreate([...create, user]);

    }

    let key = 0;

    return (
        <>
            {!loaded ? <div></div> :
                (friends.length == 0 && create.length == 0) ? <div className="empty">
                    <div className="container">
                        <div className="caption">Dont be shy Make some <span className="highlight">Friends!</span></div>
                        <img src="/empty/kitty.png" alt="" />
                    </div>

                </div> :
                    <div className="section">
                        <div className="subsection">
                            <div className="title">Your Groups</div>
                            <div className="container">
                                {group.map((item) => <GroupTabs name={item.name} key={item._id} addCurrent={() => null} update={() => null} id={item._id} />)}
                            </div>
                        </div>

                        <div className="subsection">
                            <div className="title">Your Friends</div>

                            {(create.length != 0) ?
                                <div className="container">
                                    <input type="text" onChange={handle} />
                                    {groupName}
                                    <button className="add" onClick={function () {
                                        if (create.length == 0) return;
                                        addGroup(create, groupName).then(function (doc) {
                                            setGroup([...group, doc])
                                            addCreate([]);
                                            getFriends().then((doc) => setFriends(doc.chat));
                                            updateName("Group");
                                        });
                                    }}><img src="/icons/add.png" /></button>
                                </div>
                                :
                                <div className="container">
                                    {(friends.length != 0) ? <div className="empty-text">Click to Add Friends</div> :
                                        <div className="empty-text">Add Friends</div>}
                                </div>
                            }

                            <div className="users">
                                {create.map((user) => <Profile name={user} key={key++} update={() => null} addGroup={remove} />)}
                            </div>

                            <div className="friend-container">
                                {friends.map((friend) => <Profile name={friend} key={key++} update={() => null} addGroup={add} />)}
                            </div>
                        </div>
                    </div>}


        </>)
}