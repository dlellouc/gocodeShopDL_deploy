import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import SingleProductView from '../views/SingleProductView'
import AboutPage from '../views/AboutPage'
import NotFound from '../views/NotFound'
import UserContext from '../contexts/UserContext'
import Spinner from '../components/Spinner/Spinner'
import ProductsTable from '../components/ProductsTable/ProductsTable'


const RoutesAuthenticated = () => {
  const { isAdmin } = useContext(UserContext);

  return (
    <Routes>    
        <Route path="/" element={<App />} />
        <Route path="products/:productId" element={<SingleProductView />} />
        <Route path="about" element={<AboutPage />} />
        {/* {isAdmin && <Route path="about/about2" element={<Spinner />} /> } */}
        {/* <Route path="termsOfAgreement" element={<Spinner />} /> */}
        {isAdmin && <Route path="admin/allProducts" element={<ProductsTable />} /> }
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesAuthenticated