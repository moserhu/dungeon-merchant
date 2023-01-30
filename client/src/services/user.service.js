import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get("/api/test/all" || API_URL + 'all');
  }

  getUserBoard() {
    return axios.get("/api/test/user" || API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get("/api/test/mod" || API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get("/api/test/admin" || API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();