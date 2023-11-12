import { useRef } from "react";
import "./Form.css"

interface FormProps{
    getFriend: (username: string) => Promise<void>;
}

export default function Form({ getFriend }: FormProps){
    
    const userRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username =  userRef.current?.value == undefined ? "" : userRef.current?.value;
        
        getFriend(username).then(function(){
            return console.log("ur mom")
        })
        
    }

    return(
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="title-form">Search User</div>
            <input type="text" 
            placeholder="Enter User"
            required
            ref={userRef}
            />
            <button type="submit">Submit</button>
        </form>

    )
}