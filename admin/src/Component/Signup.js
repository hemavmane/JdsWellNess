
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";

import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

 

  const [errors, setErrors] = useState({});

  const [showpassword, setshowpassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    email: Yup.string()
      .required("email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  })


  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormErrors({ ...formErrors, [name]: "" });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {

    try {
      await validationSchema.validate(formData, {abortEarly: false});

      const config = {
        url: "/auth/register", 
        // baseURL: "http://localhost:8000/api",
        baseURL: "http://localhost:8800/api",
        method: "post",
        header: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        alert("Registered   Succesfully");
        window.location.assign("/")
      }
    } catch (error) {
      // console.error("error", error);
      const newErrors = {};

      error.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  
  return (
    <div className="row m-auto" style={{ height: "100vh" }}>
      <div className="col-md-4 m-auto">
        <div className="form-container">
          <div className="form-input">
            <label htmlFor="email">User Name</label>
            <input
              id="name"
              name="username"
              type="text"
              autoComplete="off"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          {/* <div className="form-input" >
            <label htmlFor="password">Password</label>

            <input style={{ position: "relative" }}
              id="password"
              name="password"
              type={!showpassword ? "password" : "text"}
              value={formData.password}
              onChange={handleInputChange}
            />

            {!showpassword ? (
              <AiOutlineEyeInvisible
                onClick={() => setshowpassword(true)}
                style={{ position: "absolute", bottom: "37%", right: "38%",backgroundColor:"red" }}
              />
            ) : (
              <BsEye
                onClick={() => setshowpassword(false)}
                style={{ position: "absolute", bottom: "37%", right: "38%",backgroundColor:"blue" }}
              />
            )}

            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div> */}

<div className="form-input" style={{ position: "relative" }}>
    <label htmlFor="password">Password</label>
    <input
        id="password"
        name="password"
        type={!showpassword ? "password" : "text"}
        value={formData.password}
        onChange={handleInputChange}
    />
    {!showpassword ? (
        <AiOutlineEyeInvisible
            onClick={() => setshowpassword(true)}
            style={{ position: "absolute", top: "50px", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
        />
    ) : (
        <BsEye
            onClick={() => setshowpassword(false)}
            style={{ position: "absolute", top: "50px", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
        />
    )}
    {errors.password && (
        <p className="error-message">{errors.password}</p>
    )}
</div>


          <button onClick={handleSubmit} className="submit-btn">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
