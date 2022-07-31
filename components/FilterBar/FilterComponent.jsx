import React from 'react'
import FilterItem from './FilterItem';
import {FiSearch} from 'react-icons/fi'
const filterItems = ['Apple', 'Samsung', 'Oppo', 'Vivo'];

const FilterComponent = () => {
  return (
    <div>
        <div className='font-[400] text-textPrimary'>Sellers</div>
        <div className='mt-5 w-full relative flex items-center justify-between'>
        <input
              className="w-full py-[6px] rounded-sm bg-transparent border-[2px] border-gray-600 px-3 text-textPrimary outline-none  placeholder:text-sm"
              placeholder="Search for items"
            />
            <div className="absolute right-3 ">
              <FiSearch className="text-gray-500" size={20} />
            </div>
        </div>
        <div className='mt-5 space-y-3'>
              {filterItems.map((f,idx)=><FilterItem key={idx} title={f}/>)}
        </div>
    </div>
  )
}

export default FilterComponent