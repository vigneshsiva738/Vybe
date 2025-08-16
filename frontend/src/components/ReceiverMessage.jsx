import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function ReceiverMessage({message}) {
    const {userData}=useSelector(state=>state.user)
    const {selectedUser}=useSelector(state=>state.message)
    const scroll =useRef()
      useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
        },[message.message,message.image])
  return (
    <div ref={scroll} className='w-fit max-w-[60%] bg-[#1a1f1f] rounded-t-2xl rounded-br-2xl rounded-bl-0 px-[10px] py-[10px] relative left-0 flex flex-col gap-[10px]'>
    {message.image &&  <img src={message.image} alt="" className='h-[200px] object-cover  rounded-2xl'/>
       }

     {message.message && <div className='text-[18px] text-white wrap-break-word'>{message.message}</div>}  

     <div className='w-[30px] h-[30px]  rounded-full cursor-pointer overflow-hidden absolute left-[-25px] bottom-[-40px]'>
        <img src={selectedUser.profileImage} alt="" className='w-full object-cover'/>
     </div>
    </div>
  )
}

export default ReceiverMessage
