import { useEffect, useState } from "react"
import "./Group.css"
import { addFriend, getAllUsers, getFriends } from "@/api/social";
import Profile from "../Profile/Profile";

export default function Friends() {

    const [myFriends, setFriends] = useState<string[]>([])
    const [toAdd, setToAdd] = useState<string[]>([])

    let key = 0;


    useEffect(() => {
        getFriends().then(function (doc) {
            setFriends(doc.chat);
            getAllUsers().then(function (friends) {
                const filteredArray = friends.friends.filter((value: string) => !doc.chat.includes(value));
                setToAdd(filteredArray)
            });
        });
    }, []);

    useEffect(() => {
        const filteredArray = toAdd.filter((value: string) => !myFriends.includes(value));
        setToAdd(filteredArray);
    }, [myFriends.length])

    return (<>
        <div className="section">
            <div className="subsection">
                <div className="title">Your Friends</div>
                <div className="container">
                    {myFriends.map((friend) => <Profile key={key++} name={friend} update={addFriend} addGroup={() => null} />)}
                </div>
            </div>

            <div className="subsection">
                <div className="title">Add Friends</div>

                {(toAdd.length == 0) ?
                    <div className="friend-container">
                        Your Friends with everyone!
                    </div> :
                    <div className="friend-container">
                        {toAdd.map((friend) => <Profile key={key++} name={friend} update={addFriend} addGroup={(user) => setFriends([...myFriends, user])} />)}
                    </div>}
            </div>
        </div>
    </>)
}