import React, { useEffect, useState } from 'react';
import './Saved.css'; // Stilni import qilish
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const SavedCard = ({ item, removeFromSaved, addToCart }) => {
    return (
        <div className="saved-item">
            <li className='saved-li-img'>
                <img src={item.imgUrl || item.url} alt={item.name} className="saved-image" />
                <button onClick={() => removeFromSaved(item)}>
                    <i className="fa-solid fa-trash"></i> {/* O'chirish belgisini qo'shish */}
                </button>
            </li>
            <ul className='saved-li-text'>
                <li>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                </li>
                <i
                    className="fa-solid fa-cart-plus"
                    onClick={() => addToCart(item)}  // Korzinaga qo'shish funksiyasi
                ></i>
            </ul>
        </div>
    );
};

const Saved = () => {
    const navigate = useNavigate();
    const [savedItems, setSavedItems] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedItems;
    });

    useEffect(() => {
        const storedSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        setSavedItems(storedSavedItems);
    }, []);

    const removeFromSaved = (item) => {
        const updatedSavedItems = savedItems.filter(savedItem => savedItem.id !== item.id);
        setSavedItems(updatedSavedItems);
        localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        alert(`${item.name} saved ro'yxatidan o'chirildi!`);
    };

    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            const updatedCart = [...cart, item];
            setCart(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            alert(`${item.name} korzinaga qo'shildi!`);
        } else {
            alert(`${item.name} allaqachon korzinada mavjud!`);
        }
    };

    return (
        <div className="saved-section">
            <Navbar/>
            <h6>Saved Items</h6>
            <button className='saved-back' onClick={() => navigate("/")}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="saved-container">
                {savedItems.length > 0 ? (
                    savedItems.map((item) => (
                        <SavedCard
                            key={item.id}
                            item={item}
                            removeFromSaved={removeFromSaved}  // Mahsulotni o'chirish
                            addToCart={addToCart}  // Korzinaga qo'shish
                        />
                    ))
                ) : (
                    <p>No items saved yet!</p>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default Saved;
