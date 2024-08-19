'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';

export default function Games() {
   const [games, setGames] = useState<any>([]);
   useEffect(() => {

        (async () => {
            const response = await axios.get('http://localhost:3001/api/games')
            setGames(response.data);
        })();
   }, []);

   async function onClickAddToCart(gameId) {
    await axios.post('/api/cart', {gameId});
    
   }
   
   return  <div>
  
   <div className="title">
   
    <h1>Games</h1>
    </div>
     <div id='games'>
        {games.map((game) => {

            return <div className='thumbnail'>
             <span className='game-title'>{game.title}</span>
             <span className='game-description'>{game.short_description}</span>
             <button className='add-to-cart' onClick={() => onClickAddToCart(game.id)} >Add to cart</button>
             </div>
        })}

    
        {/* <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div> */}
       
    </div>
</div>



}