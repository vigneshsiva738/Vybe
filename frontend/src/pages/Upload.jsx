import React from 'react'
import { useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import { useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setCurrentUserStory, setStoryData } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';
import { ClipLoader } from 'react-spinners';
import { setUserData } from '../redux/userSlice';
function Upload() {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState("")
    const [caption,setCaption]=useState("")
    const mediaInput = useRef()
    const dispatch=useDispatch()
    const {postData}=useSelector(state=>state.post)
     const {storyData}=useSelector(state=>state.story)
      const {loopData}=useSelector(state=>state.loop)
      const [loading,setLoading]=useState(false)
    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

const uploadPost=async ()=>{
   
    try {
        const formData=new FormData()
        formData.append("caption",caption)
        formData.append("mediaType",mediaType)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true})
       dispatch(setPostData([...postData,result.data]))
       setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}

const uploadStory=async ()=>{
    try {
        const formData=new FormData()
        formData.append("mediaType",mediaType)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/story/upload`,formData,{withCredentials:true})
       dispatch(setCurrentUserStory(result.data))
         setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}
const uploadLoop=async ()=>{
    try {
        const formData=new FormData()
        formData.append("caption",caption)
        formData.append("media",backendMedia)
        const result=await axios.post(`${serverUrl}/api/loop/upload`,formData,{withCredentials:true})
         dispatch(setLoopData([...loopData,result.data]))
         setLoading(false)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}

const handleUpload=()=>{
    setLoading(true)
    if(uploadType=="post"){
        uploadPost()
    }else if(uploadType=="story"){
        uploadStory()
    }else{
        uploadLoop()
    }
}

    return (
        <div className='w-full h-[100vh] bg-black flex flex-col items-center '>
            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
            </div>

            <div className='w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]' >

                <div className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""}  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("post")}>Post</div>

                <div className={`${uploadType == "story" ? "bg-black text-white shadow-2xl shadow-black" : ""}  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("story")}>Story</div>

                <div className={`${uploadType == "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""}  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("loop")}>Loop</div>
            </div>

            {!frontendMedia && <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]' onClick={() => mediaInput.current.click()}>
                <input type="file" accept={uploadType=="loop"?"video/*":""} hidden ref={mediaInput} onChange={handleMedia} />
                <FiPlusSquare className='text-white cursor-pointer w-[25px] h-[25px]' />
                <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
            </div>}

            {frontendMedia &&
                <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[15vh]'>
             {mediaType=="image" && <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] '>
                <img src={frontendMedia} alt="" className='h-[60%] rounded-2xl'/>
                {uploadType!="story" &&  <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e)=>setCaption(e.target.value)} value={caption}/>}
               
                </div>}

                 {mediaType=="video" && <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] '>
                <VideoPlayer media={frontendMedia}/>
                {uploadType!="story" &&  <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e)=>setCaption(e.target.value)} value={caption}/>}
               
                </div>}


               

                </div>}
                {frontendMedia && <button className='px-[10px] w-[60%] max-w-[400px]   py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl' onClick={handleUpload}>{loading?<ClipLoader size={30} color='black'/>:`Upload ${uploadType}` }</button>}

        </div>
    )
}

export default Upload