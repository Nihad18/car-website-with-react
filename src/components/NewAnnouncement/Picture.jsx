import React, { useState,useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedImages } from "../../redux/reducers/imageSlice";
import { setFile } from "../../redux/reducers/fileSlice";
import photo from '../../images/profileImg.png'
const Picture = () => {
  // const imageHandler = (e) => {
  //   e.preventDefault()
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   reader.onload = () =>{
  //     if(reader.readyState === 2){
  //       setSelectedImages(reader.result)
  //     }
  //   }
  //   reader.readAsDataURL(file)
  // }
  // const imgRef=useRef()
  // const deleteImg=()=>{
  //   setSelectedImages(photo)
  //   imgRef.current=null
  // }
  const [style, setStyle] = useState({ transform: "rotate(0deg)" });
  const [count, setCount] = useState(1);
  const rotateLeft = () => {
    setCount(count - 1);
    setStyle({ transform: `rotate(${count * 90}deg)` });
    setCount(count + 1);
  };
  const rotateRight = () => {
    setCount(count + 1);
    setStyle({ transform: `rotate(${count * 90}deg)` });
    setCount(count - 1);
  };

  const dispatch=useDispatch()
  const selectedImages=useSelector(state=>state.selectedImages.value)
  const file=useSelector(state=>state.file.value)
  // const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    // setSelectedImages([...imagesArray]);
    dispatch(setSelectedImages([...selectedImages, ...imagesArray]))
    dispatch(setFile(selectedFiles))
  };
  function deleteHandler(image) {
    // setSelectedImages(selectedImages.filter((e) => e !== image));
    dispatch(setSelectedImages(selectedImages.filter((e) => e !== image)));
    URL.revokeObjectURL(image);
  }
  const arr = [];
  const miniArr=[]
  for (let i = 3; i < selectedImages.length; i++) {
    arr.push(selectedImages[i]);
  }
  for (let i=0;i<3;i++){
    miniArr.push(selectedImages[i])
  }
  const ref=useRef()
  // useEffect(() => {
  //   console.log('-------------------------------------------------------------------------')
  //   console.log("selectedImages : ",selectedImages)
  //   console.log("image`s current src : ",ref.current.src)
  //   console.log('-------------------------------------------------------------------------')
  // }, [selectedImages]);
  return (
    <div className='px-2 flex flex-wrap'>
      <div className='flex px-2'>
        {
          miniArr.map((image,index)=>{
            return(
              <label key={index}>
              <input  className='hidden' onChange={onSelectFile} type='file' accept='image/*' />
            <img ref={ref}
              src={image ? image : photo}
              className={`w-[100px] h-[100px] bg-cover bg-center rounded`}
              />
              {index+1}
              <div onClick={(e) => e.preventDefault()}>
                        <button
                          className='bg-red-500 rounded p-1 mt-1'
                          onClick={() => deleteHandler(image)}
                        >
                          delete image
                        </button>
                      </div>
              </label>
            )
          })
        }
        {" "}
        {/* -----1------- */}
        {/* <label>
          <input  className='hidden' onChange={onSelectFile} multiple type='file' accept='image/*' />
        <img
          src={selectedImages[0] ? selectedImages[0] : photo}
          className={`w-[100px] h-[100px] bg-cover bg-center rounded`}
          />
          1
          <div onClick={(e) => e.preventDefault()}>
                    <button
                      className='bg-red-500 rounded p-1 mt-1'
                      onClick={() => deleteHandler(selectedImages[0])}
                    >
                      delete image
                    </button>
                  </div>
          </label> */}
          {/* -----2-------- */}
          {/* <label>
          <input  className='hidden' onChange={onSelectFile} multiple type='file' accept='image/*' />
        <img
         src={selectedImages[1] ? selectedImages[1] : photo}
          className={`w-[100px] h-[100px] bg-cover bg-center rounded`}
          />
          1
          <div onClick={(e) => e.preventDefault()}>
                    <button
                      className='bg-red-500 rounded p-1 mt-1'
                      onClick={() => deleteHandler(selectedImages[1])}
                    >
                      delete image
                    </button>
                  </div>
          </label> */}
          {/* ----3-------- */}
          {/* <label>
          <input  className='hidden' onChange={onSelectFile} multiple type='file' accept='image/*' />
        <img
          src={selectedImages[2] ? selectedImages[2] : photo}
          className={`w-[100px] h-[100px] bg-cover bg-center rounded`}
          />
          1
          <div onClick={(e) => e.preventDefault()}>
                    <button
                      className='bg-red-500 rounded p-1 mt-1'
                      onClick={() => deleteHandler(selectedImages[2])}
                    >
                      delete image
                    </button>
                  </div>
          </label> */}
      </div>

      <div className='flex mt-3'>
        {arr &&
          arr.map((image, index) => {
            return (
              <div key={index}>
                <img
                  style={style}
                  src={image}
                  alt='upload'
                  className={`w-[100px] h-[100px] bg-cover bg-center rounded`}
                />
                <div>
                  <div onClick={(e) => e.preventDefault()}>
                    <button
                      className='bg-red-500 rounded p-1 mt-1'
                      onClick={() => deleteHandler(image)}
                    >
                      delete image
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <label className='border w-[100px] h-[100px]'>
        add
        <input
          className='hidden'
          onChange={onSelectFile}
          multiple
          type='file'
          accept='image/*'
        />
      </label>
      {/* <label  className="select-none flex flex-col items-center justify-center cursor-pointer border border-gray-400 hover:border-blue-400 ">
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
      } */}
    </div>
  );
};

export default Picture;
