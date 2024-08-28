import Link from 'next/link'
import React from 'react'

export default function Page () {
  return <div id='thank-you'>
      <div>
        Thank you for your purchase. Your games will be with you in 3 working days. 
      </div>
      <Link href='/' className='return-to-home'>Return to home</Link>
  </div>
}