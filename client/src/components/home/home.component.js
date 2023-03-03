import React, { Component } from "react";
import UserService from "../../services/user.service";
import Carousel from "../img-slider/img-slider.components";
import { Link } from 'react-router-dom';
import "../../App.css";
import "./home.css";
import { FaMobile} from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiWingfoot } from "react-icons/gi";

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
            <div className="pageDivider3"></div>
            <div className="homeSkillsContainer">
              <div className="homeSkill"> 
                <div className="homeSkillIcon">
                  <FaMobile className="skillIcon" ></FaMobile>
                </div>
                <span>Mobile Friendly</span>
              </div>
              <div className="homeSkill">
                <div className="homeSkillIcon">
                <GiWingfoot className="skillIcon" ></GiWingfoot>
                </div>
                <span>Fast & Easy</span>
              </div>
              <div className="homeSkill">
                <div className="homeSkillIcon">
                <FaShoppingBag className="skillIcon" ></FaShoppingBag>  
                </div>
                
                <span>Large Selection of Items</span>
              </div>
            </div>
       
            <div className="homeMain">
              <Link to={'/price-check/'}>
              <div className="homeMainItemContainer">
                <div className="homeMainItem">Price Check <div className="smallText">Game Items</div></div>
              </div>
              </Link>
              <Link to={'/shop/'}>
              <div className="homeMainItemContainer">
                <div className="homeMainItem">Build a Shop</div>
              </div>
              </Link>
            </div>
       
        <div className="imgSliderContainer">
        <Carousel
            show={3}
          >
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
            <div className="pageDivider2"></div>
         <div>
              <p className="homeIntro">
                About Us:
              <div className="smallText">
            This site is a passion project to help make the worlds we build more immersive,
            by taking out the time of monotonously reading off shop or pub items. Instead
            players can window shop your world just like they would do their favorite IRL
                stores.
              </div>  
          </p>
            </div>
        <div className="pageDivider3"></div>
        <div className="adContainer">
            <a href="https://www.dmsguild.com/product/419531/The-Desolation-of-Dawn">
              <span className="adLink"></span>
            </a>
              <p className="adText">Try a Home-Brew module from one of our sponsers</p>
             
            <img className="adImage" src={dawn} alt="desolation of dawn ad"  />
        </div>
            
      <div className="homeMain">
              <Link to={'/price-check/'}>
              <div className="homeMainItemContainer">
                <div className="homeMainItem">Price Check <div className="smallText">Game Items</div></div>
              </div>
              </Link>
              <Link to={'/shop/'}>
              <div className="homeMainItemContainer">
                <div className="homeMainItem">Build a Shop</div>
              </div>
              </Link>
              
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