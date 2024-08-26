"use client"

import axios from "axios"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Login() { 
    const router = useRouter()

    const [response, setResponse] = useState<any>(null)
   
   
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const values = Object.fromEntries(formData)
        console.log('form data sending to backend', values)
        const {data} = await axios.post('/api/login', values)
        setResponse(data)
        console.log(data)
        if (data.success) {
            
            window.location.href = '/'
        }
        


    }
    return <div id='login'>
        {response?.error && <p>{response?.error}</p> }

        <form onSubmit={onSubmit}>
           <label>username</label>
            <input type="text" name="username" placeholder="Username"/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Log in"/>
        </form>
   
    </div> 


    

}