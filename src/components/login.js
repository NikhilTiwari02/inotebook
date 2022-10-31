import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onchange = (e) => {
    console.log("onchange working");
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const onsubmit = async (event) => {
    //  console.log("form sub");
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const res = await response.json();
    console.log(res);
    if (res.comp) {
      localStorage.setItem("token", res.token);
      navigate('/')
      props.showalert(" logged in successfully","success");
    } else {
      props.showalert(" incorrect email or password","warning");
    }
  };
  return (
    <div className="container my-2">
      <form onSubmit={onsubmit}>
        <div className="form-group">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
