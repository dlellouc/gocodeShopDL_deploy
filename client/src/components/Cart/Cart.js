import React, { useContext } from 'react'
import CartContext from '../../contexts/CartContext';
import './Cart.css'

const Cart = () => {
    const { cart } = useContext(CartContext);

    let totalPrice = cart.length !== 0 ? cart.reduce((partialSum, item) => partialSum + item.price * item.amount, 0) : 0;

  return (
    <div className='cart'>
        <h2>My cart</h2>
        <ul>
            {cart.map((item) => 
            <li key={item.id}>
              <img src={item.imgSrc} />
              {item.id} - {item.title} - {item.amount} - {item.price * item.amount} $</li>)}
        </ul>
        <h2>Total: {totalPrice} $</h2>
    </div>
  )
}

export default Cart