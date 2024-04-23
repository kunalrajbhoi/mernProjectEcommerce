import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
    email : "",
    name : "",
    role : "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include"
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Fetch all users error:", error);
      toast.error("An error occurred while fetching all users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className='w-full userTable'>
        <thead className='bg-black text-white'>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='bg-white pb-4'>
          {allUser.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.role}</td>
              <td>{moment(item?.createdAt).format('YYYY-MM-DD')}</td>
              <td>
                <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white' 
                onClick={()=>
                {
                  setUpdateUserDetails(item)
                  setOpenUpdateRole(true)
                }}>
                  <MdEdit />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
{
  openUpdateRole && (<ChangeUserRole
   onClose={()=>setOpenUpdateRole(false)} 
   name={updateUserDetails.name}
   email={updateUserDetails.email}
   role={updateUserDetails.role}
   userId={updateUserDetails._id} 
   callFunc={fetchAllUsers}
   />)
}
      
    </div>
  );
};

export default AllUsers;
