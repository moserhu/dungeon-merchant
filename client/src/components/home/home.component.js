import React, { Component } from "react";
import UserService from "../../services/user.service";
import Carousel from "../img-slider/img-slider.components";
import { Link } from 'react-router-dom';
import "../../App.css";
import "./home.css";

import balor from "../../img/balor.jpeg";
import gametable from "../../img/gametable.jpeg";
import dm from "../../img/DM.jpeg";
import skullManor from "../../img/skull-manor.jpeg";
import waterBattle from "../../img/water-battle.jpeg";
import dawn from "../../img/desolation_of_dawn.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
    
  }

  

  render() {
    return (
      <div >
      <div className="homeContainer">
        
        <div className="contentContainer">
          
          <div className="mainTitleContainer">
            <h1 className="mainTitle">Dungeon Merchant</h1>
          </div>
    
        <header className="homeHeader">
          
          <span>Welcome to Dungeon Merchant, a site built to help Dungeon and Game Masters alike organize the myriad of shops and pubs that populate the multiverse of tabletop Role Playing Games.</span>
        </header>
       
        <div className="imgSliderContainer">
        <Carousel
            show={3}
          >
                    <div className="sliderTextContainer" style={{ padding: 8 }} >
                      <span className="sliderText" style={{ width: '100%' }}>
                          Tabletop games are fun but there is so much to keep track of already,
                          Dungeon Tracker will allow you more time for memories and less time prepping
                      </span>
                    </div>
                <div>
                    <div style={{padding: 8}} >
                        <img src={balor} alt="placeholder" style={{width:'100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={waterBattle} alt="placeholder" style={{width:'100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={gametable} alt="placeholder"  style={{width:'100%'}}/>
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={dm} alt="placeholder" style={{width:'100%'}} />
                    </div>
                </div>
                <div>
                    <div style={{padding: 8}}>
                        <img src={skullManor} alt="placeholder" style={{width:'100%'}} />
                    </div>
                </div>
            </Carousel>
       
        </div>
         <div>
          <p className="homeIntro">
            This site is a passion project to help make the worlds we build more immersive,
            by taking out the time of monotonously reading off shop or pub items. Instead
            players can window shop your world just like they would do their favorite IRL
            stores.
          </p>
        </div>
        <span> 
          <Link className="buttons buildShopbutton" style={{padding: "1%"}} to={'/shop/'}>Build your first shop now!</Link>
        </span>
        <div className="adContainer">
            <a href="https://www.dmsguild.com/product/419531/The-Desolation-of-Dawn">
              <span className="adLink"></span>
            </a>
              <p className="adText">Try a Home-Brew module from one of our sponsers</p>
             
            <img className="adImage" src={dawn} alt="desolation of dawn ad"  />
        </div>
      
          </div>
          
        </div>
        <footer className="footer">
          <div className="supportText">
            <p >We are constantly trying to get better so any recommendations or bugs can be sent to 
              support@dungeonmerchant.com
            </p>
          </div>
          <div>
            <p>Dungeon Merchant 2023</p>
          </div>
          
        </footer>
      </div>
    );
  }
}