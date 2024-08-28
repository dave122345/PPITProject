import Link from "next/link";
import { AverageRating } from "./AverageRating";
import { FaCartPlus } from "react-icons/fa6";
import axios from 'axios'
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../fetcher";

function AddToCartBtn ({gameId}) {
    const cartItems = useSWR('/api/cart', fetcher)
    const alreadyInCart = cartItems?.data?.find?.(game => game.id == gameId)
    const {mutate} = useSWRConfig()

    async function onClick () {
      const { data } = await axios.post('/api/cart', { gameId });
      if (data.error) {
          alert(data.error);
      }
      mutate('/api/cart')
    }
    return (
      <button className='add-to-cart'
        onClick={onClick} 
        disabled={alreadyInCart}
      >
        Add to cart <FaCartPlus />
      </button>
    )
}

 export function GameList ({games}) {

  return (
    <div>
   
      <div id='games'>
        {games.map((game) => (
          <div className='game-card' key={game.id} >
            <Link href={`/games/${game.id}`}>
              <img src={`/images/${game.image}`} alt={game.title} />
            </Link>
              <div className='content'>
                  <span className='game-title'>{game.title}</span>
                  <span className='game-price'>€{game.price}</span>
                  <AverageRating gameId={game.id} />
                  <AddToCartBtn gameId={game.id} />
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}