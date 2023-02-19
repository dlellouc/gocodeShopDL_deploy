import React from 'react'
import './Product.css'
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import { Button, Card } from '@mui/material';

const Product = ({productId, productTitle, productImgSrc, productPrice}) => {
    const { addToCart, removeFromCart, getAmountInCart } = useContext(CartContext);
    const productAmountInCart = getAmountInCart(productId);

    return (
        <Card className='product-card' variant='outlined'>
        {/* <div className='product-card'> */}
            <div className='product-image'>
                <Link to={"/products/" + productId}>
                    <img src={productImgSrc} />
                </Link>
            </div>
            <div className='product-info'>
                <h5 className='product-title'>{productTitle}</h5>
                <h6 className='product-price'>{productPrice} $</h6>
                <div style={{display:'inline-flex'}}>
                    <Button onClick={() => removeFromCart(productId)} disabled={productAmountInCart === 0}>-</Button>
                    <h5 style={{padding:'5px'}}>{productAmountInCart}</h5>
                    <Button onClick={() => addToCart(productId, productTitle, productPrice, productImgSrc)}>+</Button>
                </div>
            </div>
        {/* </div> */}
        </Card>
    )
}

export default Product