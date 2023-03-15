import React, { Component } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import "./boards.css";
import AuthService from "../../services/auth.service";
import uniqid from 'uniqid';


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packs: [],
      activePack: [],
      itemName: "",
      itemCost: "",
      itemDesc: "",
      coinType: "gp",
      newItem:{}
    };
    
    this.changeName = this.changeName.bind(this);
    this.changeCost = this.changeCost.bind(this); 
    this.changeDesc = this.changeDesc.bind(this); 
    this.changeCoinType = this.changeCoinType.bind(this); 
    this.onPackClick = this.onPackClick.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  changeName(event) {
    this.setState({ itemName: event.target.value });
  }
  changeCost(event) {
    this.setState({ itemCost: event.target.value });
  }
  changeDesc(event) {
    this.setState({ itemDesc: event.target.value });
  }
  changeCoinType(event) {
    this.setState({ coinType: event.target.value });
  }
  onPackClick(event) {
    this.setState({ activePack: event.target.dataset.name });
  }
 
  setNewItem(e) {
    this.setState({
      newItem:
      {
      name: this.state.itemName,
      id: uniqid(),
      cost: this.state.itemCost,
      coinType: this.state.coinType,
      desc: this.state.itemDesc
      }
    })}

 async submitItem(e) {
   e.preventDefault();
   await this.setNewItem(); 
    console.log(this.state.newItem);
   await AuthService.updateItem(
        this.state.activePack,
        this.state.newItem
      )}
  
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          packs: response.data
        });
      },
      error => {
        this.setState({
          packs:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    const displayPacks = () => {
    const packs = this.state.packs;
    
      while (packs.length < 1){
        if (packs.length < 1) {
          return (
          <div>No Packs</div>
        )
      } 
      }
      if (packs.length > 0) {
        return (
          <div className="itemPacks">
            <h3>-Choose a Pack-</h3>
            {(packs).map((pack) => (
              <h3 key={pack._id} className='packName' data-name={pack.name} onClick={this.onPackClick}>
                {pack.name}
              </h3>
            ))}
           </div>  
      )}
    }
   // const packs = this.state.packs[0];
    return (
      <div className="adminPage">
        <div className="adminNavContainer">
          <div className="adminNav">
          <button>Add Items to Packs</button>
          <button>View Packs</button>
          <button>User Count</button>
          </div>
        </div>
        <div className="packsContainer">
          <div className="packSelector">
          <h3 className="packsTitle">Packs</h3>
          <div>
            {displayPacks()}
          </div>
        </div>
          <div className="packEditor">
            <form className="packForm"
            onSubmit={this.submitItem}
            >
              Pack: <div className="packBoxes">{this.state.activePack}</div>
              Item Name: <input className="packBoxes" type="text" name="itemName" onChange={this.changeName} required></input>
              Cost:<input className="packBoxes" type="number" name="itemCost" onChange={this.changeCost} required></input>
              Coin Type:<input className="packBoxes" type="text" value={this.state.coinType} name="itemCoinType" onChange={this.changeCoinType} required></input>
              Item Desc:<input className="packDesc" type="text" name="itemDesc" onChange={this.changeDesc} required></input>
              <input type="submit" value="Submit" className="packSubmit"></input>
            </form>
        </div>
        </div>
        
      </div>
    );
  }
}