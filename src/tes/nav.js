import React from "react";
import Home from './home';
import '../App.css';
import logoHome from "./home1.png";
import logoHome1 from "./home2.png"; 
import logoMenu from "./menu2.png";
import logoMenu1 from "./menu1.png";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default function Nav(props) {
  // var BerandaTextColor = {props.name =='Beranda' ? 'text-secondary' : 'text-primary' };
  return (
    <div className="App">
        <div className="row bg-white shadow-lg footer-div">
            <div className="col col-sm-6 text-center">
            <Link to="/Beranda">
                <img src={props.name =='Beranda' ? logoHome : logoHome1 } className="icon-menu "/>  
                <p className={props.name =='Beranda' ? 'text-dark' : 'text-secondary' }>{props.name}</p>  
              </Link>
            </div>
            <div className="col col-sm-6 text-center">
            <Link to="/Menu">
                <img src={props.name !='Beranda' ? logoMenu1 : logoMenu } className="icon-menu"/>
                <p className={props.name !='Beranda' ? 'text-dark' : 'text-secondary' }>Menu</p>  
            </Link>
            </div>
        </div>
    </div>
  );
}
