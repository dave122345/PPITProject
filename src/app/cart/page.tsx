'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Prev } from 'react-bootstrap/esm/PageItem';
import { FaRegTrashCan } from 'react-icons/fa6';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../fetcher';

export default function Games() {
    const { mutate } = useSWRConfig()
    const cartGames = useSWR('/api/cart', fetcher, { refreshInterval: 500 })
    const router = useRouter()

    async function onClickRemoveFromCart(gameId) {
        await axios.delete(`/api/cart/${gameId}`)
        mutate('/api/cart')
    }

    async function onCheckoutClick() {
        await axios.post(`/api/cart/checkout`)
        mutate('/api/cart')
        router.push('/cart/thank-you')
    }

    if (!cartGames.data) {
        return 'loading...'
    }

   return  <div id='cart'>
  
   <div className="page-title">
        <h1>Cart</h1>
    </div>
    {cartGames.data.error &&  <div className='error'>
        <span>{cartGames.error}</span>
    </div>}
     {!!cartGames.data?.length && <div className='cart-items'>

        {cartGames.data.map((game) => {
            return <div className='card'>
                <div className='cart-game-thumb'><img src={`/images/${game.image}`} /></div>
                <div className='cart-game-title'>{game.title}</div>
                <div className='cart-game-price'>€{game.price}</div>
                <button className='cart-action-button'
                    onClick={() => onClickRemoveFromCart(game.id)} >
                    <FaRegTrashCan />  &nbsp; Remove
                </button>
            </div>
        })}
        <div id='subtotal'>
            <div className='row'>
                <b>Total:&nbsp;</b>
                <div id='subtotal-price'>
                    €{cartGames.data.reduce((accumulator, current) => {
                        return accumulator + parseFloat(current.price)
                    }, 0).toFixed(2)}
                </div>
            </div>
            <div className='row'>
                <button className='checkout-btn' onClick={onCheckoutClick}>Checkout</button>
            </div>
        </div>
    </div>}
</div>
}