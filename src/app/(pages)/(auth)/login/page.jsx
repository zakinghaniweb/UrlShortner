"use client"
import React, { useEffect, useState } from 'react'
import "./login.css"
import { MdMailOutline } from "react-icons/md"
import { FaRegEye } from "react-icons/fa"
import Link from 'next/link'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { userInfo } from '@/lib/slices/userSlice'
import { useRouter } from 'next/navigation'

const Login = () => {
  // State vars
  const userSelector = useAppSelector((state)=>state.User.value)
  const [showPass,setShowPass] = useState(true)
  const [loginData,setLoginData] = useState({email: "", password: ""})
  const [resErr,setResErr] = useState("")
  const [res400,setRes400] = useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  // Login Submission
  useEffect(() => {
    if (userSelector) {
      router.push("/shortURL")
    }
  }, [userSelector, router])
  const handleLogin = (e)=>{
    e.preventDefault()
    setRes400("")
    console.log(res400)
      axios.post("http://localhost:8000/auth/login", loginData)
    .then(res => {
      console.log(res.data)
      setRes400(res.data.message)
      dispatch(userInfo(res.data.DBuser))
      localStorage.setItem("userInfo", JSON.stringify(res.data.DBuser))
    })
    .catch(err => {
      setResErr(err.response?.data?.message)
    });
  }
  return (
    <div className='flex justify-center items-center h-screen bg-[#E8EDF2]'>
        <div className="login">
            <div className="login-row">
                <div className="login-head">
                    <div className="login-logo">
                      <img src="/images/login.png" alt="Logo" />
                    </div>
                    <h1>Welcome Back!</h1>
                    <p>Let’s build something great</p>
                </div>
                <div className="login-form">
                  {
                    resErr != "" &&
                    <div className="alert"><p>{resErr}</p></div>
                  }
                  {
                    res400 != "" &&
                    <div className="success"><p>{res400}</p></div>
                  }
                  <form onSubmit={handleLogin}>
                      <label htmlFor="email">E-mail or phone number</label>
                    <div className="login-input-group">
                      <input onChange={(e)=>{setLoginData(prev => ({ ...prev, email: e.target.value })),setResErr("")}} type="text" id='email' placeholder='Email'/>
                      <i><MdMailOutline /></i>
                    </div>
                      <label htmlFor="password">Password</label>
                    <div className="login-input-group">
                      <input onChange={(e)=>{setLoginData(prev => ({ ...prev, password: e.target.value })),setResErr("")}} type={showPass?"text":"password"} id='password' placeholder='Password'/>
                      <i className='cursor-pointer' onClick={()=>setShowPass(!showPass)}><FaRegEye /></i>
                    </div>
                    <button type='submit' className='login-submit'>Login</button>
                  </form>
                  <Link href={"#"} className='my-[20px] font-poppins font-normal text-[12px] text-[#8083A3] text-end'>Forgot password?</Link>
                </div>
                <div className="other-options">
                  <button className="login-option">
                    <img src="images/google.png" alt="G" />
                    <p>Google Account</p>
                  </button>
                  <button className="login-option">
                    <img src="images/facebook.png" alt="F" />
                    <p>Facebook account</p>
                  </button>
                </div>
                <p className='font-poppins font-normal text-[14px] text-[#07070C] text-center'>Don’t have an account?<Link href={"#"} className='text-brandColor'> Sign up</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login