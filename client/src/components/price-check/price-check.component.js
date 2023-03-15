import React, {useState, useEffect} from 'react';
import PriceCheckDropdown from '../price-check/price-check.dropdown.component';
import uniqid from 'uniqid';
import "./price-check.css";


function PriceCheck() {

 useEffect(() => {
        fetchShopItems();
    }, []);
        
        const [items, setItems] = useState([]);





    const fetchShopItems = async () => {

        
        const equipmentItemsData = await fetch(
            'https://www.dnd5eapi.co/api/equipment'
        );
         
        // Sort Items Alphabetically
        const equipmentItems = await equipmentItemsData.json();
  
        const equipmentItemsResults = equipmentItems.results;
        
    
        
        const items = equipmentItemsResults;
        setItems(items);
        
    };

    


    const options = items.map((item) => {

       
    
        return {
            value: item.name,
            label: item.name,
            url: item.url,
            id: uniqid(),
            cost: [],
            coinType: "GP",
            quantity: []
        };

    }, [])


    return (
        <div  >
            <div className='priceMain'>

            
            <PriceCheckDropdown
                    isSearchable
                    isMulti
                    placeHolder="Search Items"
                    options={options}
                    onChange={(value)=> console.log(value)}
                />
           </div>
          
        </div>
  );
}

export default PriceCheck;