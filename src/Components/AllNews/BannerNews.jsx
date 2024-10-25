import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Banners.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import VrBanner from '../AllNews/NewsImages/VrBanner.jpg'
import WmBanner from '../AllNews/NewsImages/WmBanner.jpg'




function BannerNews() {
    return (
        <section className='Banners'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: true,
                }}

                pagination={{
                    clickable: true,
                  }}
                modules={[Autoplay,Pagination,Navigation]}
                className="mySwiper"
                > 

             <SwiperSlide className='One-banner'>
                <a href=""><img src={WmBanner} alt="" /></a>
                <a href=""><img src={VrBanner} alt="" /></a>
             </SwiperSlide>
             <SwiperSlide className='One-banner'>
                <a href=""><img src={WmBanner} alt="" /></a>
                <a href=""><img src={VrBanner} alt="" /></a>
             </SwiperSlide>

            

             </Swiper>
        </section>
    );
}

export default BannerNews;
