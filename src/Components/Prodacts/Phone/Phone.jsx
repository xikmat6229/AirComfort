import React, { useEffect, useState } from 'react';
import './Phone.css'; // Make sure to create a corresponding CSS file for Phone styling

const PhoneCard = ({ phone, addToCart, addToSaved }) => {
    return (
        <div className="phone-card">
            <li className='phone-li-img'>
                <img src={phone.url || 'default-phone-image.jpg'} alt={phone.name} className="phone-image" />
                <button 
                    className="save-button" 
                    onClick={() => addToSaved(phone)} 
                    aria-label={`Save ${phone.name}`}>
                    <i className="fa-regular fa-heart phone-heart-icon"></i>
                </button>
            </li>
            <ul className='phone-li-text'>
                <li>
                    <h3>{phone.name}</h3>
                    <p>Price: ${phone.price}</p>
                </li>
                <i 
                    className="fa-solid fa-cart-plus phone-cart-icon"
                    onClick={() => addToCart(phone)} // Add product to cart
                ></i>
            </ul>
        </div>
    );
};

const Phone = () => {
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

    // Function to add product to the saved list
    const addToSaved = (item) => {
        if (!saved.some(savedItem => savedItem.id === item.id)) {
            const updatedSaved = [...saved, item];
            setSaved(updatedSaved);
            localStorage.setItem('savedItems', JSON.stringify(updatedSaved)); // Save saved list to local storage
            alert(`${item.name} added to saved list!`);
        } else {
            alert(`${item.name} is already in the saved list!`);
        }
    };

    useEffect(() => {
        const fetchPhoneData = async () => {
            try {
                const response = await fetch('http://localhost:3000/MyShop');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Filter only 'Phone' type objects
                const filteredData = data.filter(item => item.type === 'Phone'); 
                setPhoneList(filteredData);
            } catch (error) {
                console.error('Error fetching phone data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoneData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="Phone">
            <h6>Phones</h6>
            <div className="phone-container">
                {phoneList.map((phone) => (
                    <PhoneCard 
                        key={phone.id} 
                        phone={phone} 
                        addToCart={addToCart} 
                        addToSaved={addToSaved} // new prop added
                    />
                ))}
            </div>
        </div>
    );
};

export default Phone;
