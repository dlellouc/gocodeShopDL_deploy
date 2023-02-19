import React from 'react'
import '../FilterBy/FilterBy.css'
import './SortBy.css'

const sortOptionsArr = ['Featured', 'Best selling', 'Alphabetically, A-Z', 'Alphabetically, Z-A', 
                        'Price, low to high', 'Price, high to low', 'Date, new to old', 'Date, old to new'];

const SortBy = () => {
  return (
    <div className='collection-sort'>
      <label>Sort by:</label>
        <select>
          {sortOptionsArr.map((item, index) => <option key={index} value='/'>{item}</option>)}
        </select>
    </div>
  )
}

export default SortBy