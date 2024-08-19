"use client"
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
        <a href='/'>Home</a>
        <a href='/games'>Games</a>
        <a href='/cart'>Cart</a>
     
         <div className='username'>
            { !user &&   <a href='/login'>Log-in</a>}
            { !user &&  <a href='/signup'>Sign Up</a>}
            { user && <span>{user.username}</span> }
            { user &&  <LogoutButton />}
        </div>
    </div> 
    
    
    

}