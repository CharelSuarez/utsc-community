import "./Tab.css"

interface TabProps{
    label: string
    image: string
    active: string
    update: (active: string) => void

}


export default function Tab({label, image, active, update}: TabProps){

    let style = label == active ? "tab active" : "tab"

    return(
        <>
            <button className={style} onClick={() => update(label)}>
                <img src={image} alt=""/>
                {label}
            </button>
        </>
    )
}