import React, { useEffect, useState } from 'react';
import './Popular.css'; 
import Modal from '../../Modal/Modal';

const PopularCard = ({ popular, addToCart, OpenModal }) => {
    return (
        <div className="popular-card" > {/* Pass popular product to OpenModal */}
            <li className='popular-li-img'>
                <img src={popular.imgUrl || popular.url} alt={popular.name} className="popular-image" onClick={() => OpenModal(popular)} />
                <i className="fa-regular fa-heart" aria-label={`Save ${popular.name}`}></i>
            </li>
            <ul className='popular-li-text'>
                <li>
                    <h3>{popular.name}</h3>
                    <p>Price: ${popular.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus"
                    onClick={(e) => { e.stopPropagation(); addToCart(popular); }} // Prevent modal on cart click
                    role="button" 
                    aria-label={`Add ${popular.name} to cart`} 
                    style={{ cursor: 'pointer' }}
                ></i>
            </ul>
        </div>
    );
};

const PopularProducts = () => {
    const [popularList, setPopularList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [cart, setCart] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedItems;
    });
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Function to open the modal
    const OpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Function to close the modal
    const CloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    // Function to add product to cart
    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) { // Prevent duplicate additions
            const updatedCart = [...cart, item]; // Updated cart
            setCart(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Store products locally
            alert(`${item.name} karzinaga qo'shildi!`);
        } else {
            alert(`${item.name} karzinada allaqachon bor!`);
        }
    };

    useEffect(() => {
        const fetchPopularData = async () => { 
            try {
                const response = await fetch('http://localhost:3000/MyShop'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Get only products of type "Popular"
                const filteredData = data.filter(item => item.type === 'Popular');
                setPopularList(filteredData); 
            } catch (error) {
                console.error('Error fetching popular data:', error); 
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchPopularData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="Popular">
            <h6>Popular Products</h6>
            <div className="popular-container">
                {popularList.map(popular => ( 
                    <PopularCard 
                        key={popular.id} 
                        popular={popular} 
                        addToCart={addToCart} 
                        OpenModal={OpenModal} // Pass OpenModal to PopularCard
                    /> 
                ))}
            </div>
            {showModal && selectedProduct && (
                <Modal ac={selectedProduct} Close={CloseModal} /> // Render modal if conditions are met
            )}
        </div>
    );
};

export default PopularProducts;
