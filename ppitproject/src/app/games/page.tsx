'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { AverageRating } from '../components/AverageRating';
import { GameList } from '../components/GameList';

export default function Games() {
    const [games, setGames] = useState<any>([]);
    useEffect(() => {

        (async () => {
            const response = await axios.get('/api/games')
            setGames(response.data);
        })();
    }, []);

    async function onClickAddToCart(gameId) {

        const { data } = await axios.post('/api/cart', { gameId });
        if (data.error) {
            alert(data.error);
        }
    }

    return <GameList games={games}  onClickAddToCart={onClickAddToCart} />



}