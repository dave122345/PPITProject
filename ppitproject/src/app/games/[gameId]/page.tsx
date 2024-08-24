'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Page({params}) {
  const [game, setGames] = useState<any>([]);
   useEffect(() => {

        (async () => {
            const response = await axios.get('/api/games/' + params.gameId)
            setGames(response.data);
        })();
   }, []);
  return <div id='game-page'>
    <p>title: {game.title}</p>
    <p>description: {game.description}</p>
    <p>price:€ {game.price}</p>
    <p>rating: {game.rating}</p>
    <img src={`/images/${game.image}`} />
  </div>

 
}