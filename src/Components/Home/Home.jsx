import React from 'react';
import './Home.css'
import NavbarAnimation from '../Navbar/NavbarAnimation';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import BrandLogos from '../Search/BrandLogos.jsx/BrandLogos';
import AksiyaSwiper1 from '../Aksiya/AksiyaSwiper1';
import Products from '../Products/Products';
import News from '../Aksiya/News';
import Contact from '../Contact/Contact';
import PopularProdacts from '../Prodacts/PopularProdacts/PopularProdacts';
import Footer from '../Footer/Footer';
function Home(props) {
  return (
    
       <div className='HOME'>
      <NavbarAnimation/>
       <Navbar/>
       <BrandLogos/>
       <AksiyaSwiper1/>
       <div className="home-container">
       <Products/>
       <PopularProdacts/>
       <News/>
       <Contact/>
       <Footer/>
       </div>
    </div>
  );
}

export default Home;