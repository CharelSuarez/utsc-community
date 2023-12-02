import { useRef } from "react";
import "./Form.css"

interface FormProps{
    addFriend: (username: string) => Promise<void>;
}

export default function Form({ addFriend }: FormProps){
    
    const userRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username =  userRef.current?.value == undefined ? "" : userRef.current?.value;
        
        addFriend(username).then(function(){
            return console.log("ur mom")
        })
        
    }

    return(
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" 
            placeholder="Add by Username"
            required
            ref={userRef}
            />
            <button type="submit">Add</button>
        </form>
    )
}