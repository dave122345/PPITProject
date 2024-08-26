'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ReviewItem({ review }) {
    return <div className='review'>
        <b>{review.username}</b>
        <p>{review.content}</p>
    </div>

}

export function Reviews({ gameId }) {
    const [reviews, setReviews] = useState<any>();
    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/reviews/' + gameId)
            setReviews(response.data);
        })();
    }, []);

    if (!reviews) {
        return 'no reviews for this game'
    }

    return <>
        <h2>Game Reviews: </h2>
        {reviews.map(review => (
            <ReviewItem review={review} />
        ))}
    </>
}