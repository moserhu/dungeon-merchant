import axios from "axios";


const userData = window.localStorage.getItem('user');



 

const fetchItems = async () => {
      
    const id = (JSON.parse(userData)).uniqid;
    const response = await axios.get("/api/fetch/" + id);
        //console.log(response.data[0].shops)
    const items = JSON.parse(response.data[0].shops);
    
  
    window.localStorage.setItem('ITEMS', JSON.stringify(items));
  
  };
  

export default fetchItems;
