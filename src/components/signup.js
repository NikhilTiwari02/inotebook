import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
  const [credentials,setcredentials]=useState({email:"",name:"",password:""});
  const navigate=useNavigate();
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onsubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name:credentials.name
      }),
    });
    const res = await response.json();
    if (res.val) {
      localStorage.setItem("token", res);
      navigate('/')
      props.showalert(" account successfully created","success");
    } 
    else
    {
      props.showalert(" some error occured or already exist","danger");
    }
  };
  return (
    <div className='container my-2'>
     <form onSubmit={onsubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onchange}/>
  </div>
  <div className="form-group">
    <label className="form-check-label" htmlFor="exampleCheck1">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" name='name' placeholder='Name' onChange={onchange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary my-4">Submit</button>
</form>
    </div>
  )
}

export default Signup;
