import React, {useState, useEffect} from 'react';
import TavernDropdown from './tavern.dropdown.component';
import uniqid from 'uniqid';
import axios from "axios";
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const API_URL = "http://localhost:8080/";


function Tavern() {
    useEffect(() => {
        fetchTavernItems();
    }, []);
    
    

const [items, setItems] = useState([]);

const loggedIn = () => {
        const currentUser = AuthService.getCurrentUser();
    
        

        if (currentUser) {
            const userData = window.localStorage.getItem('user');
           
            const fetchItems = async () => {
                
                const id = (JSON.parse(userData)).uniqid;
                
                const response = await axios.get("/api/fetch/" + id || API_URL + "api/fetch/" + id);

                //console.log(response.data[0].shops)
                const items = JSON.parse(response.data[0].taverns);
                window.localStorage.setItem('TavernItems', JSON.stringify(items));
            };
        
            return (
                <div>
                    <button className="buttons" onClick={async () => {
                        const run =
                            await fetchItems();
                        window.location.reload();
                        return run;
                    }}>Open shop</button>
                    <div><Link className='buttons' to={`/tavern/${JSON.parse(userData).uniqid}}`}>Publish Shop</Link> </div>
                </div>
            );
        };
        
    };
  





    const fetchTavernItems = async () => {

        const data = await axios.get("/api/pub" || API_URL + "api/pub");
        const items = await data.data;
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
        <div className='App'key={items.id} style={{paddingBottom: "80px"}}>
    <h1 className='title'>Tavern Creator</h1>
       
            <TavernDropdown
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
    


export default Tavern; 