import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner';
import CartContext from '../contexts/CartContext';
import './SingleProductView.css'

import { BASE_URL } from '../const/config.js'

const SingleProductView = () => {
    const params = useParams();
    let productId = params.productId;
    const [item, setItem] = useState({});

    const { addToCart, removeFromCart, getAmountInCart } = useContext(CartContext);
    const productAmountInCart = getAmountInCart(productId);

    const getOneProduct = async (productId) => {
      try {
        // const response = await fetch('https://fakestoreapi.com/products/' + productId);  // before mongoose
        const response = await fetch(BASE_URL + '/api/products/getOneProduct/' + productId);
        const data = await response.json();
        setItem(data);

      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      // onload
      getOneProduct(productId);
    }, []);


    // function to get query from path
    const getQueryFromPath = (path) => {
      let query = {};
      let questionMarkIndex = path.indexOf('?');

      if (questionMarkIndex !== -1) {
        let queryString = path.slice(questionMarkIndex + 1);
        let queryArray = queryString.split('&');
        queryArray.forEach((element) => {
          let elementArray = element.split('=');
          query[elementArray[0]] = elementArray[1];
       })
      }

      return query;
    }

    let path = window.location.search;    // starts with '?'
    // let path = 'http://localhost:3000/about?a=5&b=7&c=8&abcdefghi=9578324878&user=youAreTheBestUserEver';
    // let path = '12345'
    let queryFromPath = getQueryFromPath(path);
    console.log('path : ', path, ', query : ', queryFromPath);

  return (
    <div>

      {Object.keys(item).length !== 0                 // after item has been loaded
        && 
        <div className='product-view'>
            <div className='product-view-image-div'>
                <img src={item.image} />
            </div>
            <div className='product-view-info'>
                <h5>{item.title}</h5>
                <h6>{item.price} $</h6>
                <p>{item.description}</p>
                <div style={{display:'inline-flex'}}>
                    <button onClick={() => removeFromCart(productId)} disabled={productAmountInCart === 0}>-</button>
                    <h5 style={{padding:'5px'}}>{productAmountInCart}</h5>
                    <button onClick={() => addToCart(productId, item.title, item.price, item.image)}>+</button>
                </div>
            </div>
        </div>}

      {Object.keys(item).length === 0                 // before item has been loaded
        && <Spinner />}   

    </div>
  )
}

export default SingleProductView