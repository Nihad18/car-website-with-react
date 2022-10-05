import React,{useState,useEffect} from 'react'
import car from "../../images/car-removebg-preview-removebg-preview.png"
import axios from "axios"
const MyPosts = () => {
  const [posts,setPosts]=useState([])
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
   async function fetchMyPosts(){
    const {data}=await axios.get(`/api/account/my-posts/`)
    setPosts(data)
    setIsLoading(false)
    }
  fetchMyPosts()
  },[])
  return (
    <div className='min-h-[380px] text-white flex items-center justify-center'>
      
      <div className='flex flex-col '>

      <img src={car} alt="car" className='w-[180px] h-[140px] mb-4 drop-shadow-[0_0_50px_white]' />

      <p className='text-black dark:text-white mb-4'>Hazırda elanınız yoxdur !</p>
      
      <button className="h-34 bg-green-500 rounded py-1 px-2 ">Elan yerləşdir</button>
      </div>
    </div>
  )
}

export default MyPosts