import React from 'react';
import Navbar from '../Navbar/Navbar';
import './AllNews.css'
import delivery from '../AllNews/NewsImages/Delivery.jpg'
import Roll from '../AllNews/NewsImages/Roll.png'
import News from '../Aksiya/News';
import BannerNews from './BannerNews';
import Footer from '../Footer/Footer';

function AllNews(props) {
    return (
        <section className='NEWS'>
            <Navbar/>
            <section className='Delivery'>
              <div className='car'>
              <a href=""><img src={delivery} alt="" /></a>
              <div className="roll-div">
              <li className='roll-li'>
              <img src={Roll} alt="" />
              <img src={Roll} alt="" />
              </li>
              <img src={Roll} alt="" />
              </div>
              </div>
            </section>
           <section className='News-banner'>
             <News/>
             <BannerNews/>
             <Footer/>
           </section>

        </section>
    );
}

export default AllNews;