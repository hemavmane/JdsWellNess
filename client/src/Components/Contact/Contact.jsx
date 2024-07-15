import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabsTitle from "../Utils/TabsTitle";
import axios from "axios";
import emailjs from "emailjs-com";
import * as Yup from "yup";
import ReactGA from "react-ga4";

import "./Style/Contact.css";

const TRACKING_ID = "G-PJ3ERX3LDC";

const Contact = () => {
  useEffect(() => {
    if (!window.ga) {
      ReactGA.initialize(TRACKING_ID);
    }
    ReactGA.send({ hitType: "pageview", page: "/contact", title: "Contact" });
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "", // Changed from "Phone" to "phone" for consistency
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    message: Yup.string().required("Message is required"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const config = {
        url: "/contact/addcontact",
        // baseURL: "http://localhost:8000/api",
        baseURL: "https://gdswellness-1.onrender.com/api",
        method: "post",
        headers: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        emailjs
          .sendForm(
            "service_0c4e5dw",
            "template_mur6j98",
            e.target,
            "Q7nXQWJ2D9APCTJs_"
          )
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
        alert("Message sent successfully");
        // Consider redirecting the user or showing a success message instead of reloading
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGoogleEvent = (platform) => {
    ReactGA.event({
      category: "Contact Us Submit Button",
      action: "Click",
      label: platform,
    });
  };

  return (
    <div className="Contact ContactBackImg">
      <div className="ContactWrapper">
        <h1>
          <span onClick={() => navigate("/")}>Home</span>/<span>Contact Us</span>
        </h1>

        <form onSubmit={handleSubmit}>
          
          <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="ContactError">{errors.name}</p>}
          </div>

          <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="ContactError">{errors.phone}</p>}
          </div>


          <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="ContactError">{errors.email}</p>}
          </div>

          <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="2"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          {errors.message && <p className="ContactError">{errors.message}</p>}
          </div>

          <div className="ContactRecaptchaAndSubmitBtn">
            <button
              type="submit"
              className="ContactSubmitBtn"
              onClick={() => handleGoogleEvent("contactUs")}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
