import React from 'react';
import './Footer.css'
import logo from '../Navbar/NavbarImages/Logo2.png'
function Footer() {
    return (
        <footer>
        <div className="footer-container">
            <a href=""><img src={logo} alt="" /></a>
            <li>
            <a href=""><i class="fa-solid fa-phone"></i></a>
            <a href=""><i class="fa-solid fa-envelope"></i></a>
            <a href=""><i class="fa-brands fa-instagram"></i></a>
            <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
            </li>
        </div>
        </footer>
    );
}

export default Footer;