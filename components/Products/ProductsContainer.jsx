import { useRouter } from 'next/router'
import React from 'react'
import Product from './Product'

const ProductsContainer = ({products}) => {
  const router = useRouter();
  return (
    <div className='bg-bgPrimary-700 px-6 py-3 text-textPrimary'>
        <div className='font-[500] text-textPrimary text-2xl py-3 pb-4'>All Products <span className='ml-2 text-sm text-gray-500 font-normal'>(Showing {products?.length || 0} products)</span></div>
        <hr  className='border-gray-500'/>
        {products.length===0?<div className='p-10 mt-32 text-center flex flex-col items-center justify-center'>
          <div className='text-3xl font-bold text-center text-flipkartBlue'>:( No Product Found!</div>
          <div className='mt-5'><button onClick={()=>router.push('/account/user')} className='w-fit rounded-md px-8 py-2 text-black bg-flipkartYellow'>Checkout Your Account</button></div>
        </div>:
        <div className='mt-4 space-y-5'>
            {/* Products */}
            {products?.map(p=>(
              <Product productDetails={p} key={p._id}/>
            ))}
        </div>}
    </div>
  )
}

export default ProductsContainer