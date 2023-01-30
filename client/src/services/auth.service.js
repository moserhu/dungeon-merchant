import axios from "axios";



class AuthService {
  login(username, password) {
    return axios
      .post("/api/auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("ShopItems");
    localStorage.removeItem("TavernItems");
  }

  register(username, firstName, lastName, email, password) {
    return axios.post("/api/auth/signup", {
      username,
      firstName,
      lastName,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();