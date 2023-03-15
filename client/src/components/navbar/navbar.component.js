import { Component } from "react"
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import "../../App.css";
import "./navbar.css";
import EventBus from "../../common/EventBus";


class NavBar extends Component {
constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }





render() {
  const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
  
  /* NOT SURE IF ILL USE THIS FEATURE
  function detectMobile() {
    const x = document.getElementById("hamburger");
    const y = document.getElementById("nav-links");
    const mql = window.matchMedia('(max-width: 473px)');
    let mobileView = mql.matches
    if (mobileView) {
      if (y === null || x === null) {
        return
      }

      return
    } else {
      if (y === null || x === null) {
        return
      } else {
        y.style.display = "flex";
        x.style.display = "none";
        y.classList.remove('navbar');
      }
    }                           
}
  */
  
  function hamburger() {
    const x = document.getElementById("hamburger");
    const y = document.getElementById("nav-links");
    x.classList.toggle("change");
    if (y.style.display === "flex") {
      y.style.display = "none";
    } else {
      y.style.display = "flex";
    }
  };

return (
  <nav className="navbar">
    
          <Link to={"/"} className="navbar-brand">
            Dungeon Merchant
    </Link>
    <div id="nav-links" className="navbar">
          <div className="navbar-right">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

             <li className="nav-item">
                <Link to={"/shop"} className="nav-link">
                  Shop Creator
                </Link>
              </li>
      
             <li className="nav-item">
                <Link to={"/price-check"} className="nav-link">
                  Price Check
                </Link>
              </li>

            

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            
          </div>

          {currentUser ? (
            <div className="navbar-left">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-left">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
      )}
      </div>
    <div id="hamburger" className="hamburgerContainer nav-item" onClick={hamburger}>
  <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
    </div>
  </nav>
        );
    }
}

export default NavBar;