import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import axios from "axios";



function ItemDetail() {

    const [item, setItem] = useState([]);
    const id = useParams();
    const [desc, setDesc] = useState([]);

    useEffect(() => {
        fetchItem()
    }, []);


    const fetchItem = async () => {

            const fetchItem = await fetch(`https://www.dnd5eapi.co/api/${id.url}/${id.id}`);
    
            if (fetchItem.status === 404) {
                const data = await axios.get(`/api/${id.url}`);
                const items = await data.data;
                const item = (items.filter(x => x.index === `${id.id}`)[0])
                setItem(item);
                setDesc(item.desc);
                
            } else {
                const item = await fetchItem.json();
                setItem(item);
                setDesc(item.desc);
                console.log(item)
            }

        }

        return (
            <div>
                <h1 className='title'>
                    {item.name}
                </h1>
            <div className='itemDescContainer'>
                <div className='itemDesc'>
                    <div className='itemType'>
                        {item.desc}
                        {desc.length === 0 &&
                            <div>
                                No description available, ask your DM for more inforomation.
                            </div>
                        }
                    </div>
                </div>
            </div>
            </div>
        );

};




export default ItemDetail;