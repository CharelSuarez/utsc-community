import "./Tab.css"

interface TabProps{
    label: string
    image: string
    active: string
    type: string
    update: (active: string) => void

}


export default function Tab({label, image, active, type, update}: TabProps){

    let style = label == active ? type+" active" : type

    return(
        <>
            <button className={style} onClick={() => update(label)}>
                <img src={image} alt=""/>
                {label}
            </button>
        </>
    )
}