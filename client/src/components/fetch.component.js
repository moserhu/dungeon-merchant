import axios from "axios";


const userData = window.localStorage.getItem('user');
const API_URL = "http://localhost:8080/";


 

const fetchItems = async () => {
      
    const id = (JSON.parse(userData)).uniqid;
    const response = await axios.get(API_URL + "api/fetch/" + id);
        //console.log(response.data[0].shops)
    const items = JSON.parse(response.data[0].shops);
    
  
    window.localStorage.setItem('ITEMS', JSON.stringify(items));
  
  };
  

export default fetchItems;
