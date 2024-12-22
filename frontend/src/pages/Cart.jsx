import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14  mx-10 bg-white rounded-lg p-6">
      <div className="text-2xl mb-3 text-teal-600">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="cart-items">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 transition-all duration-200 hover:bg-gray-100"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20 rounded-lg shadow-md" src={productData.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium text-teal-600">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xl font-semibold">{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border rounded bg-slate-50 text-yellow-500">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                className="border rounded-lg max-w-10 sm:max-w-20 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer transition hover:scale-110"
                src={assets.bin_icon}
                alt="bin icon"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-yellow-500 text-black text-sm my-8 px-8 py-3 rounded-lg shadow-md transition duration-200 hover:bg-yellow-400"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
