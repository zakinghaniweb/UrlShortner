import React from 'react'

const page = () => {
  return (
    <div>404 Not Found</div>
  )
}

export default page
// 'use client'

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ShortCodePage({ params }) {
//   const [error, setError] = useState(false)
//   const shortCode = params?.shortCode

//   useEffect(() => {
//     if (shortCode){
//       axios.get('http://localhost:8000/url/getallURL')
//         .then(res=>{
//           const mongoURL = res.data.find(item => item.randomCode == shortCode)
//           if (mongoURL?.originalURL) {
//               window.location.href = mongoURL.originalURL
//           } else {
//             setError(true)
//           }
//         })
//         .catch(()=>setError(true))
//     }
//   }, [shortCode])
//   return(
//     <div className="flex justify-center items-center h-screen">
//       <h1 className="font-bold text-4xl text-brandColor">{error?"Invalid Link":"Redirecting..."}</h1>
//     </div>
//   )
// }
