import React, { useContext, useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

    const navigate = useNavigate()
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)
    

    const [showPassword,setShowPassword]=useState(false)

    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataResponse = await fetch(SummaryApi.signIN.url,{
            method:SummaryApi.signIN.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
    }


    return (
        <section id='login'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icon' />
                    </div>

                    <form className='pt-5' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                            <input type='email' name='email' onChange={handleOnChange} value={data.email} placeholder='enter email' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : "password"} name='password' onChange={handleOnChange} value={data.password} placeholder='enter password' className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }</span>
                            </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot Password
                            </Link>
                        </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>
                    </form>

                    <p className='my-5'> Don't have account ? <Link to={"/sing-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sing up</Link></p>

                </div>
            </div>
        </section>
    )
}

export default Login