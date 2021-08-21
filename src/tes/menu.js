import React,{useEffect,SetState,useState} from "react";
import logo from "./logo_technopartner.png";
import {MDCTabBar} from '@material/tab-bar';
import Home from './home';
import Nav from './nav';
import Tab2 from './tab2';
import QRCode from "react-qr-code";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import '../App.css';
import './beranda.css';
import './menu.css';
import Isi_tab from './isi_tab';
import axios from 'axios';
import setResult from "react";
import ReactDOM from "react-dom";

export default function Menu() {
    
    return (
        <div className="Menu bg-light">
         <div className="text-center" style={{fontSize:'25px',marginBottom:'20px',marginTop:'5px'}}>
             Menu
         </div>  
         <Tab2 />
         <div className="bodyKonten">
         </div>
         <Nav name="Menu" />
     </div>
    )
}