import React, { useEffect, useState } from 'react';
import './Ac.css'; 
import Modal from '../../../Modal/Modal'; // Make sure the path is correct

const AcCard = ({ ac, addToCart, OpenModal }) => {
    return (
        <div className="ac-card"> 
            <div className='ac-li-img'>
                <img src={ac.imgUrl || acImage} alt={ac.name} className="ac-image"  onClick={() => OpenModal(ac)} />
                <button ><i className="fa-regular fa-heart"></i></button>
            </div>
            <ul className='ac-li-text'>
                <li>
                    <h3>{ac.name}</h3>
                    <p>Price: ${ac.price}</p>
                </li>
                <li>
                    <i 
                        className="fa-solid fa-cart-plus" 
                        onClick={(e) => { e.stopPropagation(); addToCart(ac); }} // Prevent modal on cart click
                    ></i>
                </li>
            </ul>
        </div>
    );
};

const Ac = () => {
    const [acList, setAcList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedItems;
    });
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedAc, setSelectedAc] = useState(null);

    // Function to open the modal
    const OpenModal = (ac) => {
        setSelectedAc(ac);
        setShowModal(true);
    };

    // Function to close the modal
    const CloseModal = () => {
        setShowModal(false);
        setSelectedAc(null);
    };

    // Function to add product to the cart
    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) { // Prevent duplicate additions
            const updatedCart = [...cart, item]; // Update cart
            setCart(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save products to local storage
            alert(`${item.name} added to cart!`);
        } else {
            alert(`${item.name} is already in the cart!`);
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
                
                // Filter only 'Ac' type objects
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
        <div className="AC">
            <h6>Air Conditioners</h6>
            <div className="ac-container">
                {acList.map((ac) => (
                    <AcCard key={ac.id} ac={ac} addToCart={addToCart} OpenModal={OpenModal} />
                ))}
            </div>
            {showModal && selectedAc && (
                <Modal ac={selectedAc} Close={CloseModal} /> // Render modal if conditions are met
            )}
        </div>
    );
};

export default Ac;
