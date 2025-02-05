import React, { useState } from 'react'

const BgChanger = () => {

  const [color , setColor] = useState("olive");
   

  return (
    <>
      <div className='w-full h-screen duration-200 '
      style={{backgroundColor:color}}>
        <button onClick={()=>setColor("red")} className='bg-red-500 border-2 m-10 p-5 cursor-pointer'>Red</button>
        <button onClick={()=>setColor("green")} className='bg-green-400 border-2 m-10 p-5 cursor-pointer'>Green</button>
        <button onClick={()=>setColor("blue")} className='bg-blue-400 border-2 m-10 p-5 cursor-pointer'>Blue</button>
        <button onClick={()=>setColor("yellow")} className='bg-yellow-300 border-2 m-10 p-5 cursor-pointer'>Yellow</button>
      </div>
    </>
  )
}

export default BgChanger