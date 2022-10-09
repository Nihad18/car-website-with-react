import React,{useState,useEffect} from 'react'
import car from "../../images/car-removebg-preview-removebg-preview.png"
import axios from "axios"
// React paginate
import ReactPaginate from 'react-paginate';
// Router
import {NavLink} from 'react-router-dom'
// Redux
import {useSelector} from "react-redux"
// React-icons
import {AiFillHeart,AiOutlineHeart } from 'react-icons/ai'
import {RiArrowRightSLine,RiArrowLeftSLine} from "react-icons/ri";

const MyPosts = () => {
  const url=`https://ayxan0314.pythonanywhere.com`
  const token=useSelector((state)=>state.auth.value)
  const [posts,setPosts]=useState([])
  const [isLoading,setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1)
  useEffect(() => {
   axios.get(`${url}/api/account/my-posts/?page=${1}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
  }).then((res)=>{
    if(res.status===200){
      setIsLoading(false)
      setPosts(res?.data?.results)
      setPageCount(Math.ceil(res.data?.count/3))
      setActivePage(1)
    }
    else{
      setIsLoading(true)
    }
  })
  },[])
  const fetchPosts=async(currentPage)=>{
    await axios.get(`${url}/api/account/my-posts/?page=${currentPage}`,
     token && {
       headers: {
         Authorization: `Bearer ${token}`,
     }})
     .then((response) => {
      if(response.status === 200) {
        setPosts(response?.data?.results);
        setPageCount(Math.ceil(response?.data?.count/3))
        setActivePage(currentPage)
        setIsLoading(false)
      }
      else{
        setIsLoading(true)
      }
     })
     .catch((error) => console.log(error));
   }
   const handlePageClick =(data) => {
    let currentPage = data.selected + 1;
    setIsLoading(false)
  // setPosts([])
    fetchPosts(currentPage)
    setPageCount(currentPage)
    setActivePage(currentPage)
  };
  return (
    <div className='min-h-[380px] text-white flex items-center justify-center'>
      {
        posts?.length!==0 
        ? 
        <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-wrap items-center justify-center'>
        { posts?.map((post, key) => {
        return(
          <div key={key} onClick={() =>{
          }} className="w-[220px] min-h-[270px] m-2 rounded-md border bg-white text-black dark:bg-[#242426] dark:text-white">
          <div className="relative">
           <NavLink to={`/postdetail/${post?.id}`} >  
           <img className="w-full h-[140px] rounded-md bg-cover bg-center" 
             src={post.image} 
             alt="" />
          </NavLink>
          </div>
          <NavLink to={`/postdetail/${post.id}`} >
          <div className="text-xl font-bold ml-3 pt-2">{post?.price}{" "}{post?.price_type}</div> 
          <div className="text-base ml-3 ">{post?.brand}{" "}{post?.brand_type}</div> 
          <div className="text-base ml-3 ">{post?.year} İl{" , "}{post?.engine_volume/100} L</div> 
          <div className="text-base ml-3 ">{post?.mileage}{" "}{post?.mileage_type}</div>  
          <div className="text-sm ml-3 pb-2 text-gray-400">{post?.city} {" "} {post?.creation_date}</div>
          </NavLink>
        </div>
        )})}
        </div>
          <ReactPaginate
          previousLabel={<RiArrowLeftSLine/>}
          nextLabel={<RiArrowRightSLine/>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex flex-wrap justify-center items-center mt-2 mb-3"}
          pageClassName={"text-base sm:text-xl w-[34px] h-[26px] sm:w-[38px] sm:h-[30px] rounded m-1 bg-white dark:text-white dark:bg-[#151515]"}
          pageLinkClassName={"flex justify-center items-center"}
          previousClassName={`text-base sm:text-xl mr-1 rounded border border-[#808080] bg-[#f90]`}
          previousLinkClassName={`${activePage===1 && 'opacity-50 cursor-not-allowed' } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
          nextClassName={"text-base sm:text-xl ml-1 rounded border border-[#808080] bg-[#f90]"}
          nextLinkClassName={`${activePage===pageCount && 'opacity-50 cursor-not-allowed' } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
          breakClassName={"text-base sm:text-xl px-2"}
          // breakLinkClassName={"page-link"}
          activeClassName={"border-2 border-[#f90]"}
      />
        </div>
        : 
        <div className='flex flex-col '>
          <img src={car} alt="car" className='w-[180px] h-[140px] mb-4 drop-shadow-[0_0_50px_white]' />
          <p className='text-black dark:text-white mb-4'>Hazırda elanınız yoxdur !</p>
          <button className="bg-green-500 rounded py-1 px-2 ">Elan yerləşdir</button>
        </div>
      }
      {isLoading && 
        <div className='flex flex-col items-center'>
          <div className='font-bold text-xl text-center mb-2'>Postlar yüklənə bilmədi,səhifəni yeniləyin!</div>
          <button className="bg-green-500 rounded py-1 px-2 ">Səhifəni yenilə</button>
        </div>}
    </div>
  )
}

export default MyPosts