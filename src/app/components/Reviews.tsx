'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher'
import ReactStars from "react-rating-stars-component";
import {format} from 'date-fns'



function ReviewItem({ review }) {
    return <div className='review'>
        <div className='row'>


        <b>{review.username} </b>
        <i className='date'>&nbsp;{format(review.created_at, 'dd MMM yyyy HH:mm' )}</i>
        <div className='stars'>
            <ReactStars
                className='stars'
                count={5}
                value={review.rating}
                size={30}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
            />
        </div>
        </div>
        <p>{review.content}</p>
    </div>

}

export function Reviews({ gameId }) {
    const reviews = useSWR(`/api/reviews/${gameId}`, fetcher)

    if (!reviews.data) {
        return 'no reviews for this game'
    }

    return <>
        <h2>Game Reviews: </h2>
        {reviews.data.map(review => (
            <ReviewItem review={review} />
        ))}
    </>
}