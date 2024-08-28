'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { AverageRating } from '../../../components/AverageRating';
import { GameList } from '../../../components/GameList';

export default function Page({ params }) {
    const [games, setGames] = useState<any>([]);
    useEffect(() => {

        (async () => {
            const response = await axios.get(`/api/games/category/${params.categoryName}`)
            setGames(response.data);
        })();
    }, []);


    return <>
        <h1 className='page-title'>{params.categoryName}</h1>
        <GameList games={games} />
    </>

}