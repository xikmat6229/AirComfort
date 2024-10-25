import React, { useState } from 'react';
import './Compain.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Compain(props) {
  const [data, setData] = useState({
    firstName: "", 
    PhoneNumber: "",
    product: "",
    email: "",
    complain: "",
    image: null,
  });


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.firstName || !data.PhoneNumber || !data.product || !data.email || !data.complain || !data.image) {
      alert("Please fill out all fields.");
      return;
    }

    const telegramToken = "7082658714:AAElQzaC1xa14LjrT9ix3n7uyegjM26W6WE";
    const chatId = '6599280161';

    const messageText = `First Name: ${data.firstName}\nPhone: ${data.PhoneNumber}\nProduct Name: ${data.product}\nEmail: ${data.email}\nComplain: ${data.complain}`;
    
    const messageUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    await fetch(messageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
      }),
    });

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', data.image);

    const fileUrl = `https://api.telegram.org/bot${telegramToken}/sendDocument`;
    fetch(fileUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File sent:", data);
        alert("Message sent successfully!");
        setData({
          firstName: "", 
          PhoneNumber: "",
          product: "",
          email: "",
          complain: "",
          image: null,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <section className='Compain-section'>
        <Navbar/>
      <h1>If you have any complaints or are not satisfied with your purchase, you can write here.</h1>
      <form className="Complain-form" onSubmit={handleSubmit}>
        <li className='complain-li-1'>
          <input
            type="text"
            placeholder="First Name" // placeholder ni qo'shdik
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            name="PhoneNumber"
            value={data.PhoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Product Name"
            type="text"
            name="product"
            value={data.product}
            onChange={handleChange}
            required
          />
        </li>
        <li className='complain-li-2'>
          <textarea
            placeholder="What are you unhappy with or have a complaint?" // Bu ham placeholder
            className="Complain"
            name="complain"
            value={data.complain}
            onChange={handleChange}
            required
          />
          <div className="file-input" onClick={() => document.querySelector(".file-input-input").click()}>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              hidden
              className='file-input-input'
            />
            <i className="fa-solid fa-upload"></i>
            <p>Send Product</p>
          </div>
        </li>
        <button type="submit">Send</button>
      </form>
      <Footer/>
    </section>
  );
}

export default Compain;
