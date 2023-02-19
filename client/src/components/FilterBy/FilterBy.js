import React, { useContext } from 'react'
import ProductsContext from '../../contexts/ProductsContext';
import './FilterBy.css'
import { FormControl, InputLabel, NativeSelect } from '@mui/material'

const FilterBy = () => {
  const { productsCategoriesWithAll, currentCategory, setCurrentCategory } = useContext(ProductsContext);

  return (
    // <div className='collection-sort'>
    //   <label>Filter by:</label>
    //     <select onChange={(event) => setCurrentCategory(event.target.value)}>
    //       {productsCategoriesWithAll.map(
    //         (item, index) => <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}
    //     </select>
    // </div>

    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Filter by
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'category',
            id: 'uncontrolled-native',
          }}
          onChange={(event) => setCurrentCategory(event.target.value)}
        >
          {productsCategoriesWithAll.map(
             (item, index) => <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
          )}
        </NativeSelect>
      </FormControl>
  )
}

export default FilterBy