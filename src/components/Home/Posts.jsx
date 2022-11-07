import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

// Custom Components
import PostLoader from "../Home/PostLoader";

// React Icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
// React Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Router
import { NavLink } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  setPageCount,
  setActivePage,
  setIsLoading,
  setPageNotLoading,
} from "../../redux/reducers/postSlice";

function Home() {
  const url = process.env.REACT_APP_API_URL;
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pageNotLoading, setPageNotLoading] = useState(false);
  // const [pageCount, setPageCount] = useState(0);
  // const [activePage, setActivePage] = useState(1);

  const token = useSelector((state) => state.auth.value);
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.isLoading);
  const pageNotLoading = useSelector((state) => state.post.pageNotLoading);
  const pageCount = useSelector((state) => state.post.pageCount);
  const activePage = useSelector((state) => state.post.activePage);
  const query=useSelector((state) => state.post.query);

  const dispatch = useDispatch();

  const notify = () =>
    toast.warn("Elanı sevimlilərə elavə etmək üçün səhifəyə daxil olmalısız!");
  const addedNotify = () =>
    toast.success("Elan uğurla sevimlilərə əlavə olundu!");
  const deletedNotify = () =>
    toast.success("Elan uğurla sevilmilərdən silindi!");

  const toggleFav = (postId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    const newFavStatus = !posts[postIndex].is_favourite;

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = {
      ...posts[postIndex],
      is_favourite: newFavStatus,
    };

    // setPosts(updatedPosts);
    dispatch(setPosts(updatedPosts));
  };

  useEffect(() => {
    axios
      .get(
        `${url}/api/post/list?${query}&page=${1}`,
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // setPosts(res.data.results);
          dispatch(setPosts(res.data));
          // setPageCount(Math.ceil(res.data?.count / 20));
          dispatch(setPageCount(Math.ceil(res.data?.count / 20)));
          // setActivePage(1);
          dispatch(setActivePage(1));
          // setIsLoading(false);
          dispatch(setIsLoading(false));
          // setPageNotLoading(false);
          dispatch(setPageNotLoading(false));
        } else {
          // setIsLoading(true);
          dispatch(setIsLoading(true));
          // setPageNotLoading(true);
          dispatch(setPageNotLoading(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  const fetchPosts = (currentPage) => {
    axios
      .get(
        `${url}/api/post/list?${query}&page=${currentPage}`,
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // setPosts(response?.data?.results);
          dispatch(setPosts(response?.data));
          // setPageCount(Math.ceil(response?.data?.count / 20));
          dispatch(setPageCount(Math.ceil(response?.data?.count / 20)));
          // setActivePage(currentPage);
          dispatch(setActivePage(currentPage))
          // setPageNotLoading(false);
          dispatch(setPageNotLoading(false));
          // setIsLoading(false);
          dispatch(setIsLoading(false));
        } else {
          // setIsLoading(true);
          dispatch(setIsLoading(false));
          // setPageNotLoading(true);
          dispatch(setPageNotLoading(true));
        }
      })
      .catch((error) => console.log(error));
  };
  // --------------------------------------------------------------------------
  const postFav = async (postId) => {
    await axios.post(
      `${url}/api/favourite/create/`,
      { post: postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const deleteFav = async (postId) => {
    await axios.delete(`${url}/api/favourite/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // -------------------------------------------------------------------------
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(setIsLoading(true));
    dispatch(setPosts([]));
    fetchPosts(currentPage);
    dispatch(setPageCount(currentPage));
    dispatch(setActivePage(currentPage))
  };
  return (
    <>
      <div
        className={`${
          pageNotLoading && "hidden"
        } flex flex-wrap justify-center `}
      >
        {isLoading && <PostLoader cards={20} />}
        {posts?.results?.map((post, key) => {
          return (
            <div
              key={key}
              onClick={() => {}}
              className='w-[220px] min-h-[270px] m-2 rounded-md bg-white dark:bg-[#242426] dark:text-white'
            >
              <div className='relative'>
                <NavLink
                  to={`/postdetail/${post?.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className='w-full h-[140px] rounded-md bg-cover bg-center'
                    src={post.image}
                    alt=''
                  />
                </NavLink>
                {token ? (
                  <label
                    htmlFor={post.id}
                    className='absolute top-2 right-2 cursor-pointer z-10'
                  >
                    <input id={post.id} type='checkbox' className='hidden' />
                    {post?.is_favourite ? (
                      <AiFillHeart
                        className='fill-red-500 text-2xl'
                        onClick={() => {
                          toggleFav(post.id);
                          deleteFav(post.id);
                          deletedNotify();
                        }}
                      />
                    ) : (
                      <AiOutlineHeart
                        className='text-white text-2xl'
                        onClick={() => {
                          toggleFav(post.id);
                          postFav(post.id);
                          addedNotify();
                        }}
                      />
                    )}
                    <ToastContainer />
                  </label>
                ) : (
                  <div className='text-white absolute top-2 right-2 cursor-pointer'>
                    <AiOutlineHeart onClick={notify} className='text-2xl' />
                    <ToastContainer />
                  </div>
                )}
              </div>
              <NavLink
                to={`/postdetail/${post.id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
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
              </NavLink>
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
          pageNotLoading && "hidden"
        } flex flex-wrap justify-center items-center mt-2 mb-3`}
        pageClassName={
          "text-base sm:text-xl w-[34px] h-[26px] sm:w-[38px] sm:h-[30px] rounded m-1 bg-white dark:text-white dark:bg-[#151515]"
        }
        pageLinkClassName={"flex justify-center items-center"}
        previousClassName={`text-base sm:text-xl mr-1 rounded border border-[#808080] bg-[#f90]`}
        previousLinkClassName={`${
          activePage === 1 && "opacity-50 cursor-not-allowed"
        } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
        nextClassName={
          "text-base sm:text-xl ml-1 rounded border border-[#808080] bg-[#f90]"
        }
        nextLinkClassName={`${
          activePage === pageCount && "opacity-50 cursor-not-allowed"
        } flex justify-center items-center w-[32px] h-[24px] sm:w-[36px] sm:h-[28px]`}
        breakClassName={"text-base sm:text-xl px-2"}
        // breakLinkClassName={"page-link"}
        activeClassName={"border-2 border-[#f90]"}
      />

      {pageNotLoading && (
        <div className='flex flex-col items-center justify-center'>
          <div className='font-bold text-xl text-center mb-2'>
            Postlar yüklənə bilmədi,səhifəni yeniləyin!
          </div>
          <button
            onClick={() => window.location.reload()}
            className='bg-green-500 rounded py-1 px-2 '
          >
            Səhifəni yenilə
          </button>
        </div>
      )}
    </>
  );
}
export default Home;
