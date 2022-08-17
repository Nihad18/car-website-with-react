// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";
// import maserati from "../download.jpeg"
import { useState, useEffect } from "react";
import Search from "../components/Home/Search";
function Home() {

  return (
    <div className='bg-[#F3F7FC] dark:bg-[#1C1C1E]'>
      {/* <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src={maserati} alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={maserati} alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={maserati} alt='' />
        </SwiperSlide>
      </Swiper> */}

      
      {/* <Search/> */}

    </div>
  );
}
export default Home;
