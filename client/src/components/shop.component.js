import React, {useState, useEffect} from 'react';
import ShopDropdown from './shop.dropdown.component';
import uniqid from 'uniqid';
import axios from "axios";
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';


function Shop() {
    useEffect(() => {
        fetchShopItems();
    }, []);

   
    const [items, setItems] = useState([]);
    

    const loggedIn = () => {
        const currentUser = AuthService.getCurrentUser();
    
        const API_URL = "http://localhost:8080/";


        if (currentUser) {
            const userData = window.localStorage.getItem('user');
           
            const fetchItems = async () => {
                
                const id = (JSON.parse(userData)).uniqid;
                
                const response = await axios.get(API_URL + "api/fetch/" + id);

                //console.log(response.data[0].shops)
                const items = JSON.parse(response.data[0].shops);
                window.localStorage.setItem('ShopItems', JSON.stringify(items));
            };
            
            return (
                <div>
                    <button className="buttons" onClick={async () => {
                        const run =
                            await fetchItems();
                        window.location.reload();
                        return run;
                    }}>Open shop</button>
                    <div><Link className='buttons' to={`/shop/${JSON.parse(userData).uniqid}}`}>Publish Shop</Link> </div>
                </div>
            );
        };
        
    };





    const fetchShopItems = async () => {

        // fetch items from API
        const magicItemsData = await fetch(
            'https://www.dnd5eapi.co/api/magic-items'
        );
        
        
        const equipmentItemsData = await fetch(
            'https://www.dnd5eapi.co/api/equipment'
        );
         
        // Sort Items Alphabetically
        const magicItems = await magicItemsData.json();
        const equipmentItems = await equipmentItemsData.json();
        
        const magicItemResults = magicItems.results;
        const equipmentItemsResults = equipmentItems.results;
        const unsortedItems = magicItemResults.concat(equipmentItemsResults);
        const sortedItems = unsortedItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
        
        const items = sortedItems;
        setItems(items);
    };

    const options = items.map((item) => {
        return {
            value: item.name,
            label: item.name,
            url: item.url,
            id: uniqid(),
            cost: 0,
            coinType: "GP",
            quantity: 0
        };

    }, [])

    return (
        <div className='App'key={items.id} >
    <h1 className='title'>Shop Creator</h1>
       
            <ShopDropdown
                    isSearchable
                    isMulti
                    placeHolder="Select..."
                    options={options}
                    onChange={(value)=> console.log(value)}
                />
            {loggedIn()}
          
        </div>
  );
}
    


export default Shop; 