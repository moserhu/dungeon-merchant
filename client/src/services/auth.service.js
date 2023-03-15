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

  updateItem(activePack, newItem) {
    return axios.put("/update/packs", {
      activePack,
      newItem
    });
  }
}

export default new AuthService();