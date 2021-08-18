import logo from './logo_technopartner.png';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Beranda from './beranda';
import React, {Component,setState,useState} from 'react';
import {ReactDOM,render} from 'react-dom';
import {BrowserRouter as Router, Link, Switch, Route, Redirect}  from 'react-router-dom';
// import { render } from 'react-dom/cjs/react-dom.development';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.submitData = this.submitData.bind(this);
  }
  
  submitData = (event) => {
    event.preventDefault();
    axios.post('https://soal.staging.id/oauth/token', {
      grant_type: 'password',
      client_secret: '0a40f69db4e5fd2f4ac65a090f31b823',
      client_id :'e78869f77986684a',
      username : this.state.email,
      password : this.state.password
    })
    .then(function (response) {

      if(response.status === 200 ){
        console.log(response.status);
        window.location = "/beranda" 
      }
      // return response;
    })
    .catch(function (error) {
      if(error.response){
        alert(error.response.data.error_description);
      }
      console.log(error);
    });
    
    this.setState( (state, porps) => { return {loginStatus : '1'}});
    console.log(this.state);
  }
  
  isLogin = (res) => {
    alert(res);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  render(){
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <form onSubmit={this.submitData}>
          <div className="form-group konten">
              <label>Email</label>
              <input type="email" name="email" width="1" className="form-control input shadow-sm" id="email" onChange={this.handleChange} required></input>
          </div>
          <div className="form-group mt-2 konten">
              <label>Password</label>
              <input type="password" name="password" className="form-control input shadow-sm" id="email" onChange={this.handleChangePass} required></input>
          </div>
          <div className="mt-3 konten">
              <button style={{width:"150px",fontWeight:"bold"}} type="submit" className="btn btn-sm btn-light shadow-sm">Login</button>
          </div>
        </form>
      </header>
    </div>
  );
  };
}


export default Home;
