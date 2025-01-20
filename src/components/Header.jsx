import slide1 from "../assets/slide/slide1.png";
import slide2 from "../assets/slide/slide2.png";
import slide3 from "../assets/slide/slide3.png";
import slide4 from "../assets/slide/slide4.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const Header = () => {
  return (
    <header data-aos="fade-up" className="mt-20 max-width mb-20 ">
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="max-w-full h-[40rem] rounded-lg overflow-clip">
        <SwiperSlide>
          <div>
            <div className="relative">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/images/8.jpg"
              />
              <div className="absolute top-0 p-4   lg:p-11">
                <p className="text-[#F5A529]">* P R E M I U M</p>
                <h2 className="text-white text-[2rem] lg:text-[3rem] font-bold">
                  Rental Car
                </h2>
                <p>
                  Bentley Bentayga
                  <span className="text-[#F5A529] font-bold text-[1.2rem] pl-2 mt-1">
                    $600/Day
                  </span>
                </p>
                <button className="bg-transparent border-2 border-solid border-[#F5A529] py-3 px-8  text-[#0F0D4F] font-bold rounded-lg mt-4">
                  Available Cars
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="relative">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/images/11.jpg"
              />
              <div className="absolute top-0 p-4   lg:p-11">
                <p className="text-[#F5A529]">* P R E M I U M</p>
                <h2 className="text-white text-[2rem] lg:text-[3rem] font-bold">
                  Rental Car
                </h2>
                <p>
                  Bentley Bentayga
                  <span className="text-[#F5A529] font-bold text-[1.2rem] pl-2 mt-1">
                    $600/Day
                  </span>
                </p>
                <button className="bg-transparent border-2 border-solid border-[#F5A529] py-3 px-8  text-[#0F0D4F] rounded-lg mt-4 font-bold">
                  Available Cars
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="relative">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/images/12.jpg"
              />
              <div className="absolute top-0 p-4   lg:p-11">
                <p className="text-[#F5A529]">* P R E M I U M</p>
                <h2 className="text-white text-[2rem] lg:text-[3rem] font-bold">
                  Rental Car
                </h2>
                <p>
                  Bentley Bentayga
                  <span className="text-[#F5A529] font-bold text-[1.2rem] pl-2 mt-1">
                    $600/Day
                  </span>
                </p>
                <button className="bg-transparent border-2 border-solid border-[#F5A529] py-3 px-8  text-[#0F0D4F] rounded-lg mt-4 font-bold">
                  Available Cars
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="relative">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/images/9.jpg"
              />
              <div className="absolute top-0 p-4   lg:p-11">
                <p className="text-[#F5A529]">* P R E M I U M</p>
                <h2 className="text-white text-[2rem] lg:text-[3rem] font-bold">
                  Rental Car
                </h2>
                <p>
                  Bentley Bentayga
                  <span className="text-[#F5A529] font-bold text-[1.2rem] pl-2 mt-1">
                    $600/Day
                  </span>
                </p>
                <button className="bg-transparent border-2 border-solid border-[#F5A529] py-3 px-8 text-[#0F0D4F] rounded-lg mt-4 font-bold">
                  Available Cars
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </header>
  );
};

export default Header;
