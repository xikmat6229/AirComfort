import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import './Karzina.css'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);

    // Mahsulotni karzinadan o'chirish funksiyasi
    const removeFromCart = (itemToRemove) => {
        // O'chirishni tasdiqlash
        if (window.confirm(`Siz ${itemToRemove.name} ni karzinadan o'chirmoqchimisiz?`)) {
            const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id); // O'chirish
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Yangilangan karzina saqlash
        }
    };

    return (
        <section className="cart-section">
            <Navbar />
            <h6>Karzina</h6>
            <div className="cart-container">
                {cartItems.length === 0 ? (
                    <p>Karzinangiz bo'sh</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <li className="cart-li-img">
                            <img src={item.imgUrl || item.url} alt={item.name}/>
                            <button onClick={() => removeFromCart(item)}>
                                <i class="fa-regular fa-trash-can"></i>  
                                </button> 
                            </li>
                            <ul className="cart-li-text">
                                <li>
                                <h3>{item.name}</h3>
                                <p>Narxi: ${item.price}</p>
                                </li>
                                
                            </ul>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </section>
    );
};

export default Cart;
