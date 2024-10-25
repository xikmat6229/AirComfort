import React from 'react';
import brandLogos from '../BrandLogos.jsx/BrandLogos.png'
import './Brand.css'
function BrandLogos() {
    return (
        <section className='BrandLogos'>
            <img src={brandLogos} alt="" />
        </section>
    );
}

export default BrandLogos;