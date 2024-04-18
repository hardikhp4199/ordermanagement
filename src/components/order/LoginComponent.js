import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "../../css/login.css";

// async function loginUser(credentials) {
//   return fetch('http://localhost:8080/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

export default function Login({ setToken }) {
  const baseURL = process.env.REACT_APP_API_URL;
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handelLogin = async (e) => {
    e.preventDefault();
    try {

      if (username.trim() == "") {
        toast.error('Username cannot be empty');
        return;
      }

      if (!password.trim()) {
        toast.error('Password cannot be empty');
        return;
      }

      let requestBody = {username,password};
      const response = await axios.post(`${baseURL}/api/login`, requestBody);

      console.log(response.data.token);
      if(response.data.token == null  || response.data.token == "" || response.data.token == undefined){
        toast.error("Please enter correct username and password");
      }else{
        setToken(response.data);
      }   
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  return (
    <div className="custom login">
      <ToastContainer position="top-right" />
      <div className='row justify-content-center'>
        <div className='col-5'>
          <div className='custom-form p-4 row'>
            <h2 className="header-title">Login Form</h2>
            <form onSubmit={handelLogin}  className="mt-4">
              <div className="mb-3">
                <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="mb-3">
                <input className="form-control"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
