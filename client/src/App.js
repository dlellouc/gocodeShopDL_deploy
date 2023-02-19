
import './App.css';
import Nav from './components/Nav/Nav';
import Products from './components/Products/Products';
import Spinner from './components/Spinner/Spinner'

// import {useState, useEffect, useContext} from 'react';
// import {productsArr} from './data/data'
// import { useFetchAll } from './hooks/useFetchAll';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsContext from './contexts/ProductsContext';


function App() {
  const { allProducts } = useContext(ProductsContext);

  const navigate = useNavigate();

  return (
      <div className="App">

        <Nav />
        {allProducts && <Products />}
        {allProducts.length === 0 && <Spinner />}

        <button onClick={() => {navigate("about")}}>go to about</button>

      </div>
  );

}

export default App;
