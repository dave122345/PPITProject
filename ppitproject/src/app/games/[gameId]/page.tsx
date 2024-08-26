'use client'
import { AverageRating } from '@/app/components/AverageRating';
import { Reviews } from '@/app/components/Reviews';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";



export default function Page({ params }) {
  const [game, setGames] = useState<any>([]);
  useEffect(() => {

    (async () => {
      const response = await axios.get('/api/games/' + params.gameId)
      setGames(response.data);
    })();
  }, []);
  async function onChangeRating(rating) {
    const response = await axios.post('/api/ratings/' + params.gameId, {
      rating
    })
  }

  if (!game.rating) {
    return <div>Loading...</div>
  }
  return <div id='game-page'>
    <div id='game-title'>{game.title}</div>
    <div className='row'>
      <div id='left'>
        <img src={`/images/${game.image}`} />
      </div>
      <div id='left'>
        <div id='game-description'>{game.description}</div>
        <div id='game-price'>€{game.price}</div>
      </div>
    </div>

    <Reviews gameId={params.gameId} />
    {/* average rating */}
    <p>Game overall rating</p>
    <AverageRating gameId={params.gameId} />

    {/* user rating */}
    <p>Your Rating</p>
    <ReactStars
      count={5}
      value={game.rating}
      onChange={onChangeRating}
      size={30}
      activeColor="#ffd700"
      isHalf={true}
    />


  </div>


}