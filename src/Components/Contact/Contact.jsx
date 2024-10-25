import React, { useState } from 'react';
import './Contact.css'
function Contact(props) {
  const [data, setData] = useState({
    firstName: "", 
    lastName: "",
    phone: "",
    email: "",
    message: ""
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.message) {
      alert("Please fill out all fields.");
      return;
    }

    const telegramToken = "7082658714:AAElQzaC1xa14LjrT9ix3n7uyegjM26W6WE";
    const chatId = '6599280161';
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const data1 = new URLSearchParams({
      chat_id: chatId,
      text: `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nPhone number: ${data.phone}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data1,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message sent:", data);
        alert("Message sent successfully!");
        // Inputlarni tozalash
        setData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: ""
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message.");
      });
  };


  return (
    <footer className='Contact' id='contact'>
      <div className="Contact-Container">
        <div className="contact-left">
          <h1>For applications</h1>          

          <form className="Contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
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
              type="text"
              placeholder="Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
            />
            <textarea
              className="message"
              placeholder="Message"
              name="message"
              value={data.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="contact-button">Send</button>
          </form>
        </div>
        <div className="contact-right">
          <div className="Call">
            <i className="fa-solid fa-phone"></i>
            <li>
              <h1>Our Phone</h1>
              <p>+998 77 004 20 75</p>
            </li>
          </div>
          <div className="Email">
            <i className="fa-solid fa-envelope"></i>
            <li>
              <h1>Our Email</h1>
              <p>xikmatilla996@gmail.com</p>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
