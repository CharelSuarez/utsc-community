import "./container.css"
import Friend from "../Friends/Friends"


export default function Container(){
    return(
        <>
            <div className="friends container">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
        </>
    )
}