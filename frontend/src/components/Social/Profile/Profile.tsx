import "./Profile.css"

interface ProfileProps{
    name: string
    addGroup: (username: string) => void
}

export default function Profile({name, addGroup}: ProfileProps){

    return (
        <>
            <div className="container-profile" onClick={() => addGroup(name)}>
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}