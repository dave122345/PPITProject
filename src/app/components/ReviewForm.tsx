import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../fetcher'
import ReactStars from "react-rating-stars-component";


export function ReviewForm ({gameId, reviewSubmitted}) {
  const { mutate } = useSWRConfig()
  const reviews = useSWR(`/api/reviews/${gameId}`, fetcher)
  const ourUserName = useSWR('/api/user', fetcher)
  const game = useSWR(`/api/games/${gameId}`, fetcher)

  const ourReview = reviews.data?.find(review => review.username == ourUserName.data?.username)

  async function submitReview (event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData)
    await axios.post(`/api/reviews/${gameId}`, values)
    mutate(`/api/reviews/${gameId}`)
  }

  async function onChangeRating(rating) {
      const response = await axios.post('/api/ratings/' + gameId, {
        rating
      })
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
        // value={game.data.rating}
        onChange={onChangeRating}
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
    </div>
  )
}