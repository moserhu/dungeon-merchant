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
    const userId = (urlElements[2]);
    const shopId = (urlElements[3]);
    const shopNameFull = (urlElements[4]);
    const shopName = shopNameFull.replaceAll("%20", " ");

const fetchItems = async () => {
    const id = userId
    const currentShopId = shopId;
    const response = await axios.get("/api/fetch/" + id);
    const shopArray = response.data[0].shops;
    const shop = shopArray.find(obj => obj.shopId === currentShopId);
    
    setItems(JSON.parse(shop.items));
};
    
    return (
        <div >
            <h1 className='title'>{shopName}</h1>
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