import React, {useState, Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import Isi_tab from './isi_tab.js';
import axios from 'axios';

let menuList = [];
const datas = {};
// console.log(datas)

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: 'black',
    marginBottom:'0px'
  },
  slide1: {
    backgroundColor: '#fff',
  },
  slide2: {
    backgroundColor: '#fff',
  },
  slide3: {
    backgroundColor: '#fff',
  },
};

class DemoTabs extends React.Component {
  state = {
    index: 0,
    data : []
  };
  
  componentDidMount () {
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
  
  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };
  
  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };
  
  render() {
    const { index } = this.state;
    const hit = ['Seasonal product','Best Seller','Coffe','Tea'];
    const tab = this.state.data.map((id)=>{
      return <Tab label={id.category_name} />
    });

    const tabContain = this.state.data.map((id,key)=>{
      console.log(key);
      return <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <Isi_tab name ={id.category_name} keynum={id} />
            </div>;
    });

    return (
      <div>
        <Tabs value={index} fullWidth onChange={this.handleChange} style={styles.tabs}>
          {tab}
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          {/* <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            slide n°2
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div> */}
          {tabContain}
        </SwipeableViews>
      </div>
    );
  }
}

export default DemoTabs;
