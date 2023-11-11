import Link from 'next/link'
import './Taskbar.css'

export default function Taskbar(){
    return (
        <div className='taskbar'>
            <h1 className='title'>joe's website</h1>
            <div className="links">
                <Link href="/dashboard">
                    <button>Dashboard</button>
                </Link>
                <Link href="/map">
                    <button>Map</button>
                </Link>
                <Link href="/social">
                    <button>Social</button>
                </Link>
            </div>
        </div>
    )
}