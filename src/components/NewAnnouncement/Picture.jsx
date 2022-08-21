import React,{useState,useRef} from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {FiRotateCcw,FiRotateCw} from "react-icons/fi";
// import {useSelector,useDispatch} from 'react-redux'
// import { setSelectedImages } from '../../redux/reducers/imageSlice';
// import photo from '../../images/profileImg.png'
const Picture = ({photo,text}) => {
  const [selectedImages, setSelectedImages] = useState(photo);
  // const dispatch = useDispatch();
  // const selectedImages = useSelector(state => state.selectedImages.value);
  const imageHandler = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () =>{
      if(reader.readyState === 2){
        setSelectedImages(reader.result)
      //  dispatch(setSelectedImages(reader.result))
      }
    }
    reader.readAsDataURL(file)
  }
  const imgRef=useRef()
  const deleteImg=()=>{
    imgRef.current=null
    setSelectedImages(photo)
    // dispatch(setSelectedImages(photo))
  }
  const [style, setStyle] = useState({transform: 'rotate(0deg)'});
  const [count,setCount]=useState(1)
   const rotateLeft=()=>{
     setCount(count-1)
     setStyle( {transform:`rotate(${count*90}deg)`} )
     setCount(count+1)
      }
  const rotateRight=()=>{
    setCount(count+1)
    setStyle( {transform:`rotate(${count*90}deg)`})
    setCount(count-1)
  }
  
  return (
    <div className='px-2'>
    <label  className="select-none flex flex-col items-center justify-center cursor-pointer border border-gray-400 hover:border-blue-400 ">
      <img
       style={selectedImages!==photo ? style : null}  
       className={`${selectedImages===photo ? 'w-[60px] h-[60px] mx-4 mt-4' : 'w-[100px] h-[100px]'} bg-cover bg-center rounded`} src={selectedImages ? selectedImages : photo} alt='car'/>
      <input onChange={imageHandler} className='hidden' type="file" accept='image/*'/>
      <span className={`${selectedImages===photo ? '' : 'hidden'} 'mx-4 mb-2`}>{text}</span>
      </label>
      {
        selectedImages!==photo && 
        <div className="flex justify-between items-center">
          <AiOutlineClose onClick={deleteImg} className="cursor-pointer text-red-500"/>
          <div className="flex">
            <FiRotateCcw onClick={rotateLeft} className="cursor-pointer mr-1"/>
            <FiRotateCw onClick={rotateRight} className="cursor-pointer"/>
          </div>
          </div>
      }
    </div>
  )
}

export default Picture;