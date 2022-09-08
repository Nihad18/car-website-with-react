// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";
import car from "../images/download.jpeg"
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import PostLoader from "../components/Home/PostLoader";
import {AiFillHeart,AiOutlineHeart } from 'react-icons/ai'
import {RiArrowRightSLine,RiArrowLeftSLine} from "react-icons/ri";
import {useSelector,useDispatch} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from 'react-router-dom'
import {setPostId} from "../redux/reducers/postSlice"
function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1)

  const dispatch= useDispatch()
  const token=useSelector((state)=>state.auth.value)
  const notify = () => toast.warn("Elanı sevimlilərə elavə etmək üçün səhifəyə daxil olmalısız!")

  const toggleFav = (postId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    const newFavStatus = !posts[postIndex].is_favourite ;

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = {
      ...posts[postIndex],
      is_favourite : newFavStatus,
    };
    
    setPosts(updatedPosts);
    }
    
  useEffect(() => {
     axios.get(`/api/post/list/?page=${1}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },})
    .then((response) => {
      setPosts(response?.data?.results);
      setPageCount(Math.ceil(response?.data?.count/20))
      setActivePage(1)
      // dispatch(setPostId(response?.data?.results?.id))
      setIsLoading(false)
    })
    .catch((error) => console.log(error));
  
  }, []);
  
  const fetchPosts=(currentPage)=>{
    axios.get(`/api/post/list/?page=${currentPage}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },})
    .then((response) => {
      setPosts(response?.data?.results);
      setPageCount(Math.ceil(response?.data?.count/20))
      // dispatch(setPostId(response?.data?.results?.id))
      setActivePage(currentPage)
      setIsLoading(false)
    })
    .catch((error) => console.log(error));
  }
// --------------------------------------------------------------------------
  const postFav=(postId)=>{ axios.post(`/api/favourite/create/`,{"post":postId},{
     headers: {
       Authorization: `Bearer ${token}`,
      }})
    }
  const deleteFav=(postId)=>{
     axios.delete(`/api/favourite/delete/${postId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }})
  }
// -------------------------------------------------------------------------
  const handlePageClick =(data) => {
    let currentPage = data.selected + 1;
    setIsLoading(true)
    setPosts([])
    fetchPosts(currentPage)
    setPageCount(currentPage)
    setActivePage(currentPage)
  };
  
  return (
    <>
    <div className='bg-[#F3F7FC] dark:bg-[#1C1C1E] sm:w-[540px] lg:w-[960px] xl:min-w-[1250px] '>
        <div className="flex flex-wrap justify-center ">
        {isLoading && <PostLoader cards={20}/> }
      { posts?.map((post, key) => {
        return(
          <div key={key} onClick={() =>{dispatch(setPostId(post?.id))}} className="w-[220px] min-h-[270px] m-2 rounded-md bg-white dark:bg-[#242426] dark:text-white">
          <div className="relative">
           <NavLink to={`postdetail`} >  
           <img className="w-full h-[140px] rounded-md bg-cover bg-center" 
             src={car} 
             alt="" />
          </NavLink>
          {token 
          ? <label htmlFor={post.id} className="absolute text-2xl top-2 right-2 cursor-pointer z-50">
          <input id={post.id} type="checkbox" className="hidden" /> 
          { post?.is_favourite  
          ? <AiFillHeart className="fill-red-500"  onClick={()=>{toggleFav(post.id);deleteFav(post.id)}}/>
          : <AiOutlineHeart className="text-white" onClick={()=>{toggleFav(post.id);postFav(post.id)}}/>
          }
          </label> 

          : <div className="text-white absolute top-2 right-2 cursor-pointer">
           <AiOutlineHeart onClick={notify} className="text-2xl"/>
          <ToastContainer />
             </div>
          }
          </div>
          <NavLink to={`postdetail`} >
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
    </>
  );
}
export default Home;
