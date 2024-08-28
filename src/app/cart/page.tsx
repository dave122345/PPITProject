'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { Prev } from 'react-bootstrap/esm/PageItem';

export default function Games() {
   const [games, setGames] = useState<any>([]);
   useEffect(() => {

        (async () => {
            const response = await axios.get('http://localhost:3001/api/cart')
            setGames(response.data);
        })();
   }, []);


   async function onClickRemoveFromCart(gameId) {
    setGames(prev => prev.filter((game) => game.id !== gameId))
    await axios.delete(`/api/cart/${gameId}`)
   }
   
   return  <div>
  
   <div className="page-title">
        <h1>Cart</h1>
    </div>
    {games.error &&  <div className='error'>
        <span>{games.error}</span>
    </div>}
     {!!cartGames.data?.length && <div className='cart-items'>

        {games.map((game) => {

            return <div className='card'>
                <div className='cart-game-title'>{game.title}</div>
                <div className='cart-game-price'>€{game.price}</div>
        })}

    
        {/* <div className='card'></div>
        <div className='card'></div>
        <div className='card'></div> */}
       
    </div>}
</div>
}