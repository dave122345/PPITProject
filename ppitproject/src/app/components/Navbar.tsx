"use client"
import { useState, useEffect } from "react"
import axios from "axios"

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
        <a href='/login'>Log-in</a>
        <a href='https:/Games.com'>Cart</a>
        <a href='/signup'>Sign Up</a>
        
        {user && <div>
            <span>Logged in as: </span>
            <span>{user.username}</span>
        </div>}
    </div> 
    
    
    

}