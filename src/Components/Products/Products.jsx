import React from 'react';
import wm from './ProductsImages/wm.png'
import phone from './ProductsImages/phone.png'
import ac from './ProductsImages/ac.png'
import fridge from './ProductsImages/fridge.png'
import cooker from './ProductsImages/cooker.png'
import vc from './ProductsImages/vc.png'
import tv from './ProductsImages/tv.png'
import iron from './ProductsImages/iron.png'
import blender from './ProductsImages/blender.png'
import './Products.css'
import { useNavigate } from 'react-router-dom';
function Products(props) {
  const navigate =useNavigate()

  const goWm=()=>{
    navigate("/Washing-Machine")
   
  }
  const goFridge=()=>{
    navigate("/Fridge")
  }
  const goAC=()=>{
    navigate("/Ac")
  }
  const goPhone=()=>{
    navigate("/Phone")
  }
    return (
      <section className='Products'>
       <div className="products-container">
       <div className='wm' onClick={goWm}><img src={wm} alt="" /><p>Washing Machines</p></div>
        <div className='phone' onClick={goPhone}><img src={phone} alt="" /><p>Phones</p></div>
        <div className='ac' onClick={goAC}><img src={ac} alt="" /><p>Air Conditioners</p></div>
        <div className='fridge' onClick={goFridge}><img src={fridge} alt="" /><p>Fridges</p></div>
        <div className='cooker'><img src={cooker} alt="" /><p>Cookers</p></div>
        <div className='vc'><img src={vc} alt="" /><p>VC</p></div>
        <div className='tv'><img src={tv} alt="" /><p>TV</p></div>
        <div className='iron'><img src={iron} alt="" /><p>Irons</p></div>
        <div className='blender'><img src={blender} alt="" /><p>Blenders</p></div>
       </div>

        

      </section>
    );
}

export default Products;