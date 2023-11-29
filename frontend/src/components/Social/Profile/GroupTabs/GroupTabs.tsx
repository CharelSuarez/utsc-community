

interface GroupProps{
    name: string
    addCurrent: (group: string[]) => void
}

export default function GroupTabs({name, addCurrent}: GroupProps){

    return (
        <>
            <div className="container-profile" onClick={() => addCurrent(name.split(','))}>
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}