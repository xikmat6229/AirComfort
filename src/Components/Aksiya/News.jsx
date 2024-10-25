import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import './News.css'
import photo2 from './AksiyaImages/Phone2.png'
import photo1 from './AksiyaImages/Photo1.png'
import { useNavigate } from 'react-router-dom';

function News() {
    const navigate =useNavigate()

    const goNews =()=>{
        navigate("/news")
    }
    return (
        <section className='News'>
            <h1>News</h1>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}

                pagination={{
                    clickable: true,
                  }}
                modules={[Autoplay,Pagination,Navigation]}
                className="mySwiper"
                > 

           <SwiperSlide className='News-Slide' onClick={goNews}><img src={photo2} alt="" /></SwiperSlide>
           <SwiperSlide className='News-Slide' onClick={goNews}><img src={photo2} alt="" /></SwiperSlide>

            

             </Swiper>
        </section>
    );
}

export default News;
