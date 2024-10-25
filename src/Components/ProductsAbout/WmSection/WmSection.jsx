import React, { useEffect, useState } from 'react';
import './WmSection.css';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal'; // Import the Modal component

const WmCard = ({ washingMachine, addToCart, addToSaved, openModal }) => {
    return (
        <div className="wm-card"> {/* Opens modal on card click */}
            <li className='wm-li-img'>
                <img src={washingMachine.imgUrl || 'default-image.jpg'} alt={washingMachine.name} className="ac-image" 
                 onClick={() => openModal(washingMachine)}/>
                <button 
                    className="save-button" 
                    onClick={(e) => { e.stopPropagation(); addToSaved(washingMachine); }} // Prevent modal on save click
                    aria-label={`Save ${washingMachine.name}`}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            </li>
            <ul className='wm-li-text'>
                <li>
                    <h3>{washingMachine.name}</h3>
                    <p>Price: ${washingMachine.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus" 
                    onClick={(e) => { e.stopPropagation(); addToCart(washingMachine); }} // Prevent modal on cart click
                    role="button" 
                    aria-label={`Add ${washingMachine.name} to cart`}
                    style={{ cursor: 'pointer' }}
                ></i>
            </ul>
        </div>
    );
};

const WmSection = () => {
    const navigate = useNavigate();
    const [wmList, setWmList] = useState([]);
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
    const [selectedWm, setSelectedWm] = useState(null);

    const openModal = (washingMachine) => {
        setShowModal(true);
        setSelectedWm(washingMachine);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedWm(null);
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

    const fetchWmData = async () => {
        try {
            const response = await fetch('http://localhost:3000/MyShop');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filteredData = data.filter(item => item.type === 'Wm');
            setWmList(filteredData);
        } catch (error) {
            console.error('Error fetching WM data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWmData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                Error: {error} 
                <button onClick={fetchWmData}>Retry</button>
            </div>
        ); 
    }

    const Back = () => {
        navigate("/");
    };

    return (
        <div className="WM-section">
            <Navbar />
            <h6>Washing-Machines Section</h6>
            <button className='wm-back' onClick={Back} aria-label="Go back to the main page">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="wm-container">
                {wmList.map((washingMachine) => (
                    <WmCard 
                        key={washingMachine.id} 
                        washingMachine={washingMachine} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} 
                        openModal={openModal} // Pass modal open function
                    />
                ))}
            </div>
            {showModal && selectedWm && (
                <Modal ac={selectedWm} Close={closeModal} /> // Pass selected washing machine to modal
            )}
            <Footer />
        </div>
    );
};

export default WmSection;
