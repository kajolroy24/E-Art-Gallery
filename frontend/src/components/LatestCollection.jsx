import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Sort products by date in descending order
    const sortedProducts = [...products].sort((a, b) => b.date - a.date);
    // Take the first 8 products after sorting
    setLatestProducts(sortedProducts.slice(0, 8));
  }, [products]);

  return (
    <div className='my-10 mx-5'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our newest collections curated for you.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className='p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg'
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
