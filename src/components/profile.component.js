import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
    
  }

  
  componentDidMount() {
    
    const currentUser = AuthService.getCurrentUser();
    

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

  
  }

  
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.firstName}'s Profile</strong>
          </h3>
          </header>
            <p>
              <strong>Username:</strong>{" "}
              {currentUser.username}
            </p>  

            <p>
              <strong>First Name:</strong>{" "}
              {currentUser.firstName}
            </p>  

            <p>
              <strong>Last Name:</strong>{" "}
              {currentUser.lastName}
            </p>  
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
           </p>
        
      </div>: null}
      </div>
    );
  }
}