import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext)  
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size, setSize] = useState('');


  const fetchProductData = async ()=>{
      products.map((item)=>{
        console.log(products);
        
        if(item._id === productId){
          setProductData(item)
          setImage(item.image[0])
          return null;
        }
      })
  }

  useEffect(()=>{
      fetchProductData();
  },[productId, products])

  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 mx-5'>
      {/* ..........Product Data........ */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
            {/*........Product Images......... */}
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                  {
                    productData.image.map((item, index)=>(
                      <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                    ))
                  }
                </div>
                <div className='w-full sm:w-[80%]'>
                    <img className='w-full h-auto' src={image} alt="" />
                </div>
            </div>

            {/* .....Product Info .... */}
            <div className='flex-1'>
                  <h1 className='font-medium text-2xl mt-2 text-red-800'>{productData.name}</h1>
                  <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                  <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
                  <p className='mt-2 text-gray-500 md:w-4/5'>by : {productData.subCategory}</p>
        
                  <div className='flex flex-col gap-4 my-8'>
                      <p>Select Size</p>
                      <div className='flex gap-2'>
                        {productData.sizes.map((item, index)=>(
                          <button onClick={()=>setSize(item)} className={`border-2 py-2 px-4 bg-gray-100 ${item === size ? 'border-yellow-500' : ''}`} key={index}>{item}</button>
                        ))}
                      </div>
                  </div>
                  
                  <button onClick={()=>addToCart(productData._id, size)} className='bg-teal-600 text-white px-8 py-3 text-sm active:bg-yellow-500 rounded-lg'>ADD TO CART</button>
                  <hr className='mt-8 sm:w-4/5' />
            </div>
        </div>


        {/* .........Display Related Products  */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product