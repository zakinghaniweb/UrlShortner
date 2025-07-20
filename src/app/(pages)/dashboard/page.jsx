"use client"
import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import axios from 'axios'

const dashboard = () => {
  // State Vars =>
    const [urlData,setUrlData] = useState([])
  const userSelector = useAppSelector((state)=>state.User.value)
  axios.post("http://localhost:8000/url/getUrls",{
    userId: userSelector?._id
  })
  .then(res=>{
    setUrlData(res?.data)
  })
  .catch(err=>{
    console.log(err?.response?.data)
  })
  const router = useRouter()
  useEffect(() => {
    if (!userSelector) {
      router.push("/login")
    }
  }, [userSelector, router])
  return (
    <div>
      <div className="container">
        <table className="dashboard-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>ShortURL</th>
            <th>LongURL</th>
            <th>Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            urlData.map(item=>(
              <tr key={item._id}>
                <td className="icon-cell"><img src={item.favicon} alt="IDK" /></td>
                <td>{item.siteName}</td>
                <td><Link prefetch={false} href={`http://localhost:8000/url/${item.randomCode}`}>http://localhost:8000/url/{item.randomCode}</Link></td>
                <td><Link href={item.originalURL}>{item.originalURL}</Link></td>
                <td>{item.visit}</td>
                <td className="action-cell">
                  <button className='edit'>Edit</button>
                  <button className='delete'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default dashboard