'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { useState } from "react"


export default function Signup() {
    const router = useRouter()

    const [response, setResponse] = useState<any>(null)


    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const values = Object.fromEntries(formData)
        console.log('form data sending to backend', values)
        const {data} = await axios.post('//localhost:3001/api/signup', values)
        setResponse(data)
        console.log(data)
        if (data.success) {
            router.push('/signup/thank-you')
        }
    }
    return <div id='signup'>
        {!response?.success && <p>{response?.message}</p> }

        <form onSubmit={onSubmit}>
            <label>Please enter a Email</label>
            <input type="text" name="email" placeholder="Email" />
            <label>Please enter a username</label>
            <input type="text"  name="username" placeholder="Username" />
            <label>Please enter a Password</label>
            <input type="password"  name="password" placeholder="Password" />
            <label>Please confirm the Password</label>
            <input type="password"  name="password_confirmation" placeholder="confirm Password" />
            <button>Sign Up</button>
        </form>

    </div>




}