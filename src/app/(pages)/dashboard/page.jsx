"use client"
import React, { useEffect } from 'react'
import "./dashboard.css"
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'

const dashboard = () => {
  const userSelector = useAppSelector((state)=>state.User.value)
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
            <th>ShortURL</th>
            <th>LongURL</th>
            <th>Icon</th>
            <th>Visit</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link href={"#"}>http://idk</Link></td>
            <td><Link href={"#"}>http://idk</Link></td>
            <td className="icon-cell">💗</td>
            <td><Link href={"#"}>visit://idk</Link></td>
            <td>2000 BC</td>
            <td className="action-cell">
              <button className='edit'>Edit</button>
              <button className='delete'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default dashboard