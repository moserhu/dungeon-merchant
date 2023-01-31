import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Shop from './components/shop.component';
//import Tavern from './components/tavern.component';
import Profile from "./components/profile.component";
//import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ItemDetail from "./components/itemDetail.component";

// import AuthVerify from "./common/auth-verify";
//import EventBus from "./common/EventBus";
//import TavernPublish from "./components/tavern.publish.component";
import ShopPublish from "./components/shop.publish.component";
import NavBar from "./components/navbar.component";

class App extends Component {
  
  render() {
  
    return (
      <div className="App Main">
        <NavBar/>
        <div className='App'>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='/shop' exact element={<Shop />} />
            <Route path='/shop/api/:url/:id' element={<ItemDetail />} />       
            <Route path='/shop/:id' element={<ShopPublish />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      
        {/* <AuthVerify logOut={this.logOut}/> */}
        
      </div>
      
    );
  }
}

export default App;