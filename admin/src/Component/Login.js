import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 const [invalid,setInvalid] = useState("")
  // const [formErrors, setFormErrors] = useState({
  //   email: "",
  // });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    
    email: Yup.string()
      .required("email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});

      const config = {
        url: "/auth/login",
        // baseURL: "http://localhost:8000/api",
        baseURL: "http://localhost:8800/api",
        method: "post",
        header: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          password: formData.password,
        },
      };

      let response = await axios(config);
        // console.log("res",response.data.email)
      if (response.status === 200) {
        alert("Logged in  Succesfully");
        window.location.assign("dashboard");
        localStorage.setItem("userData", JSON.stringify(response.data || {}));
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
            {/* {errors.email && (
              <p className="error-message">{errors.email}</p>
            )} */}
          </div>

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {/* {errors.password && (
              <p className="error-message">{errors.password}</p>
            )} */}
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Login
          </button>
          <div className="row text-center">
            <a href="/Signup" style={{fontFamily:"IBM Plex Serif,serif",marginTop:"0.5rem",fontWeight:"400"}}>New User, Sign Up <span style={{color:"royalblue"}}>Here</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
