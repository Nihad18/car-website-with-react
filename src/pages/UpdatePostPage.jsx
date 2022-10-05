import { useState, useEffect, useRef } from "react";
import Input from "../components/NewPost/Input";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

const UpdatePostPage = () => {
    const postId = useSelector((state) => state.post.postId);
    
    const [postDetail,setPostDetail]= useState({})
    const [brandValue, setBrandValue] = useState(null);
    const [brands, setBrands] = useState([]);
    const [values, setValues] = useState({
      priceValue: postDetail.price ,
    });

    // ----------------------------------------------------------
    useEffect(() => {
      async function fetchDetails(){
       const {data}= await axios.get(`/api/post/update-delete/${postId}`,
           token && {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           })
      setPostDetail(data)
       }
      fetchDetails()
  }, []);

    let formData = new FormData();
    formData.append("brand", values.brandValue);
    formData.append("price", values.priceValue);
    const token = useSelector((state)=>state.auth.value)
    const postCarData =async (e) => {
      e.preventDefault();
      const url = `/api/post/update-delete/${postId}`;
      const post = await axios.patch(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });
    }; 
  return (
    <>
      <div
        className='hidden lg:flex flex-col min-h-screen w-full sm:w-[540px] pt-6 pl-6 pr-6 mx-auto
    bg-white dark:bg-[#1c1c1e] text-black dark:text-white lg:min-w-[960px]'
      >
        <div className=''>Yeni elan yerləşdirin</div>
        <form
          onSubmit={postCarData}
          className=' flex w-full justify-between flex-wrap'
        >
          <Input
            name={"Marka :"}
            options={brands}
            placeholder={"Marka"}
            value={brandValue}
            defaultValue={brandValue}
            onChange={setBrandValue}
          />
          
          {/* PRICE */}
          <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Qiymət :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values?.priceValue}
                defaultValue={values?.priceValue}
                onChange={(e) => setValues({...values, priceValue: e.target.value })}
                type='number'
                placeholder='0'
                min='0'
                className='max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />
            </div>
          </div>
          {/* -------------------- */}
          <button className={`p-1 bg-red-500`}>Elanı paylaş</button>
        </form>
      </div>
    </>
  )
}

export default UpdatePostPage