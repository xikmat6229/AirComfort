import React, { useEffect, useState } from 'react';
import './PhoneSection.css';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';

const PhoneCard = ({ phone, addToCart, addToSaved, openModal }) => {
    return (
        <div className="phone-card"> {/* Opens modal on card click */}
            <li className='phone-li-img'>
                <img src={phone.imgUrl || phone.url} alt={phone.name} className="phone-image"  onClick={() => openModal(phone)}/>
                <button 
                    className="save-button" 
                    onClick={(e) => { e.stopPropagation(); addToSaved(phone); }} // Prevent modal on save click
                    aria-label={`Save ${phone.name}`}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            </li>
            <ul className='phone-li-text'>
                <li>
                    <h3>{phone.name}</h3>
                    <p>Price: ${phone.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus" 
                    onClick={(e) => { e.stopPropagation(); addToCart(phone); }} // Prevent modal on cart click
                    role="button" 
                    aria-label={`Add ${phone.name} to cart`}
                    style={{ cursor: 'pointer' }}
                ></i>
            </ul>
        </div>
    );
};

const PhoneSection = () => {
    const navigate = useNavigate();
    const [phoneList, setPhoneList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedItems;
    });
    const [saved, setSaved] = useState(() => {
        const storedSaved = JSON.parse(localStorage.getItem('savedItems')) || [];
        return storedSaved;
    });

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(null);

    const openModal = (phone) => {
        setShowModal(true);
        setSelectedPhone(phone);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPhone(null);
    };

    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            const updatedCart = [...cart, item];
            setCart(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            alert(`${item.name} karzinaga qo'shildi!`);
        } else {
            alert(`${item.name} karzinada allaqachon bor!`);
        }
    };

    const addToSaved = (item) => {
        if (!saved.some(savedItem => savedItem.id === item.id)) {
            const updatedSaved = [...saved, item];
            setSaved(updatedSaved);
            localStorage.setItem('savedItems', JSON.stringify(updatedSaved));
            alert(`${item.name} saved listga qo'shildi!`);
        } else {
            alert(`${item.name} saved listda allaqachon bor!`);
        }
    };

    const fetchPhoneData = async () => {
        try {
            const response = await fetch('http://localhost:3000/MyShop');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filteredData = data.filter(item => item.type === 'Phone');
            setPhoneList(filteredData);
        } catch (error) {
            console.error('Error fetching phone data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhoneData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                Error: {error} 
                <button onClick={fetchPhoneData}>Retry</button>
            </div>
        );
    }

    return (
        <div className="phone-section">
            <Navbar />
            <h6>Phone Section</h6>
            <button className='phone-back' onClick={() => navigate("/")}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="phoneSection-container">
                {phoneList.map((phone) => (
                    <PhoneCard 
                        key={phone.id} 
                        phone={phone} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} 
                        openModal={openModal} // Pass modal open function
                    />
                ))}
            </div>
            {showModal && selectedPhone && (
                <Modal ac={selectedPhone} Close={closeModal} /> // Pass selected phone to modal
            )}
            <Footer />
        </div>
    );
};

export default PhoneSection;
