import "./Profile.css"

interface ProfileProps{
    name: string
}

export default function Profile({name}: ProfileProps){

    console.log(name)

    return (
        <>
            <div className="container-profile">
                <div className="profile"></div>
                <div className="name">{name}</div>
            </div>  
        </>
    )
}