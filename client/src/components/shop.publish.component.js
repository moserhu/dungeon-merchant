import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from "axios";



function ShopPublish() {

useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const urlPath = window.location.pathname;
    const urlElements = urlPath.split('/');
    const urlSubElement = (urlElements[2].split('%'));
    const urlId = (urlSubElement[0]);
    //const API_URL = "http://localhost:8080/";
  

    

const fetchItems = async () => {
      
 
    const id = urlId;
    const response = await axios.get( "/api/fetch/" + id);
        //console.log(response.data[0].shops)
    setItems(JSON.parse(response.data[0].shops));

  
  };


   
  
    
    
   


    return (
        <div >
            <h1 className='title'>Shop</h1>
            <div className='itemsContainer'>
            
                    {items.map(item => (
                        <div key={item.id} className="item-container-published">
                            <div className='item-published'>
                            <span>
                                <h1><Link className='itemNames-published' to={`/shop${item.url}`}>{item.value}</Link> </h1>
                                <span key={item.id} className="itemCost-published">
                                    <span className="cost-published">Cost: {item.cost }  </span>
                                    <span className="coinType-published">{item.coinType}</span>
                                </span>
                                <span className='itemQuantity-published'>
                                    Quantity: {item.quantity}
                                </span>
                            </span>
                            </div>
                        </div>
                ))}
            
            </div>
        </div>
    );
}




export default ShopPublish;