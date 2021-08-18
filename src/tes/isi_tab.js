import React, {setState,useState,useEffect} from 'react';
import reactDom from 'react-dom';
import './beranda.css';
import axios from 'axios';

class Isi_tab extends React.Component{
  state = {
    list : [],
    menu : []
  }
  
  componentDidMount(){
    var axe = axios
    .post("https://soal.staging.id/oauth/token", {
      grant_type: 'password',
      client_secret: '0a40f69db4e5fd2f4ac65a090f31b823',
      client_id :'e78869f77986684a',
      username : 'support@technopartner.id',
      password : '1234567'
    })
    .then(({ data }) => {
      const banner = "";
      // const [banner, getBanner] = useState('');
        const token = data.access_token;
        const tokenAuth = 'Bearer '+token;
        axios.post('https://soal.staging.id/api/menu',{'show_all':'1'},{headers : {Authorization : tokenAuth} })
        .then(({ data }) => {
          this.setState({
            data : data.result.categories,
          });

        });
      });
    }
    

  render(){
    const num = this.props.keynum;
    let x = '';
    if(this.state.data){
      this.state.data.map((e,num)=>{
        if(e.category_name == this.props.name ){
          x = this.state.data[num].menu.map((listdata)=>{
            console.log(listdata);
              return <div className="row" style={{height:'100px',marginTop:'10px'}} >
            <div className="row" >
              <div className='col col-3'>
                <img src={listdata.photo} style={{width: '100px',margin:'0',marginTop:'10px',padding:'0'}} className="img-fluid" alt="quixote"/>
              </div>
              <div className='col col-9' style={{fontSize:'10px'}}>
                <div className="row">
                  <div className='col col-8'>
                    <strong>{listdata.name}</strong>
                  </div>
                  <div className='col col-4 text-align-right'>
                    <strong>Rp. {listdata.price}</strong>
                  </div>
                </div>
                <p style={{color:'grey'}}>
                  {listdata.description}
                </p>
              </div>
            </div>
            
          </div>  
            
          //   <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
          //   <div className="d-flex w-100 justify-content-between">
          //     <h5 className="mb-1"></h5>
          //     <small><strong>{listdata.price}</strong></small>
          //   </div>
          //         <img src={listdata.photo} style={{width :'50px',height:'50px',objectFit:'cover',magin : '0px 0px -510px 0px'}}  />
          //       <span>{listdata.description}</span>
          //   <div className="row">
          //     <div className="col col-sm-11" style={{fontSize : '10px'}}>
          //       {/* <small className="text-muted">Donec id elit non mi porta.</small> */}
          //     </div>
          //   </div>
          // </a>;
          });
        }
      })
    }

    return (
      <div className="">
          <strong key={this.props.name}>{this.props.name}</strong>
          {x}
      </div>
    );
  }
}

export default Isi_tab;