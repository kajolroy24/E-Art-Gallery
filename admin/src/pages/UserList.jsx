import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const UserList = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/user/list')
        if(response.data.success) {
          setList(response.data.user)
          console.log(response.data.user);
          
        }
        else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
          console.log(error)

          toast.error(error.message)
      }
  }

  const removeUser = async (id) => {
      try {
        const response = await axios.post(backendUrl + '/api/user/remove', {id} , {headers:{token}})

        if(response.data.success){
            toast.success(response.data.message)
            await fetchList();
        } else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
      fetchList();
  },[])

  return (
    <>
      <p className='mb-2'>All Users List</p>

      <div className='flex flex-col gap-2'>
        {/* ----List Table Title..... */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>name</b>
            <b>email</b>
            {/* <b>Category</b>
            <b>Price</b> */}
            <b className='text-center'>Action</b>
        </div>

        {/* ----User List........ */}

        {
          list.map((item, index)=> (
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                {/* <p>{currency}{item.price}</p> */}
                <p onClick={()=>removeUser(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default UserList