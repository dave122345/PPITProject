"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { LogoutButton } from "./LogoutButton"

export function Navbar() {
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        async function fetchUser() {
            const {data} = await axios.get('/api/user')
            setUser(data)
        }
        fetchUser()
    }, [])

    return <div id='navbar'>
        <Link href='/'>Home</Link>
        <Link href='/games'>Games</Link>
        <Link href='/cart'>Cart</Link>
     
         <div className='username'>
            { !user &&   <Link href='/login'>Log-in</Link>}
            { !user &&  <Link href='/signup'>Sign Up</Link>}
            { user && <span>{user.username}</span> }
            { user &&  <LogoutButton />}
        </div>
    </div> 
    
    
    

}