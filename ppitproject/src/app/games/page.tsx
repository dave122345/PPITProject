'use client'
import axios from 'axios';
import Link from 'next/link';
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
   
   const {data} = await axios.post('/api/cart', {gameId});
    if(data.error){
         alert(data.error);
   }
}
   return  <div>
  
   <div className="title">
   
    <h1>Games</h1>
    </div>
     <div id='games'>
        {games.map((game) => {

       return <div className='game-card' key={game.id} >
        <Link href={`/games/${game.id}`}>
            <img src={`/images/${game.image}`} alt={game.title} />
            <div className='content'>
                <span className='game-title'>{game.title}</span>
                {/* <span className='game-description'>{game.short_description}</span> */}
                <span className='game-price'>€{game.price}</span>
                <button className='add-to-cart' onClick={() => onClickAddToCart(game.id)} >Add to cart</button>
            </div>
            </Link> 
             </div>
        })}

    
        {/* <div className='card'></div>
        <div className='card'></div>
        <div className='card'></div> */}
       
    </div>
</div>



}