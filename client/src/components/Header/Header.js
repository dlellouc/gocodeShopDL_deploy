import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../contexts/CartContext';

// import Clock from './components/Clock/Clock';
import { useClock } from '../../hooks/useClock';

import Cart from '../Cart/Cart';

// import { Button, Drawer } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import './Header.css'
import UserContext from '../../contexts/UserContext';

export const Header = () => {
  const { isAdmin } = useContext(UserContext);
  const { cartOpen, setCartOpen } = useContext(CartContext);
  const [showCookies, setShowCookies] = useState(true);
  const clock = useClock();

  useEffect(
      () => console.log('showCookies', showCookies),
      [showCookies])
  

  return (
    <div className='header'>
      <div className='header-top'>
        <div className='header-links-div'>
          <Link to={"/"}>Home     </Link>
          <Link to={"about"}>About    </Link>
          {/* <Link to={"about/about2"}>About2    </Link>
          <Link to={"termsOfAgreement"}>Terms</Link> */}
          {isAdmin && <Link to={"admin/allProducts"}>ProductsTable    </Link>}
        </div>

        <div className='header-cart-button-div'>
          <Button onClick={() => setCartOpen(true)}>My Cart</Button>
          <Drawer anchor={"left"} open={cartOpen} onClose={() => setCartOpen(false)} PaperProps={{sx: {width: 500}}}>
            <Cart />
          </Drawer>
        </div>

        <div className='header-clock-div'>
          {/* <Clock /> */}
          <h1 style={{textAlign:'right'}}>{clock}</h1>
        </div>

      </div>
      
      <div className='cookies-div'>
        {showCookies 
          && <p>This app may use cookies to improve your experience. </p> }
      
        <button onClick={() => setShowCookies(!showCookies)}> 
          {showCookies && 'I have understood'} {!showCookies && 'Show cookies information'}
        </button>
      </div>

      <div>

      </div>

    </div>
  )
}
