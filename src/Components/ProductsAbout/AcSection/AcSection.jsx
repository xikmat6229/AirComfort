import React, { useEffect, useState } from 'react';
import './AcSection.css';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';

const AcCard = ({ ac, addToCart, addToSaved, OpenModal }) => {
    return (
        <div className="ac-card" onClick={()=> OpenModal(ac)}>
            <li className='ac-li-img'>
                <img src={ac.imgUrl || ac.url} alt={ac.name} className="ac-image" />
                <button onClick={() => addToSaved(ac)}>
                    <i className="fa-regular fa-heart"></i>
                </button> 
            </li>

            <ul className='ac-li-text'>
                <li>
                    <h3>{ac.name}</h3>
                    <p>Price: ${ac.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus" 
                    onClick={() => addToCart(ac)}
                ></i>
            </ul>
        </div>
    );
};

const AcSection = () => {
    const navigate = useNavigate();
    const [acList, setAcList] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const OpenModal = (ac) => {
        setShow(true);
        setSelectedProduct(ac);
    };

    const CloseModal = () => {
        setShow(false);
        setSelectedProduct(null);
    };

    const [cart, setCart] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedItems;
    });

    const [saved, setSaved] = useState(() => {
        const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        return savedItems;
    });

    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            const updatedCart = [...cart, item];
            setCart(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            alert(`${item.name} karzinaga qo'shildi!`);
        } else {
            alert(`${item.name} allaqachon karzinada mavjud!`);
        }
    };

    const addToSaved = (item) => {
        if (!saved.some(savedItem => savedItem.id === item.id)) {
            const updatedSaved = [...saved, item];
            setSaved(updatedSaved);
            localStorage.setItem('savedItems', JSON.stringify(updatedSaved));
            alert(`${item.name} savedga qo'shildi!`);
        } else {
            alert(`${item.name} allaqachon savedda mavjud!`);
        }
    };

    useEffect(() => {
        const fetchAcData = async () => {
            try {
                const response = await fetch('http://localhost:3000/MyShop');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(item => item.type === 'Ac');
                setAcList(filteredData);
            } catch (error) {
                console.error('Error fetching AC data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAcData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="ac-section">
            <Navbar />
            <h6>Air Conditioner Section</h6>
            <button className='ac-back' onClick={() => navigate("/")}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="acSection-container">
                {acList.map((ac) => (
                    <AcCard 
                        key={ac.id} 
                        ac={ac} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved}
                        OpenModal={OpenModal} 
                    />
                ))}
            </div>
            {show && selectedProduct && (<Modal ac={selectedProduct} Close={CloseModal} />)}
            <Footer />
        </div>
    );
};

export default AcSection;
