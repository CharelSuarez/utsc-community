import "./button.css"

interface ButtonProp{
    label: string
}


export default function Button({label}: ButtonProp){
    return(
        <>
            <div className="button">
                <div className="image">
                </div>
                <div className="label">{label}</div>
            </div>
        </>
    )
}