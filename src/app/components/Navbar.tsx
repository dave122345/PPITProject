"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { LogoutButton } from "./LogoutButton"
import { usePathname } from 'next/navigation'
import {  FaCartShopping, FaUser  } from "react-icons/fa6";
function NavLink({href, children}) {
    const pathname = usePathname()
    const active = pathname == href ? 'active' : ''
    return <Link href={href} className={active}>{children}</Link>
}
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
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/games'>Games</NavLink>
        <NavLink href='/games/category/action'>Action</NavLink>
        <NavLink href='/games/category/rpg'>RPG</NavLink>
        <NavLink href='/games/category/simulation'>Simulation</NavLink>
        <NavLink href='/games/category/survival'>Survival</NavLink>
        <NavLink href='/games/category/sports'>Sports</NavLink>
        <NavLink href='/games/category/fantasy'>Fantasy</NavLink>
     
     
         <div className='username'>
            { !user &&   <NavLink href='/login'>Log-in</NavLink>}
            { !user &&  <NavLink href='/signup'>Sign Up</NavLink>}
            { user && <span><FaUser className="user-icon" />{user.username}</span> }
            { user &&  <NavLink href='/cart'>Cart <FaCartShopping /></NavLink>} 
            { user &&  <LogoutButton />}
        </div>
    </div> 
    
    
    

}