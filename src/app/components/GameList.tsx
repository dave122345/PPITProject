import Link from "next/link";
import { AverageRating } from "./AverageRating";
import { AddToCartBtn } from "./AddToCartBtn";

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