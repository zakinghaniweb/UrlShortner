"use client"
import Link from 'next/link'
import "./register.css"
import React, { useEffect, useState } from 'react'
import { FaRegEye,  } from 'react-icons/fa'
import { MdMailOutline } from 'react-icons/md'
import { FiUser } from "react-icons/fi"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { userInfo } from '@/lib/slices/userSlice'
import { useRouter } from 'next/navigation'

const Register = () => {
  // State Vars =>
  const [showPass,setShowPass] = useState(true)
  const [registerData,setRegisterData] = useState({firstName: "", lastName: "", email: "", password: ""})
  const [res200,setRes200] = useState("")
  const [resErr,setResErr] = useState("")
  const dispatch = useAppDispatch()
  const userSelector = useAppSelector((state)=>state.User.value)
  const router = useRouter()
  // Functions =>
  useEffect(() => {
    if (userSelector) {
      router.push("/shortURL")
    }
  }, [userSelector, router])
  const handleRegister = (e)=>{
    e.preventDefault()
    setRes200("")
    axios.post("http://localhost:8000/auth/register", registerData)
    .then(res => {
      setRes200(res.data)
      dispatch(userInfo(registerData))
      localStorage.setItem("userInfo", JSON.stringify(registerData))
    })
    .catch(err => {
      setResErr(err.response.data)
    })
  }
  return (
    <div className='flex justify-center items-center h-screen bg-[#E8EDF2]'>
        <div className="register">
            <div className="register-row">
                <div className="register-head">
                  <div className="register-logo">
                    <img src="/images/register.png" alt="Logo" />
                  </div>
                  <h1>Create an account</h1>
                  <p>You are welcome!</p>
                </div>
                <div className="register-form">
                  {
                    resErr &&
                    <div className="alert"><p>{resErr}</p></div>
                  }
                  {
                    res200 &&
                    <div className="success"><p>{res200}</p></div>
                  }
                  <form onSubmit={handleRegister}>
                      <label>Your name</label>
                      <div className="flex gap-[20px]">
                        <div className="register-input-group">
                            <input onChange={(e)=>{setRegisterData(prev=>({...prev, firstName: e.target.value })),setResErr("")}} type="text" placeholder='First name'/>
                            <i><FiUser /></i>
                        </div>
                        <div className="register-input-group">
                            <input onChange={(e)=>{setRegisterData(prev=>({...prev, lastName: e.target.value })),setResErr("")}} type="text" placeholder='Last name'/>
                            <i><FiUser /></i>
                        </div>
                      </div>
                      <label htmlFor="email">E-mail</label>
                    <div className="register-input-group">
                      <input onChange={(e)=>{setRegisterData(prev=>({...prev, email: e.target.value })),setResErr("")}} type="text" id='email' placeholder='Email'/>
                      <i><MdMailOutline /></i>
                    </div>
                      <label htmlFor="password">Password</label>
                    <div className="register-input-group">
                      <input onChange={(e)=>{setRegisterData(prev=>({...prev, password: e.target.value })),setResErr("")}} type={showPass?"password":"text"} id='password' placeholder='Password'/>
                      <i className='cursor-pointer' onClick={()=>setShowPass(!showPass)}><FaRegEye /></i>
                    </div>
                      <label htmlFor="confirm">Confirm Password</label>
                    <div className="register-input-group">
                      <input type={showPass?"password":"text"} id='confirm' placeholder='Password'/>
                      <i className='cursor-pointer' onClick={()=>setShowPass(!showPass)}><FaRegEye /></i>
                    </div>
                    <button type='submit' className='register-submit'>Sign Up</button>
                  </form>
                  <Link href={"#"} className='my-[20px] font-poppins font-normal text-[12px] text-[#8083A3] text-end'>Forgot password?</Link>
                </div>
                <div className="other-options">
                  <button className="register-option">
                    <img src="images/google.png" alt="G" />
                    <p>Google Account</p>
                  </button>
                  <button className="register-option">
                    <img src="images/facebook.png" alt="F" />
                    <p>Facebook account</p>
                  </button>
                </div>
                <p className='font-poppins font-normal text-[14px] text-[#07070C] text-center'>Already have an account?<Link href={"#"} className='text-brandColor'> Sign In</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register