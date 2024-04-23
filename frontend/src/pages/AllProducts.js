import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProducts]=useState(false)

  const [allProduct,setAllProduct]=useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url)

    const dataRespone = await response.json()
    setAllProduct(dataRespone?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 py-1 px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all  rounded-full' onClick={()=>setOpenUploadProducts(true)}>Upload Product</button>
      </div>

      {/** all product */}

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
{
  allProduct.map((product,index)=>(
    <AdminProductCard  data={product} key={index+"allProduct"} fetchdata={fetchAllProduct} />
       
  ))
}
      </div>

      {/* UploadProduct components */}

{
  openUploadProduct && (
    <UploadProduct onClose={()=>setOpenUploadProducts(false)} fetchData={fetchAllProduct}/>
  )
}
      

    </div>
  )
}

export default AllProducts