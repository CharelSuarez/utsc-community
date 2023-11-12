import "./Text.css"

export default function Text(){
    return(
        <form className="text">
            <input type="text" 
            placeholder="Write a message"
            required
            />
            <button type="submit">Send</button>
        </form>

    )
}