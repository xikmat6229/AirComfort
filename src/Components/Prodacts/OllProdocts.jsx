import { useEffect, useState } from 'react';
import PopularProdacts from './PopularProdacts/PopularProdacts';
import Wm from './PopularProdacts/WmProducts/Wm';
import Fridge from './PopularProdacts/Fridge/Fridge';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Ac from './PopularProdacts/Ac/Ac';
import Phone from './Phone/Phone';


function App() {
 

  return (
    <section>
         <Navbar/>
        <PopularProdacts/>
        <Ac/>
        <Phone/>
        <Wm/>
        <Fridge/>
        <Footer/>
    
    </section>
  );
}

export default App;
