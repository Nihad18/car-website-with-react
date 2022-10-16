import { useState, useEffect } from "react";
// Images
import car from "../images/download.jpeg";
import CarFrontSide from "../images/car.svg";

// Axios
import axios from "axios";

// Componets
import ReactPaginate from "react-paginate";
import PostLoader from "../components/Home/PostLoader";

// Icons
import { AiFillHeart } from "react-icons/ai";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

// Redux-Toolkit
import { useSelector } from "react-redux";

// React Router
import { NavLink, useNavigate, useParams } from "react-router-dom";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favourites() {
  const url = process.env.REACT_APP_API_URL;
  const [posts, setPosts] = useState([]);
  const [postsArray, setPostsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIsNotLoading, setPageIsNotLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [postCount, setPostCount] = useState(1);
  const token = useSelector((state) => state.auth.value);

  const navigate = useNavigate();

  const notify = () => toast.success("Elan uğurla sevimlilərdən silindi !");

  const toggleFav = (postId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    const newFavStatus = !posts[postIndex].is_favourite;

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = {
      ...posts[postIndex],
      is_favourite: newFavStatus,
    };
    // updatedPosts.splice(postIndex, 1);
    setPosts(updatedPosts);
    setPostsArray(updatedPosts);
  };
  useEffect(() => {
    axios
      .get(`${url}/api/favourite/list/?page=${1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res?.data?.results);
          setPostsArray(res?.data?.results);
          setPageCount(Math.ceil(res?.data?.count / 5));
          setPostCount(res?.data?.results.length);
          setActivePage(1);
          setIsLoading(false);
        } else {
          // setIsLoading(true);
          setPageIsNotLoading(true)
        }
      })
      .catch((err) => console.error(err));
  }, [token, url]);
  const fetchPosts = (currentPage) => {
    axios
      .get(`${url}/api/favourite/list/?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res?.data?.results);
          setPostsArray(res?.data?.results);
          setPageCount(Math.ceil(res?.data?.count / 5));
          setPostCount(res?.data?.results.length);
          setActivePage(currentPage);
          setIsLoading(false);
        } else {
          // setIsLoading(true);
          setPageIsNotLoading(true)
        }
      })
      .catch((err) => console.error(err));
  };
  // --------------------------------------------------------------------------
  const deleteFav = (postId) => {
    axios
      .delete(`${url}/api/favourite/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          console.log("Delete", res);
          setPostsArray(fetchPosts(activePage));
        } else {
          console.log("Delete error");
        }
      });
  };
      
  // -------------------------------------------------------------------------
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    fetchPosts(currentPage);
    setPageCount(currentPage);
    setActivePage(currentPage);
    setPageIsNotLoading(false)
    setIsLoading(true);
    setPosts([]);
  };
  return (
    <>
      <div className='bg-[#F3F7FC] text-[#1b1b1b] dark:bg-[#1C1C1E] dark:text-white sm:w-[540px] lg:w-[960px] xl:min-w-[1250px] '>
        {token ? (
          <>
            <div className='flex flex-wrap justify-center '>
              {pageCount > 1 && pageIsNotLoading && (
                <div className='text-xl md:text-2xl font-semibold text-center text-black dark:text-white'>
                  Bu səhifədə elan qalmadı, başqa səhifəyə keçin!
                </div>
              )}

              {isLoading && <PostLoader cards={5} />}
              {posts?.map((post, key) => {
                return (
                  <div
                    key={key}
                    className={`${
                      post?.is_favourite === false && "hidden"
                    } w-[220px] min-h-[270px] m-2 rounded-md bg-white dark:bg-[#242426] dark:text-white`}
                  >
                    <div className='relative'>
                      <img
                        className='w-full h-[140px] rounded-md bg-cover bg-center'
                        src={car}
                        alt=''
                      />

                      <label
                        htmlFor={post.id}
                        className='absolute top-2 right-2 '
                      >
                        <input
                          id={post.id}
                          type='checkbox'
                          className='hidden'
                        />
                        <AiFillHeart
                          className='fill-red-500 text-2xl cursor-pointer'
                          onClick={() => {
                            toggleFav(post.id);
                            deleteFav(post.id);
                            notify();
                          }}
                        />
                        <ToastContainer />
                      </label>
                    </div>
                    <div className='text-xl font-bold ml-3 pt-2'>
                      {post?.price} {post?.price_type}
                    </div>
                    <div className='text-base ml-3 '>
                      {post?.brand} {post?.brand_type}
                    </div>
                    <div className='text-base ml-3 '>
                      {post?.year} İl{" , "}
                      {post?.engine_volume / 100} L
                    </div>
                    <div className='text-base ml-3 '>
                      {post?.mileage} {post?.mileage_type}
                    </div>
                    <div className='text-sm ml-3 pb-2 text-gray-400'>
                      {post?.city} {post?.creation_date}
                    </div>
                  </div>
                );
              })}
            </div>
            <ReactPaginate
              previousLabel={<RiArrowLeftSLine />}
              nextLabel={<RiArrowRightSLine />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={`${
                postCount === 0 ? "hidden" : ""
              } flex flex-wrap justify-center items-center mt-2 mb-3`}
              pageClassName={
                "text-base sm:text-xl w-[34px] h-[26px] sm:w-[38px] sm:h-[30px] rounded m-1 border border-[#808080] dark:text-white"
              }
              pageLinkClassName={"flex justify-center items-center"}
              previousClassName={`text-base sm:text-xl mr-1 rounded border border-[#808080] text-[#ea580c] dark:text-[#ffa31a]`}
              previousLinkClassName={`${
                activePage === 1 && "opacity-50 cursor-not-allowed"
              } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
              nextClassName={
                "text-base sm:text-xl ml-1 rounded border border-[#808080] text-[#ea580c] dark:text-[#ffa31a]"
              }
              nextLinkClassName={`${
                activePage === pageCount && "opacity-50 cursor-not-allowed"
              } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
              breakClassName={"text-base sm:text-xl px-2"}
              // breakLinkClassName={"page-link"}
              activeClassName={"bg-[#ffa31a] dark:text-[#1b1b1b]"}
            />

            <div
              className={`${
                postCount > 0 ? "hidden" : ""
              } flex flex-col justify-center items-center`}
            >
              <div className='w-[110px] h-[80px] sm:w-[150px] sm:h-[110px]'>
                <img src={CarFrontSide} alt='' />
              </div>
              <div className='my-2 px-1 text-base sm:text-lg text-center'>
                Heç bir elanı sevimlilərə əlavə etməmisiniz !
              </div>
              <NavLink
                to='/'
                className={
                  "text-white mx-4 bg-green-500 p-1 min-w-20 min-h-8 rounded flex items-center justify-center"
                }
              >
                Sevimlilərə əlavə et
              </NavLink>
            </div>
          </>
        ) : (
          //  -----------------------------------------------------------------------------------------------------------------
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[110px] h-[80px] sm:w-[150px] sm:h-[110px]'>
              <img src={CarFrontSide} alt='' />
            </div>
            <div className='my-2 px-1 text-base sm:text-lg text-center'>
              İstədiyiniz elanı sevimlilərə əlavə etmək üçün daxil olmalısız!
            </div>
            <NavLink
              to='/login'
              className={
                "text-white mx-4 bg-green-500 min-w-20 min-h-8 rounded flex items-center justify-center"
              }
            >
              DAXIL Ol
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}
export default Favourites;
