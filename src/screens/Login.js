import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("https://delivery-system-2.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid crediantial");
    }

    if (json.success) {
      localStorage.setItem("authToken" , json.authToken );
     console.log(localStorage.getItem("authToken"))
     
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputPassword1"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>

          <Link to="/creatuser" className="m-3 btn btn-danger">
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
  );
}
