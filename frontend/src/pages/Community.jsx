import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Community = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/community/member",
        { name, email, address, district, phonenumber, category },
        { headers: { token } }
      );
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/community");
      setToken(token);
    }
  }, [token]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);


//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

  return (
    <div>
      {token? (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${assets.login_bg})`,
            backgroundSize: "cover",
          }}
        >
          <form
            onSubmit={onSubmitHandler}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md my-10"
          >
            <h2 className="text-2xl font-bold mb-5 text-teal-700 text-center">
              Join With Us
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2 
            `}
                placeholder="Enter your Address"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">District</label>
              <input
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2              
            `}
                placeholder="Enter your District"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Phone number</label>
              <input
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2
              
            `}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 "
              >
                <option className="text-slate-700" value="As a Artist">As a Artist</option>
                <option className="text-slate-700" value="As a Art Lover">As a Art Lover</option>
              </select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default Community;
