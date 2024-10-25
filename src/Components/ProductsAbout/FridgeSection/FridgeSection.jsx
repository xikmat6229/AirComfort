import React, { useEffect, useState } from 'react';
import './FridgeSection.css';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';

const FridgeCard = ({ fridge, addToCart, addToSaved, OpenModal }) => {
    return (
        <div className="fridge-card" > {/* Card opens modal on click */}
            <li className='fridge-li-img'>
                <img src={fridge.imgUrl || 'default-image.jpg'} alt={fridge.name} className="fridge-image" onClick={() => OpenModal(fridge)} />
                <button 
                    className="save-button" 
                    onClick={(e) => { e.stopPropagation(); addToSaved(fridge); }} // Prevent modal on save click
                    aria-label={`Save ${fridge.name}`}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            </li>
            <ul className='fridge-li-text'>
                <li>
                    <h3>{fridge.name}</h3>
                    <p>Price: ${fridge.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus" 
                    onClick={(e) => { e.stopPropagation(); addToCart(fridge); }} // Prevent modal on cart click
                    role="button" 
                    aria-label={`Add ${fridge.name} to cart`}
                ></i>
            </ul>
        </div>
    );
};

const FridgeSection = () => {
    const navigate = useNavigate();
    const [fridgeList, setFridgeList] = useState([]);
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
    const [selectedProduct, setSelectedProduct] = useState(null);

    const OpenModal = (fridge) => {
        setShowModal(true);
        setSelectedProduct(fridge);
    };

    const CloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
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

    useEffect(() => {
        const fetchFridgeData = async () => {
            try {
                const response = await fetch('http://localhost:3000/MyShop');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(item => item.type === 'Fridge');
                setFridgeList(filteredData);
            } catch (error) {
                console.error('Error fetching Fridge data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFridgeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    const goBack = () => {
        navigate("/"); // Asosiy sahifaga qaytish
    };

    return (
        <div className="fridge-section">
            <Navbar />
            <h6>Fridge Section</h6>
            <button className='fridge-back' onClick={goBack}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="fridgeSection-container">
                {fridgeList.map((fridge) => (
                    <FridgeCard 
                        key={fridge.id} 
                        fridge={fridge} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} 
                        OpenModal={OpenModal} // Modal open function
                    />
                ))}
            </div>
            {showModal && selectedProduct && (
                <Modal ac={selectedProduct} Close={CloseModal} /> // Pass selected fridge to modal
            )}
            <Footer />
        </div>
    );
};

export default FridgeSection;
