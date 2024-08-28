"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { LogoutButton } from "./LogoutButton"
import { usePathname } from 'next/navigation'
import {  FaCartShopping, FaUser  } from "react-icons/fa6";
import { fetcher } from "../fetcher"
import useSWR from 'swr'

function NavLink({href, children}) {
    const pathname = usePathname()
    const active = pathname == href ? 'active' : ''
    return <Link href={href} className={active}>{children}</Link>
}
export function Navbar() {
    const user = useSWR('/api/user', fetcher)
    const cartItems = useSWR('/api/cart', fetcher)

    const cartItemCount = cartItems.data?.length || 0

    return <div id='navbar'>
      
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/games'>Games</NavLink>
            <NavLink href='/games/category/action'>Action</NavLink>
            <NavLink href='/games/category/rpg'>RPG</NavLink>
            <NavLink href='/games/category/simulation'>Simulation</NavLink>
            <NavLink href='/games/category/survival'>Survival</NavLink>
            <NavLink href='/games/category/sports'>Sports</NavLink>
            <NavLink href='/games/category/fantasy'>Fantasy</NavLink>
       
     
         <div className='user-actions'>
            { !user.data &&   <NavLink href='/login'>Log-in</NavLink>}
            { !user.data &&  <NavLink href='/signup'>Sign Up</NavLink>}
            { user.data && <a className="username"><FaUser className="user-icon" />{user.data?.username}</a> }
            { user.data &&  <NavLink href='/cart'>Cart<span className='normal'>&nbsp; [{cartItemCount}]</span> <FaCartShopping className='cart-icon'/></NavLink>} 
            { user.data &&  <LogoutButton />}
        </div>
    </div> 
    
    
    

}