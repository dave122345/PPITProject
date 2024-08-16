"use client"

import axios from "axios"

export function LogoutButton() { 
   
    function logout() {
        axios.post('/api/logout')
        window.location.href = '/'
    }
    return  <a href='#' onClick={logout}>Log-out</a>
}