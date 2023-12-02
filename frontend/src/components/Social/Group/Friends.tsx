import { useEffect, useState } from "react"
import "./Group.css"
import { addFriend, getAllUsers, getFriends, getRequest , addRequest} from "@/api/social";
import Profile from "../Profile/Profile";

interface Request{
    user: string
    reqType: string
}

export default function Friends() {

    const [myFriends, setFriends] = useState<string[]>([])
    const [sent, setSent] = useState<string[]>([])
    const [recieved, setRecieved] = useState<string[]>([])
    const [toAdd, setToAdd] = useState<string[]>([])

    let key = 0;


    useEffect(() => {


        getRequest().then(function(doc){
            getAllUsers().then(function (friends) {

                const filterSent = doc.requests.filter((value: Request) => value.reqType == "sent").map((req: Request) => req.user);
                const filterRecieved = doc.requests.filter((value: Request) => value.reqType == "recieved").map((req: Request) => req.user);
    
                setSent(filterSent);
                setRecieved(filterRecieved);

                getFriends().then(function(doc){
                    setFriends(doc.chat);
                    const filteredArray = friends.friends.filter((value: string) => !filterRecieved.includes(value) && !filterSent.includes(value) && !doc.chat.includes(value));
                    setToAdd(filteredArray)
                });
            });
        })
    }, []);


    useEffect(() => {
        const filterSent = sent.filter((user) => !myFriends.includes(user))
        const filterRecieved = recieved.filter((user) => !myFriends.includes(user))

        setRecieved(filterRecieved);
        setSent(filterSent);

    }, [myFriends.length]);


    useEffect(() => {
        const filteredArray = toAdd.filter((user) => !sent.includes(user) && !myFriends.includes(user))
        setToAdd(filteredArray);

    }, [sent.length, myFriends.length])

    return (<>
        <div className="section">
            <div className="subsection">
                <div className="title">Your Friends</div>
                <div className="container">
                    {myFriends.map((friend) => <Profile key={key++} name={friend} update={addFriend} addGroup={() => null} />)}
                </div>
            </div>

            <div className="subsection">
                <div className="title">Pending Friend Requests</div>
                <div className="container">
                    <div className="sent">
                        <div className="title">Sent</div>
                        {sent.map((user) => <Profile key={key++} name={user} update={() => null} addGroup={()=>null}/>)}
                    </div>
                    <div className="recieved">
                        <div className="title">Recieved</div>
                        {recieved.map((user) => <Profile key={key++} name={user} update={addFriend} addGroup={(user: string) => setFriends([...myFriends, user])}/>)}
                    </div>
                </div>
            </div>



            <div className="subsection">
                <div className="title">Add Friends</div>

                {(toAdd.length == 0) ?
                    <div className="friend-container">
                        Your Friends with everyone!
                    </div> :
                    <div className="friend-container">
                        {toAdd.map((friend) => <Profile key={key++} name={friend} update={addRequest} addGroup={(user) => setSent([...sent, user])} />)}
                    </div>}
            </div>
        </div>
    </>)
}