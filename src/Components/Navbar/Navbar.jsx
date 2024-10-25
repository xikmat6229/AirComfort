import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './NavbarImages/Logo2.png';
import Search from '../Search/Search';
import Results from '../Search/Result/Results';

function Navbar() {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Qidiruv natijalarini olish
  const handleSearch = (query) => {
    setLoading(true);
    fetch(`http://localhost:3000/MyShop?search=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data not found");
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const goCart = () => {
    navigate("/Karzina");
  };
  const goSaved = () => {
    navigate("/Saved");
  };
  const goCompain = () => {
    navigate("/Compain");
  };

  return (
    <div className='NAVBAR'>
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <a href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <ol>
              <li>
                <button onClick={goSaved}><i className="fa-regular fa-heart"></i></button>
              </li>
              <li>
                <button onClick={goCart}><i className="fas fa-shopping-cart"></i></button>
              </li>
              <li>
                <button onClick={goCompain}>
                <i class="fa-solid fa-question"></i>
                </button>
              </li>
            </ol>
          </ul>
        </div>
      </nav>

      <Search onSearch={handleSearch} />

      {isModalOpen && (
        <Results results={results} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Navbar;
