import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LoopCard from '../components/LoopCard';
import { useSelector } from 'react-redux';
function Loops() {
    const navigate=useNavigate()
    const {loopData}=useSelector(state=>state.loop)
  return (
    <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center '>
       <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100]'>
                      <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
                      <h1 className='text-white text-[20px] font-semibold'>Loops</h1>
                  </div>
            <div className='h-[100vh] overflow-y-scroll snap-y     snap-mandatory scrollbar-hide'>
{loopData.map((loop,index)=>(
    <div className='h-screen snap-start'>
    <LoopCard loop={loop} key={indexedDB}/>
    </div>
))}
            </div>
                  
    </div>
  )
}

export default Loops
