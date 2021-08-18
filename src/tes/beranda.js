import React, {Component,setState, useEffect} from 'react';
import { useState } from 'react';
import {ReactDOM,render} from 'react-dom';
import logo from "./logo_technopartner.png";
import Home from './home';
import Nav from './nav';
import QRCode from "react-qr-code";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import '../App.css';
import './beranda.css';

export default function Beranda() {
    // constructor(props){
    //   super(props);
    //   this.state = {
    //       user : []
    //   };
    // }    
    const [token, getToken] = useState('');
    const [timeEvent, getTimeEvent] = useState('');
    const [name, getName] = useState('');
    const [saldo, getSaldo] = useState('');
    const [point, getPoint] = useState('');
    const [qr, getQr] = useState('');
    const [banner, getBanner] = useState('');

    
    useEffect(()=> {
        getAuthorize();    
    },[]);


    function getAuthorize(){
       axios
         .post("https://soal.staging.id/oauth/token", {
             grant_type: 'password',
             client_secret: '0a40f69db4e5fd2f4ac65a090f31b823',
             client_id :'e78869f77986684a',
             username : 'support@technopartner.id',
             password : '1234567'
         })
         .then(({ data }) => {
             const token = data.access_token;
             getToken(token);
             const tokenAuth = 'Bearer '+token;
             axios.get('https://soal.staging.id/api/home',{headers : {Authorization : tokenAuth} })
             .then(({ data }) => {
               getTimeEvent(data.result.greeting);
               getName(data.result.name);
               getSaldo('Rp.'+data.result.saldo);
               getPoint(data.result.point);
               getQr(data.result.qrcode);
               getBanner(data.result.banner);
            });
         });
    }
   
    // componentDidMount(){
    //     var list = [];
    //     const [result, setResult] = useState(null)

    //     console.log(list);
    // }
    
    
     return (

        <div className="App">
        <nav className="navbar navbar-light bg-light shadow-sm">
            <a className="navbar-brand" href="#">
                <img className="logo"  src={logo} alt="" />
            </a>
        </nav>
        <div className="bodyKonten">
           <div className="konten shadow">
               <div className="container">
                    <div className="row">
                        {timeEvent ? timeEvent : 'Load Data...' }, 
                    </div>
                    <div className="row bold">
                        {name ? name : 'Load Data...' }
                    </div>
                    <div className="row mt-3">
                        <div className ="col col-4 bodyqr">
                            <div className='rounded-circle kontenqr bg-light shadow text-center'>
                                <img src={qr} className='qr' />

                                {/* <QRCode value="hey" level='Q' size='40' /> */}
                            </div>
                        </div>
                        <div className ="col col-8">
                            <div className="row" style={{'height':'30px','marginTop':'10px'}}>
                                <div className="col col-sm-2">
                                    <p className="text-left">Saldo</p>
                                </div>
                                <div className="col col-sm-10 ">
                                    <p className='text-saldo'>{saldo}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-sm-2">
                                    <p className="text-left">Point</p>
                                </div>
                                <div className="col col-sm-10 ">
                                    <p className="text-hijau">{point}</p>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
           </div> 
        <div className="row a" >
            <Carousel 
                showArrows={false} 
                animationHandler="fade" 
                showThumbs={false} 
                infiniteLoop={true} 
                interval='2000' 
                autoPlay={true} 
                showStatus={false} 
                showIndicators={false}
                centerSlidePercentage="100">
                <div>
                    <img src={banner[0]} />
                </div>
                <div>
                    <img src={banner[1]} />
                </div>
                <div>
                    <img src={banner[2]} />
                </div>
            </Carousel>
        
        </div>


        </div>
        <Nav name="Beranda" />
    </div>
        );
    
}

// export default Beranda;