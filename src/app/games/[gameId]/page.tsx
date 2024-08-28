'use client'
import { AddToCartBtn } from '@/app/components/AddToCartBtn';
import { AverageRating } from '@/app/components/AverageRating';
import { ReviewForm } from '@/app/components/ReviewForm';
import { Reviews } from '@/app/components/Reviews';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function Page({ params }) {
  const [game, setGames] = useState<any>([]);
  useEffect(() => {

    (async () => {
      const response = await axios.get('/api/games/' + params.gameId)
      setGames(response.data);
    })();
  }, []);
 

  if (!game.id) {
    return <div>Loading...</div>
  }
  return <div id='game-page'>
    <div id='game-title'>{game.title}</div>
    <div className='row'>
      <div id='left'>
        <img src={`/images/${game.image}`} />
      </div>
      <div id='right'>
        <div id='game-description'>
          <b>Game Description:</b>
          <div>
            {game.description}
          </div>
        </div>
        <div id='game-page-buy-actions'>
          <div id='game-price'>€{game.price}</div>
          <AddToCartBtn gameId={params.gameId} />
        </div>

      </div>
    </div>

    <b>Game overall rating:</b>
    <AverageRating gameId={params.gameId} />

    <Reviews gameId={params.gameId} />
    <ReviewForm gameId={params.gameId} reviewSubmitted={() => ('')}/>


  </div>


}