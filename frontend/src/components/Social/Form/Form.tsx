
import { useRef } from "react";

export default function Form(){
    
    const userRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = userRef.current?.value;

        console.log(user)
    }

    return(
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="title">Search User</div>
            <input type="text" 
            placeholder="Enter User"
            required
            ref={userRef}
            />
            <button type="submit">Submit</button>
        </form>

    )
}