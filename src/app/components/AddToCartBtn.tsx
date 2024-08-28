import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../fetcher";
import { FaCartPlus } from "react-icons/fa6";
import axios from "axios";

export function AddToCartBtn ({gameId}) {
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
      <button className='cart-action-button'
        onClick={onClick} 
        disabled={alreadyInCart}
      >
        Add to cart <FaCartPlus />
      </button>
    )
}