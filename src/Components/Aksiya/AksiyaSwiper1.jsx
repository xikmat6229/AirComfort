import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import './AksiyaSwiper1.css';
import photo1 from './AksiyaImages/Photo1.png';
import { useNavigate } from 'react-router-dom';

function AksiyaSwiper1() {
    const navigate =useNavigate()

    const goNews =()=>{
        navigate("/news")
    }
    return (
        <section className='Aksiya'>
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
                modules={[Autoplay, Pagination]}
                className="mySwiper2"
            > 
                <SwiperSlide className='Aksiya-slide' onClick={goNews}>
                
                        <img src={photo1} alt="Aksiya Image" />
                    
                </SwiperSlide>
                
                <SwiperSlide className='Aksiya-slide' onClick={goNews}>
                    
                        <img src={photo1} alt="Aksiya Image" />
                    
                </SwiperSlide>
                
            </Swiper>
        </section>
    );
}

export default AksiyaSwiper1;
