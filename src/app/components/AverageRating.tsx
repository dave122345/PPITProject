'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";

export function AverageRating({ gameId }) {
    const [rating, setRating] = useState<any>();
    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/ratings/' + gameId)
            setRating(parseFloat(response.data.average_rating));
        })();
    }, []);

    if (!rating) {
        return ''
    }

    return <>
            <ReactStars
            count={5}
            value={rating}
            size={30}
            activeColor="#ffd700"
            isHalf={true}
            edit={false} />
    </>


}