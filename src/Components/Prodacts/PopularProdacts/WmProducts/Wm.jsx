import React, { useEffect, useState } from 'react';
import './Wm.css';
import Modal from '../../../Modal/Modal';


const WmCard = ({ washingMachine, addToCart, addToSaved, OpenModal }) => {
    return (
        <div className="wm-card" > {/* Pass washing machine to OpenModal */}
            <li className='wm-li-img'>
                <img src={washingMachine.imgUrl || wmImage} alt={washingMachine.name} className="ac-image" onClick={() => OpenModal(washingMachine)} />
                <button 
                    className="save-button" 
                    onClick={(e) => { e.stopPropagation(); addToSaved(washingMachine); }} 
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
                    onClick={(e) => { e.stopPropagation(); addToCart(washingMachine); }} 
                    role="button" 
                    aria-label={`Add ${washingMachine.name} to cart`}
                    style={{ cursor: 'pointer' }}
                ></i>
            </ul>
        </div>
    );
};

const Wm = () => {
    const [wmList, setWmList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
    const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('savedItems')) || []);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const OpenModal = (washingMachine) => {
        setShow(true);
        setSelectedProduct(washingMachine);
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
        const fetchWmData = async () => {
            try {
                const response = await fetch('http://localhost:3000/MyShop');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setWmList(data.filter(item => item.type === 'Wm'));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWmData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="WM">
            <h6>Washing Machines</h6>
            <div className="wmSection-container">
                {wmList.map(washingMachine => (
                    <WmCard 
                        key={washingMachine.id} 
                        washingMachine={washingMachine} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} 
                        OpenModal={OpenModal} // Pass OpenModal to WmCard
                    />
                ))}
            </div>
            {show && selectedProduct && (<Modal ac={selectedProduct} Close={CloseModal} />)}
        </div>
    );
};

export default Wm;
