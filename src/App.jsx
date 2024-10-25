import {Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import OllProdocts from './Components/Prodacts/OllProdocts';
import AllNews from './Components/AllNews/AllNews';
import Contact from './Components/Contact/Contact';
import WmSection from './Components/ProductsAbout/WmSection/WmSection';
import FridgeSection from './Components/ProductsAbout/FridgeSection/FridgeSection';
import AcSection from './Components/ProductsAbout/AcSection/AcSection';
import Karzina from './Components/Karzina/Karzina';
import Phone from './Components/Prodacts/Phone/Phone';
import PhoneSection from './Components/ProductsAbout/PhoneSection/PhoneSection';
import Saved from './Components/Saved/Saved';
import Compain from './Components/Compain/Compain';

function App() {
 
  return (
   
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='products' element={<OllProdocts/>} />
        <Route path='news' element={<AllNews/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='Washing-Machine' element={<WmSection/>} />
        <Route path='Fridge' element={<FridgeSection/>} />
        <Route path='Ac' element={<AcSection/>} />
        <Route path='Phone' element={<PhoneSection/>} />
        <Route path='Karzina' element={<Karzina/>} />
        <Route path='Saved' element={<Saved/>} />
        <Route path='Compain' element={<Compain/>} />
      </Routes>
   
  );
}

export default App;
