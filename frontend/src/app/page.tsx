import Link from 'next/link'

export default function Home() {
  return (  
    <>
      <div className="links">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/map">Map</Link>
        <Link href="/social">Social</Link>
      </div>
    </>
  )
}
