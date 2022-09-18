import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../../style/slider.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useSelector } from "react-redux";
export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images=useSelector(state=>state.post.postDetailImages)

  return (
    <>
      <div className="w-full lg:w-[544px] xl:w-[830px]">
       <div className="h-[300px] sm:h-[400px] lg:h-[322px] xl:h-[490px]">
       <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='w-full h-full'
        >
            {images.map((image, index) =>{
              return(
                <SwiperSlide className="rounded relative bg-white dark:bg-[#202022]" key={index}>
                  <img className="w-11/12 h-full bg-center bg-contain object-contain transition " src={image} alt=''/>
                  <div className="absolute bottom-3 right-12 bg-[#BDBEC0] text-white text-xl rounded px-3">CAR.AZ</div>
                </SwiperSlide>
              )
              })}
        </Swiper>
       </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          // loop={true}
          // spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='h-1/5 w-full bg-white dark:bg-[#202022] mt-6 pl-5 hidden lg:block'
        >
                 {images.map((image, index) =>{
              return(
                <SwiperSlide className="mr-5 mt-5 w-[130px] h-[76px] rounded" key={index}>
                  <img className="w-full h-full object-fill transition brightness-75" src={image} alt=''/>
                </SwiperSlide>
              )
              })}
        </Swiper>
      </div>
    </>
  );
}
