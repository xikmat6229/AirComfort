import React, { useEffect, useState } from 'react';
import './Fridge.css';
import Modal from '../../../Modal/Modal'; // Make sure the path is correct

const FridgeCard = ({ fridge, addToCart, addToSaved, OpenModal }) => {
    return (
        <div className="fridge-card">
            <li className='fridge-li-img'>
                <img 
                    src={fridge.imgUrl} 
                    alt={fridge.name} 
                    className="fridge-image" 
                    onClick={() => OpenModal(fridge)} 
                />
                <button 
                    className="save-button" 
                    onClick={(e) => { e.stopPropagation(); addToSaved(fridge); }} 
                    aria-label={`Save ${fridge.name}`}>
                    <i className="fa-regular fa-heart fridge-heart-icon"></i>
                </button>
            </li>
            <ul className='fridge-li-text'>
                <li>
                    <h3>{fridge.name}</h3>
                    <p>Price: ${fridge.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus fridge-cart-icon" 
                    onClick={(e) => { e.stopPropagation(); addToCart(fridge); }} 
                    role="button" 
                    aria-label={`Add ${fridge.name} to cart`}
                    style={{ cursor: 'pointer' }}
                ></i>
            </ul>
        </div>
    );
};

const Fridge = () => {
    const [fridgeList, setFridgeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
    const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('savedItems')) || []);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const OpenModal = (fridge) => {
        setShow(true);
        setSelectedProduct(fridge);
    };

    const CloseModal = () => {
        setShow(false);
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
                // Faqat type 'Fridge' bo'lganlarni filtrlash
                const filteredFridges = data.filter(product => product.type === 'Fridge');
                setFridgeList(filteredFridges); 
            } catch (error) {
                console.error('Error fetching fridge data:', error);
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

    return (
        <div className="Fridge">
            <h6>Fridges</h6>
            <div className="fridge-container">
                {fridgeList.map(fridge => (
                    <FridgeCard 
                        key={fridge.id} 
                        fridge={fridge} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} 
                    />
                ))}
            </div>
            {show && selectedProduct && (
                <Modal 
                    fridge={selectedProduct} 
                    close={CloseModal} 
                />
            )}
        </div>
    );
};

export default Fridge;
