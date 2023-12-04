import { useState, useEffect } from "react";
import Tab from "../Tab/Tab";
import "./Sidebar.css"
import Link from "next/link";
import { getUserId, getUsername, logout } from "@/api/auth";
import LoginModal from "@/components/Modal/LoginModal/LoginModal";
import { createPortal } from "react-dom";
import RegisterModal from "@/components/Modal/RegisterModal/RegisterModal";

interface Sidebar {
    update?: (active: string) => void
    active: string
}

export default function Sidebar({ update, active }: Sidebar) {
    if (update === undefined) {
        update = () => { }
    }


    const [username, setUsername] = useState<string>("")
    const [showLoginModal, setLoginShowModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const username = getUsername();
        if (username !== null) {
            setUsername(username)
        }

    }, [])



    return (<>
        {(username == "" || !username ) ?
            <div className="sidebar">
                <div className="main-title">UTSC</div>
                <div className="social-holder">

                    <div className="title">Join Now</div>
                    <div className="tab-holder">
                        <div className="button-container">
                            <button className="button join" onClick={(event) => setLoginShowModal(true)}>
                                <img src="/icons/Login.png" alt="" />
                                Login
                            </button>
                            {showLoginModal && createPortal(
                                <LoginModal onClose={() => setLoginShowModal(false)} />,
                                document.body
                            )}
                            <button className="button join" onClick={(event) => setShowRegisterModal(true)}>
                                <img src="/icons/Register.png" alt="" />
                                Register
                            </button>
                            {showRegisterModal && createPortal(
                                <RegisterModal onClose={() => setShowRegisterModal(false)} />,
                                document.body
                            )}

                        </div>

                    </div>

                </div>

                <div className="mascot">
                    <div className="message button">Hey, Let's Connect!</div>
                    <img src="/empty/monkey.png" alt=""/>
                </div>

            </div> :
            <div className="sidebar">
                <div className="main-title">UTSC</div>
                <div className="welcome-text">Welcome, {username}!</div>

                <div className="tabs">
                    <div className="social-holder">

                        <div className="title">Social</div>
                        <div className="tab-holder">
                            {(active == "Messages" || active == "Friends") ? (
                                <>
                                    <Tab label="Messages" image="/icons/message.png" active={active} update={update} type="tab" />
                                    <Tab label="Friends" image="/icons/friends.png" active={active} update={update} type="tab" />
                                </>
                            ) : (
                                <>
                                    <Link href="/social?tab=Messages">
                                        <Tab label="Messages" image="/icons/message.png" active={active} update={update} type="tab" />
                                    </Link>
                                    <Link href="/social?tab=Friends">
                                        <Tab label="Friends" image="/icons/friends.png" active={active} update={update} type="tab" />
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="navi">
                        <div className="title">Navigation</div>
                        <div className="tab-holder">
                            <Link href="/map">
                                <Tab label="Events" image="/icons/event.png" active={active} update={update} type="tab" />
                            </Link>
                            <Link href="/dashboard">
                                <Tab label="Map" image="/icons/map.png" active={active} update={update} type="tab" />
                            </Link>


                        </div>
                    </div>
                </div>
                <div className="sign">
                    {active == "Account" ? (
                        <>
                            <Tab label="Account" image="/icons/user.png" active={active} update={update} type="tab" />
                        </>
                    ) : (
                        <>
                            <Link href="/social?tab=Account">
                                <Tab label="Account" image="/icons/user.png" active={active} update={update} type="tab" />
                            </Link>
                        </>
                    )}
                    <Tab label="Sign Out" image="/icons/exit.png" active={active} update={() => {
                        logout().then(() => {
                            window.location.href = "/"
                        });
                    }} type="tab red" />
                </div>

            </div>}



    </>)



    {/* <div className="tabs">
                <div className="social-holder">

                    <div className="title">Social</div>
                    <div className="tab-holder">
                        { (active == "Messages" || active == "Friends") ? (
                            <>
                                <Tab label="Messages" image="/icons/message.png" active={active} update={update} type="tab"/>
                                <Tab label="Friends" image="/icons/friends.png" active={active} update={update} type="tab"/> 
                            </>
                        ) : (
                            <>
                                <Link href="/social?tab=Messages">
                                    <Tab label="Messages" image="/icons/message.png" active={active} update={update} type="tab"/>
                                </Link>
                                <Link href="/social?tab=Friends">
                                    <Tab label="Friends" image="/icons/friends.png" active={active} update={update} type="tab"/>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="navi">
                    <div className="title">Navigation</div>
                    <div className="tab-holder">
                        <Link href="/">
                            <Tab label="Dashboard" image="/icons/dashboard.png" active={active} update={update} type="tab"/>
                        </Link>
                        <Link href="/map">
                            <Tab label="Events" image="/icons/event.png" active={active} update={update} type="tab"/>
                        </Link>
                        <Link href="/dashboard">
                            <Tab label="Map" image="/icons/map.png" active={active} update={update} type="tab"/>
                        </Link>

        
                    </div>
                </div>
            </div>
            <div className="sign">
                { active == "Account" ? (
                    <>
                        <Tab label="Account" image="/icons/user.png" active={active} update={update} type="tab"/>
                    </>
                ) : (
                    <>
                        <Link href="/social?tab=Account">
                         <Tab label="Account" image="/icons/user.png" active={active} update={update} type="tab"/>
                        </Link>
                    </>
                )}
                <Tab label="Sign Out" image="/icons/exit.png" active={active} update={() => {
                    logout().then(() => {
                        window.location.href = "/"
                    });
                }} type="tab red"/>
            </div> */}

}