import React from "react";
import './Result.css';

function Results({ results, onClose, addToCart }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>  {/* Fonni bosganda modal yopiladi */}
      <div className="modal-search">
        <button onClick={onClose} className="Cancel-button">
          <i className="fa-solid fa-x"></i>
        </button>
        <h6>Your Search</h6>
        <ul className="result-container">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div className="result-card" key={index}>
                <li className='result-li-img'>
                  <img src={item.imgUrl || 'default-image.jpg'} alt={item.name} className="result-image" />
                  <i className="fa-regular fa-heart"></i>
                </li>
                <ul className='result-li-text'>
                  <li>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                  </li>
                  <i 
                    className="fa-solid fa-cart-plus" 
                    onClick={() => addToCart(item)} // Mahsulotni karzinaga qo'shish
                  ></i>
                </ul>
              </div>
            ))
          ) : (
            <p>No results found</p> 
          )}
        </ul>
      </div>
    </>
  );
}

export default Results;
