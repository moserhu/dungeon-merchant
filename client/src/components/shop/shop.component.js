import React, {useState, useEffect} from 'react';
import ShopDropdown from './shop.dropdown.component';
import uniqid from 'uniqid';
import axios from "axios";


function Shop() {
    useEffect(() => {
        fetchShopItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchShopItems = async () => {

        // fetch items from API
        const magicItemsData = await fetch(
            'https://www.dnd5eapi.co/api/magic-items'
        );
        
        
        const equipmentItemsData = await fetch(
            'https://www.dnd5eapi.co/api/equipment'
        );

        const customItemsData = await axios.get(
           '/api/packs'
        );
         
        // Sort Items Alphabetically
        const magicItems = await magicItemsData.json();
        const equipmentItems = await equipmentItemsData.json();
        const customItems =  customItemsData.data;
        const pubItems = customItems[0].items;

        const magicItemResults = magicItems.results;
        const equipmentItemsResults = equipmentItems.results;
        
        const unsortedItems = magicItemResults.concat(equipmentItemsResults, pubItems);
        const sortedItems = unsortedItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
        
        const items = sortedItems;
        setItems(items);
        console.log(magicItemResults);
    };

    const options = items.map((item) => {
        
     /*   
        const ifCost = () => {
            const itemUrl = item.url;
            const urlSplit = itemUrl.split('/');
            const itemType = (urlSplit[2]);

            if (itemType === "magic-items") {
                return 0;
            } else {
                const url = this;
                //const cost = itemData.cost;
                //const price = cost.quantity;
                    console.log(url);    
 
            
                return 1;
                
            }

        };

*/


        return {
            value: item.name,
            label: item.name,
            url: item.url,
            id: uniqid(),
            cost: [],
            coinType: "gp",
            quantity: []
        };

    }, [])


    return (
        <div className='App'key={items.id} >
            <div className='shopMain'>
        
            <ShopDropdown
                    isSearchable
                    isMulti
                    placeHolder="Select Shop Items..."
                    options={options}
                    onChange={(value)=> console.log(value)}
                />
            
            </div>
        </div>
  );
};
    


export default Shop; 