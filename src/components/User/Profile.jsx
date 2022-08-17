import { useState,useEffect } from "react";
import photo from "../../images/profileImg.png";
import { AiOutlineCamera } from "react-icons/ai";
const Profile = () => {
  const [profileImg, uploadimg] = useState(photo);
  
  const imageHandler = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () =>{
      if(reader.readyState === 2){
        uploadimg(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleChange=(e)=>{
    e.preventDefault();
  }
  let type='password'
  const [show, setShow] = useState(false);
  const [inputType, setType] = useState(type);

  useEffect(() => {
    if (show) {
      setType("password");
    } else if (type === "password") {
      setType("text");
    }
  }, [show,type]);
  return (
    <div className=' min-h-[380px] text-white flex flex-col justify-center items-center'>
      <div className='relative mt-5 lg:mt-8 mb-4 lg:mb-10 '> 
        <img className='w-[100px] h-[100px] bg-cover bg-center rounded' src={profileImg} alt='profile photo'/>
        <input id="input" onChange={imageHandler} className='hidden' type="file" accept='image/*'/>
        <label htmlFor="input">
          <AiOutlineCamera  className='cursor-pointer absolute text-black bg-white text-xl bottom-0 right-0 m-2'/>
          </label>
      </div>
      <form className="relative" onSubmit={handleChange}>
      {/* NAME AND NUMBER */}
      <div className="w-full ">
      <input className="bg-[#1c1c1e] h-[34px] w-full lg:w-64 outline-none border-0 rounded mb-4 mr-4 py-2 px-4" 
      type="text" placeholder="Ad" />
      <input className="bg-[#1c1c1e] h-[34px] w-full lg:w-64 outline-none border-0 rounded mb-4 py-2 px-4" 
      type="text" placeholder="Nömrə"/>
      </div>

      {/* EMAIL AND PASSWORD */}
     <div className="w-full lg:flex">
     <input className="bg-[#1c1c1e] h-[34px]  w-full lg:w-64  outline-none border-0 rounded mb-4 mr-4  py-2 px-4" 
      type="email" placeholder="E-mail"/>
      {/* PASSWORD SHOW ,HIDE */}
      <div className="relative">
      <input className="bg-[#1c1c1e] h-[34px] w-full lg:w-64 outline-none border-0 rounded mb-4 py-2 px-4" 
      type={inputType} placeholder="Şifrə" />
      {type === 'password' &&(
        <button
        type="button"
          onClick={() => setShow(!show)}
          className='absolute h-full flex items-center text-sm font-semibold pr-2 right-0 -top-2 '
        >
          {show ? "Show" : "Hide"}
        </button>
      )}
      </div>
     </div>
      <button className="h-[34px] w-full  bg-green-500 rounded p-1 ">Təsdiqlə</button>
      </form>
    </div>
  );
};

export default Profile;
