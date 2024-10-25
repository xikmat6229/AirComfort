import React from 'react';
import './Modal.css';

function Modal({ ac, Close }) {
    // Escape tugmasini bosilganda modalni yopish
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            Close();
        }
    };

    // Modal overlay ni bosganda modalni yopish
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            Close();
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex="0" // Fokusga olish uchun
        >
            <div className="modal-content">
                <h2>{ac.name}</h2>
               <div className="modal-container">
               <div>
               <img src={ac.imgUrl || ac.url} alt="" />
               </div>
                <div>
                <p>{ac.description}</p>
                <p>{ac.price}$</p>
                </div>
               </div>
                <button onClick={Close}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
