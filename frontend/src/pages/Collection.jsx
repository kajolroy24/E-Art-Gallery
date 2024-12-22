import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(null); // Allow only one category
  const [subCategory, setSubCategory] = useState(null); // Allow only one subcategory (artist)
  const [sortType, setSortType] = useState('relavent');

  // Function to handle single category selection
  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategory(prev => prev === selectedCategory ? null : selectedCategory); // Toggle same category or set new
  };

  // Function to handle single artist selection
  const toggleSubCategory = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(prev => prev === selectedSubCategory ? null : selectedSubCategory); // Toggle same artist or set new
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      productsCopy = productsCopy.filter(item => item.category === category);
    }
    if (subCategory) {
      productsCopy = productsCopy.filter(item => item.subCategory === subCategory);
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 pt-10 border-t bg-white shadow-lg rounded-lg ">
      {/* Left Side - Filter Options */}
      <div className={`ml-5 mb-5 min-w-60 p-5 bg-gray-50 rounded-lg shadow-md transition-all ${showFilter ? 'block' : 'hidden'} sm:block`}>
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 text-teal-500 font-semibold">
          FILTERS
          <img className={`h-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Toggle" />
        </p>

        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6 sm:block">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-base font-light text-gray-700">
            {['Nature', 'Abstract', 'Portrait', 'Pencil Drawing', 'Pen Art', 'Mandala Art', 'Digital Art'].map((categoryName) => (
              <label key={categoryName} className="flex gap-2 cursor-pointer">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={categoryName}
                  checked={category === categoryName}
                  onChange={toggleCategory}
                />
                {categoryName}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className="border border-gray-300 pl-5 py-3 my-5 sm:block">
          <p className="mb-3 text-sm font-medium">ARTIST</p>
          <div className="flex flex-col gap-2 text-base font-light text-gray-700">
            {['Demi','Sahana','Lavansi','Kokul'].map((artistName) => (
              <label key={artistName} className="flex gap-2 cursor-pointer">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={artistName}
                  checked={subCategory === artistName}
                  onChange={toggleSubCategory}
                />
                {artistName}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-5">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <h2 className="text-3xl font-bold text-yellow-500">ALL COLLECTIONS</h2>
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 rounded-lg bg-white focus:outline-none focus:ring focus:ring-teal-400">
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;
