import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../fetcher'
import ReactStars from "react-rating-stars-component";
import Link from 'next/link';
import { useState } from 'react';


export function ReviewForm ({gameId, reviewSubmitted}) {
  const { mutate } = useSWRConfig()
  const reviews = useSWR(`/api/reviews/${gameId}`, fetcher)
  const ourUserName = useSWR('/api/user', fetcher)
  const game = useSWR(`/api/games/${gameId}`, fetcher)
  const [rating, setRating] = useState()

  const ourReview = reviews.data?.find(review => review.username == ourUserName.data?.username)

  async function submitReview (event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values: any = Object.fromEntries(formData)
    values.rating = rating
    await axios.post(`/api/reviews/${gameId}`, values)
    mutate(`/api/reviews/${gameId}`)
  }

  if (ourReview) {
    return ''
  }

  if (!game.data) {
    return ''
  }

  return (
    <div id='review-form'>
      <h2>Write a review:</h2>
      <ReactStars
        count={5}
        onChange={setRating}
        size={30}
        activeColor="#ffd700"
        isHalf={true}
      />
      <form onSubmit={submitReview}>
        <div>
        <textarea name='content'></textarea>

        </div>
        <input type='submit' value='submit'/>
      </form>
      
      {!ourUserName.data && 
        <div id='review-form-overlay'>
          <div className='inner'>
            Please&nbsp;<Link href='/login'>sign in</Link>
            &nbsp;to post a game review.
          </div>
        </div>
      }
  </div>
  )
}