import { useEffect, useState } from "react"
import "./Account.css"
import { getUserId, getUsername } from "@/api/auth";

export default function Account() {
    const [username, setUsername] = useState<string>("Unknown");
    const [userId, setUserId] = useState<string>("Unknown");

    useEffect(() => {
        setUsername(getUsername() || "Unknown");
        setUserId(getUserId() || "Unknown");
    }, []);

    return (
    <>
        <div className="section">
            <div className="subsection">
                <div className="title">User Info</div>
                <div className="avatar-container">
                    <img className="avatar" src="/icons/user.png" alt="profile avatar"/>
                </div>
                <p>Username: {username}</p>
                <p>User ID: {userId}</p>

            </div>
        </div>
    </>
    )
}