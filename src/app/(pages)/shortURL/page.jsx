"use client"
import Link from "next/link"
import "./shortURL.css"
import { useState } from "react"
import { FaLink } from "react-icons/fa"
import axios from "axios"
import { useAppSelector } from "@/lib/hooks"

const shortURL = () => {
  // State Vars ==>
    const [url,setUrl] = useState("")
    const [successMsg,setSuccessMsg] = useState("")
    const [error,setError] = useState("")
    const [urlResult,setURLResult] = useState([])
    const userId = useAppSelector(state=>state.User.value?._id)

  // Function ==>
  function getFaviconUrl(siteUrl) {
    try {
      const url = new URL(siteUrl)
      return `${url.origin}/favicon.ico`
    } catch {
      return null
    }
  }
  function extractSiteName(url) {
  try {
    let hostname = new URL(url).hostname
    if (hostname.startsWith('www.')) hostname = hostname.slice(4)
    const parts = hostname.split('.')
    const tlds2 = ['co.uk', 'org.uk', 'gov.uk', 'ac.uk']
    let domain = ''
    const lastTwo = parts.slice(-2).join('.')
    if (tlds2.includes(lastTwo) && parts.length > 2) {
      domain = parts[parts.length - 3]
    } else {
      domain = parts[parts.length - 2]
    }
    return domain.charAt(0).toUpperCase() + domain.slice(1)
  } catch {
    return 'Invalid URL'
  }
}
    const handleSubmit = (e)=>{
      e.preventDefault()
      setSuccessMsg("")
      setError("")
      axios.post("http://localhost:8000/url/shortURL",{
        url,
        name: extractSiteName(url),
        userId,
        favicon: getFaviconUrl(url),
      })
      .then(res=>{
        setSuccessMsg(res.data.message)
        setURLResult(res.data.info)
      })
      .catch(error=>{
        if (error.response) {
          setError(error.response.data)
        } else if (error.request) {
            setError("Internal Server Error")
        } else {
          setError("Unexpected error: " + error.message)
        }
      })
    }
  return (
    <div className='flex justify-center items-center h-screen bg-[#E8EDF2]'>
        <div className="shortURL">
            <div className="shortURL-row">
                <div className="shortURL-head">
                    <h1>URL Shortner</h1>
                    <p>Place your URL and make it shorter!</p>
                </div>
                <div className="shortURL-form">
                  {
                    error != "" &&
                    <div className="alert"><p>{error}</p></div>
                  }
                  {
                    successMsg != "" &&
                    <div className="success"><p>{successMsg}</p></div>
                  }
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="url">URL</label>
                    <div className="shortURL-input-group">
                      <input onChange={(e)=>{setUrl(e.target.value),setError("")}} type="text" id="url" placeholder='https://...'/>
                      <i><FaLink /></i>
                    </div>
                    <button type='submit' className='shortURL-submit'>Submit</button>
                  </form>
                  {
                    urlResult.length != 0 &&
                    <div className="url-result">
                      <h2 className="poppins text-xl font-bold mt-[10px]">Result: </h2>
                      <h3>Shortened URL: <Link className="underline hover:underline-offset-3" target="_blank" href={`${urlResult&&urlResult.shortURL}`}>{urlResult&&urlResult.shortURL}</Link></h3>
                      <div className="shortURL-input-group">
                        <input type="text" value={`Original: ${urlResult&&urlResult.originalURL}`} id="url" readOnly/>
                        <i><FaLink /></i>
                      </div>
                    </div>
                  }
                </div>
                <p className='font-poppins font-normal text-[14px] text-[#07070C] text-center mt-[20px]'>Go to<Link href={"/"} className='text-brandColor'> Home</Link></p>
            </div>
        </div>
    </div>
  )
}

export default shortURL