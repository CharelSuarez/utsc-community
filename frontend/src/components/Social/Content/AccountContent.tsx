import Account from "@/components/Account/Account"
import "./Content.css"

export default function AccountContent() {
    return (
        <>
            <div className="topbar">
                <div className="topbar-title">
                    Account Settings
                </div>
            </div>
            <div className="main-content">
                <Account />
            </div>
        </>
    )
}