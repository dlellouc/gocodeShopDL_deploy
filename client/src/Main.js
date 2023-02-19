
import {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';

// import MyContext from './MyContext';
import UserContext from './contexts/UserContext';
import ProductsContext from './contexts/ProductsContext';
import CartContext from './contexts/CartContext';

import { Header } from './components/Header/Header';
import RoutesAnonymous from './routes/RoutesAnonymous';
import RoutesAuthenticated from './routes/RoutesAuthenticated';

import { BASE_URL } from './const/config.js'


export const allProductsCategoryString = 'All products';

function Main() {
    // user context
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    
    // products context
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(allProductsCategoryString);
    const [priceObj, setPriceObj] = 
      useState({minPrice: undefined, chosenMinPrice:undefined, chosenMaxPrice:undefined, maxPrice:undefined});
    

    // cart context
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false)

  
    let productsCategoriesWithAll = [...new Set(allProducts.map((item) => item.category))]; // categories update after fetch
    productsCategoriesWithAll.unshift(allProductsCategoryString);  
  
    const getAllProducts = async () => {
      try {
        // const response = await fetch('https://fakestoreapi.com/products');   // before mongoose
        const response = await fetch(BASE_URL + '/api/products/getAllProducts');
        const data = await response.json();
        setAllProducts(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      // onload
      getAllProducts();
      // let allProductsData = useFetchAll('https://fakestoreapi.com/products');
      // setAllProducts(allProductsData);
      // setProducts(allProductsData);
    }, []);
  
    const onFilterChange = () => {
      if (currentCategory === allProductsCategoryString) {
        setProducts(allProducts);
      } else {
        setProducts(allProducts.filter((item) => item.category === currentCategory));
      }
    }
  
    useEffect(
      () => onFilterChange(),
      [currentCategory]);
  
    const addToCart = (productId, productTitle, productPrice, productImgSrc) => {
      let productIndexInCart = getProductIndexInCart(productId);
  
      if (productIndexInCart !== -1) {
        let productRowInCart = cart[productIndexInCart];
        let newAmount = productRowInCart.amount + 1;
        setCart([...cart.slice(0, productIndexInCart), 
          {...productRowInCart, amount: newAmount},
          ...cart.slice(productIndexInCart+1)]);
  
      } else {
        setCart([...cart, {id: productId, title: productTitle, price: productPrice, imgSrc: productImgSrc, amount: 1}]);
      }
    }
  
    const removeFromCart = (productId) => {
      let productIndexInCart = getProductIndexInCart(productId);
  
      if (productIndexInCart !== -1) {
        let productRowInCart = cart[productIndexInCart];
        let newAmount = productRowInCart.amount - 1;
  
        if (newAmount > 0) {
          setCart([...cart.slice(0, productIndexInCart), 
            {...productRowInCart, amount: newAmount},
            ...cart.slice(productIndexInCart+1)]);
        } else {
          setCart([...cart.slice(0, productIndexInCart),
            ...cart.slice(productIndexInCart+1)]);
        }
     }
    }
  
    const getAmountInCart = (productId) => {
      let productIndexInCart = getProductIndexInCart(productId);
  
      if (productIndexInCart !== -1) {
        let productRowInCart = cart[productIndexInCart];
        return productRowInCart.amount;
  
      } else {
        return 0;
      }
    }
  
    const getProductIndexInCart = (productId) => {
      return cart.findIndex(item => item.id === productId);
    }
  
    useEffect(
      () => console.log(cart),
      [cart]);




    return (
      <BrowserRouter>
        <UserContext.Provider value={{isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin}}>
          <ProductsContext.Provider value={{products, allProducts, getAllProducts, productsCategoriesWithAll, currentCategory, setCurrentCategory, priceObj, setPriceObj}}>
            <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, getAmountInCart, cartOpen, setCartOpen}}>

              <Header />

              {!isAuthenticated ?
                <RoutesAnonymous />
                :
                <RoutesAuthenticated />
              }

              <footer>this is my footer</footer>

            </CartContext.Provider>
          </ProductsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
      );
}

export default Main;