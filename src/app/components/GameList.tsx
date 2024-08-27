import Link from "next/link";
import { AverageRating } from "./AverageRating";
import { FaCartPlus } from "react-icons/fa6";

 export function GameList ({games, onClickAddToCart}) {

  return (
    <div>
   
      <div id='games'>
        {games.map((game) => (
          <div className='game-card' key={game.id} >
            <Link href={`/games/${game.id}`}>
              <img src={`/images/${game.image}`} alt={game.title} />
              <div className='content'>
                  <span className='game-title'>{game.title}</span>
                  {/* <span className='game-description'>{game.short_description}</span> */}
                  <span className='game-price'>€{game.price}</span>
                  <AverageRating gameId={game.id} />
                  <button className='add-to-cart' onClick={() => onClickAddToCart(game.id)} >Add to cart <FaCartPlus /></button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}