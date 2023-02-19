import React from 'react'
import './Products.css'
import Product from '../Product/Product'
import {useContext} from 'react';
import ProductsContext from '../../contexts/ProductsContext';

const Products = () => {
  const { products } = useContext(ProductsContext);

  return (
    <section className='products'>
      {products.map((item) => 
        <Product key={item._id} productId={item._id} productTitle={item.title} productImgSrc={item.image} productPrice={item.price} />)}
    </section>
  )
}

export default Products