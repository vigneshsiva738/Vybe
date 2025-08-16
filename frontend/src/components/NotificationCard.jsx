import React from 'react'
import dp from "../assets/dp.webp"
function NotificationCard({noti}) {

    
  return (
    <div className='w-full flex justify-between items-center p-[5px] min-h-[50px] bg-gray-800 rounded-full'>
    <div className='flex gap-[10px] items-center'>
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                 <img src={noti.sender.profileImage || dp} alt="" className='w-full object-cover'/>
             </div> 
             <div className='flex flex-col'>
                <h1 className='text-[16px] text-white font-semibold'>{noti.sender.userName}</h1>
                <div className='text-[15px] text-gray-200'>{noti.message}</div>
             </div>
    </div>
    <div className='w-[40px] h-[40px] rounded-full overflow-hidden border-4 border-black'>

        {noti.loop
        ?
        <video src={noti?.loop?.media} muted  className='h-full w-full object-cover'/>
        :
        noti.post?.mediaType=="image"?
        <img src={noti.post?.media} className='h-full object-cover'/>
        :
        noti.post?
        <video src={noti.post?.media} muted loop className='h-full w-full object-cover'/>
        :
        null}

    </div>
    </div>
  )
}

export default NotificationCard
