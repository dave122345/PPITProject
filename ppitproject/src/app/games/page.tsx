'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';

export default function Games() {
   const [games, setGames] = useState<any>([]);
   useEffect(() => {

    (async () => {
        const response = await axios.get('http://localhost:3001/games')
        setGames(response.data);


    })();
   }, []);
   
   return  <div>
  
   <div className="title">
   
    <h1>Games</h1>
    </div>
     <div id='games'>
        {games.map((game) => {

            return <div className='thumbnail'>
             <span className='game-title'>{game.title}</span>
             <span className='game-description'>{game.short_description}</span>
             </div>
        })}

    
        {/* <div className='thumbnail'></div>
        <div className='thumbnail'></div>
        <div className='thumbnail'></div> */}
       
    </div>
</div>



}