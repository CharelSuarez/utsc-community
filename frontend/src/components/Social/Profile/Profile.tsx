import "./Profile.css"

interface ProfileProps{
    name: string
    addGroup: (username: string) => void
    update: (username: string) => void
}

export default function Profile({name, addGroup, update}: ProfileProps){

    return (
        <>
            <div className="container-profile" onClick={function(){ addGroup(name); update(name)}}>
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}