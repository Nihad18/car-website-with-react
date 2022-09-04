// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";
// import maserati from "../download.jpeg"
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import PostLoader from "../components/Home/PostLoader";
import {RiArrowRightSLine,RiArrowLeftSLine} from "react-icons/ri";
function Home() {
  const [posts, setPosts] = useState();
  const [postId,setPostId]=useState();
  const [isLoading,setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getPosts=()=>{
      axios.get(`/api/post/list/`)
    .then((response) => {
      setPosts(response?.data?.results);
      setPostId(response?.data?.result?.id);
      setPageCount(Math.ceil(response?.data?.count/20))
      setIsLoading(false)
    })
    .catch((error) => console.log(error));
    }
 
    getPosts()
      // axios.get(`/api/post/detail/${10}`)
      // .then(response =>console.log(response))
      // .catch((error) => console.log(error))
  }, []);
  const fetchPosts=(currentPage)=>{
    axios.get(`/api/post/list/?page=${currentPage}`)
    .then((response) => {
      setPosts(response?.data?.results);
      setPostId(response?.data?.result?.id);
      setPageCount(Math.ceil(response?.data?.count/20))
      setIsLoading(false)
    })
    .catch((error) => console.log(error));
  }
  const handlePageClick =(data) => {
    
    let currentPage = data.selected + 1;
    fetchPosts(currentPage)
    setPageCount(currentPage)
  };
  return (
    <>
    <div className='bg-[#F3F7FC] dark:bg-[#1C1C1E] '>
        <div className="flex flex-wrap justify-center sm:w-[540px] lg:w-[960px] xl:min-w-[1250px]">
        {isLoading && <PostLoader cards={20}/> }
      { posts?.map((post, key) => {
        return(
        <div key={key}  className="w-[220px] min-h-[270px] m-2 rounded-md bg-white dark:bg-[#242426] dark:text-white">
          <img className="w-full h-[140px] rounded-md bg-cover bg-center" src={post?.image} alt="" />
          <div className="text-xl font-bold ml-3 pt-2">{post?.price}{" "}{post?.price_type}</div> 
          <div className="text-base ml-3 ">{post?.brand}{" "}{post?.brand_type}</div> 
          <div className="text-base ml-3 ">{post?.year} İl{" , "}{post?.engine_volume/100} L</div> 
          <div className="text-base ml-3 ">{post?.mileage}{" "}{post?.mileage_type}</div>  
          <div className="text-sm ml-3 pb-2 text-gray-400">{post?.city} {" "} {post?.creation_date}</div>
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
        containerClassName={"flex justify-end items-center"}
        pageClassName={"text-xl p-1"}
        pageLinkClassName={"text-xl p-1"}
        previousClassName={`text-xl p-1 border`}
        previousLinkClassName={`page-link`}
        nextClassName={"text-xl p-1"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"bg-orange-400"}
      />
      </div>
    </>
  );
}
export default Home;
