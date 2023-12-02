import "../Profile.css"

interface GroupProps{
    name: string
    update: (id: string) => void
    id: string
    addCurrent: (group: string[]) => void
}

export default function GroupTabs({name, addCurrent, update, id}: GroupProps){

    return (
        <>
            <div className="container-profile" onClick={function(){addCurrent(name.split(',')); update(id)}}>
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}