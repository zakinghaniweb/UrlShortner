"use client"
import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import Link from 'next/link'
import { FaUser } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { userInfo } from '@/lib/slices/userSlice'
import { useRouter } from 'next/navigation'


const Navbar = () => {
  // State Vars =>
    const dispatch = useAppDispatch()
    const userSelector = useAppSelector((state)=>state.User.value)
    const [showDrop, setShowDrop] = useState(false)
    const router = useRouter()
    // == Functions ==>
    useEffect(() => {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      dispatch(userInfo(JSON.parse(storedUser)))
    }
    }, [dispatch])
    const handleLogout = ()=>{
      dispatch(userInfo(null))
      localStorage.removeItem("userInfo")
      router.push("/login")
    }
  return (
    <div id='navbar'>
      <div className="container">
        <div className="navbar-row">
          <div className="navbar-logo">
            <img src="images/logo.png" alt="logo" />
          </div>
            {
              !userSelector?
              <div className="navbar-menu">
                <li><Link href={"/login"}>Login</Link></li>
                <li><Link href={"/register"}>Register</Link></li>
              </div>
              :
              <div className="navbar-menu">
                <li><Link href={"/dashboard"}>Dashboard</Link></li>
                <li><Link href={"/shortURL"}>Short URL</Link></li>
              </div>
            }
            {
              userSelector&&
              <div className="navbar-profile">
              <Link className='dashboard' href={"/dashboard"}>Dashboard</Link>
              <button className='profile' onClick={()=>setShowDrop(!showDrop)}><FaUser />
              {
                showDrop&&
                <ul>
                  <li onClick={handleLogout}>
                    <Link href={"#"}>Logout</Link>
                  </li>
                </ul>
              }
              </button>
            </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Navbar