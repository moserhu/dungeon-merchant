import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import '../../App.css';
import './shop.css';
import axios from "axios";
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import uniqid from 'uniqid';



const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg className="icon" height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};



const currentUser = AuthService.getCurrentUser();
const userData = window.localStorage.getItem('user');

const ShopDropdown = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const [shopName, setShopName] = useState("");
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();
  
  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  /*useEffect(() => {
    if (data !== null) setSelectedValue(JSON.parse(data))
  }, []);
  */
  
  useEffect(() => {
    window.localStorage.setItem('ShopItems', JSON.stringify(selectedValue))
  }, [selectedValue]);
  
  
  useEffect(() => {
    fetchShops()
  }, [selectedValue]);
  
/*
  useEffect(() => {
    saveShopItems();
    
  }, [selectedValue]);
  
*/

  //Save function to send currently selected items to the
  
  async function saveShopItems() {
    const publishButton = document.querySelector('#publish');
    const deleteButton = document.querySelector('#delete');
    let items = window.localStorage.getItem('ShopItems');
    if (currentUser) {
      if (!shopName || shopName.length === 0) {
        console.log("no save");
        return
      } else {
        
        let shopData = {
          id: JSON.stringify((JSON.parse(userData)).uniqid),
          shopId: shopId,
          shopName: shopName,
          items: items
        }
        await axios.put("/update/shops", { shopData }, { headers: authHeader() });
        console.log("items Saved");
        deleteButton.classList.remove('deleteButton');
        publishButton.classList.remove('publishButton');
        setTimeout(() => {
          fetchShops();
          shopButtons();
        }, "1000");
        return
      }
    } else {
      alert("Please create an account to save your Shop!");
      window.location.replace("/register");
    };
    
  };


  function updateShopName() {
    saveShopItems();
    alert("Shop Name Updated");
  }






  //display function to put selected items on page____________________

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return
    }
    if (isMulti) {
      return (
        <div className='itemsContainer'>
              
          {(selectedValue).map((option) => (
            
            <div key={option.id} className='items'>
              <span >
                <h1><Link className='itemNames' to={`/shop${option.url}`}>{option.value}</Link> </h1>
                      
                <span key={option.id} className="itemCost">
                  <input className="cost" data-id={option.id} value={option.cost} onChange={handleCostChange} type="text" maxLength='6' id="cost" name="cost" />
                  <div className="cost-dropdown">
                    <div data-id={option.id} className="cost-select">
                      <span className="cost-selected">{option.coinType}</span>
                      <div className="cost-caret"></div>
                    </div>
                    <ul className="cost-menu">
                      <li data-id={option.id} className="cost-active" onChange={saveShopItems} >gp</li>
                      <li data-id={option.id} >pp</li>
                      <li data-id={option.id} >ep</li>
                      <li data-id={option.id} >sp</li>
                      <li data-id={option.id} >cp</li>
                    </ul>
                  </div>
                </span>
                <div className="itemQuantity">
                  <p className="quantity">Quantity</p>
                  <input data-id={option.id} value={option.quantity} onChange={handleQuantityChange} type="number" id="quantity" />
                </div>
              </span>
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
            
        </div>
      );
    }
    
    return selectedValue.label;
  };


  //Cost value recomendation-------------------------------------//
  

  //---QUANTITY VALUE HANDLER---------------------------------------------------------------
  const handleQuantityChange = (event) => {
    const id = String(event.target.dataset.id);
    const val = String(event.target.value);
    const items = JSON.parse(window.localStorage.getItem('ShopItems'));
    const match = items.find(x => x.id === id);

    function updateItems() {
      window.localStorage.setItem('ShopItems', JSON.stringify(items));
      return;
    };

    function updateQuanity() {
      delete match.quantity;
      match.quantity = val;
      return;
    }

    updateQuanity();
    updateItems();
    setSelectedValue(JSON.parse(window.localStorage.getItem('ShopItems')));
    saveShopItems();
    return;
  };
  // COST VALUE HANDLER____________________________________________-
  const handleCostChange = (event) => {
    const id = String(event.target.dataset.id);
    const val = String(event.target.value);
    const items = JSON.parse(window.localStorage.getItem('ShopItems'));
    const match = items.find(x => x.id === id);

    function updateItems() {
      window.localStorage.setItem('ShopItems', JSON.stringify(items));
      return;
    };
       

    function updateCost() {
      delete match.cost;
      match.cost = val;
      return;
    }
    
      
    updateCost()
    updateItems();
    setSelectedValue(JSON.parse(window.localStorage.getItem('ShopItems')));
    saveShopItems();
    return;
  };
  
  
  // COIN TYPE DROPDOWN__________________________________________________
   


    const dropdowns = document.querySelectorAll('.cost-dropdown');

    dropdowns.forEach(dropdown => {
    
        const select = dropdown.querySelector('.cost-select');
        const caret = dropdown.querySelector('.cost-caret');
        const menu = dropdown.querySelector('.cost-menu');
        const options = dropdown.querySelectorAll('.cost-menu li');
        const selected = dropdown.querySelector('.cost-selected');

        select.addEventListener('click', () => {
            select.classList.toggle('cost-select-clicked');

            caret.classList.toggle('cost-caret-rotate');
    
            menu.classList.toggle('cost-menu-open');
        });

        options.forEach(option => {
            option.addEventListener('click', (event) => {
                const id = String(event.target.dataset.id);
                const items = JSON.parse(window.localStorage.getItem('ShopItems'));
                const match = items.find(x => x.id === id);
                
                selected.innerText = option.innerText;
                const val = selected.innerText;
                
                function updateItems() {
                  window.localStorage.setItem('ShopItems', JSON.stringify(items));
                };
       

                function updateCoinType() {
                    delete match.coinType;
                    match.coinType = selected.innerText;                
                };
                if (match && val) {
                    updateCoinType()
                    updateItems();
                  setSelectedValue(JSON.parse(window.localStorage.getItem('ShopItems')));
                }

                select.classList.remove('cost-select-clicked');
                caret.classList.remove('cost-caret-rotate');
                menu.classList.remove('cost-menu-open');

                options.forEach(option => {
                    option.classList.remove('cost-active');
                });

              option.classList.add('cost-active');

              return;
            });
        });
    });
    
    //Shop Organizer_______________________---
  
    const getShopName = (e) => {
    
     setShopName(e.target.value);
      
    };

  const newShop = () => {
if (!currentUser) {
  alert("You're not logged in to an account, to save your shop please log in or create an account");
  window.location.replace("/register");
} else {
  
    const shopNameTitle = document.querySelector('#shopTitle');
    const shopNameTitleText = document.querySelector('#shopTitleText');
    const deleteButton = document.querySelector('#delete');
    const publishButton = document.querySelector('#publish');
    const saveButton = document.querySelector('#save');
    const itemsDrop = document.querySelector('#itemsDropdown');
    itemsDrop.classList.remove('itemsDropdown');
    saveButton.classList.remove('saveButton');
    shopNameTitle.classList.remove('shopTitle');
    shopNameTitleText.classList.remove('shopTitleText');
    deleteButton.classList.add('deleteButton');
    publishButton.classList.add('publishButton');
    shopNameTitleText.classList.add('shopTitleText-active');
    shopNameTitle.classList.add('shopTitle-active');

    setShopId(uniqid());
    setSelectedValue([]);
    setShopName();
    saveShopItems();
    }
    
  };

const fetchShops = async () => {
        
        const userData = window.localStorage.getItem('user');
        const id = (JSON.parse(userData)).uniqid;

        const response = await axios.get('/api/fetch/' + id );        
        const fetchedShops = await (response.data[0]).shops;
        setShops(fetchedShops);
  };

    const shopItemsClicked = event => {
      let items = event.target.dataset.items;
      let id = event.target.dataset.id;
      let name = String(event.target.dataset.name);
      setShopName(name);
      setShopId(id);
      setSelectedValue(JSON.parse(items));

      const shopNameTitle = document.querySelector('#shopTitle');
      const deleteButton = document.querySelector('#delete');
      const shopNameTitleText = document.querySelector('#shopTitleText');
      const publishButton = document.querySelector('#publish');
      const saveButton = document.querySelector('#save');
      const itemsDrop = document.querySelector('#itemsDropdown');
      itemsDrop.classList.remove('itemsDropdown');
      saveButton.classList.remove('saveButton');
      deleteButton.classList.remove('deleteButton');
      shopNameTitle.classList.remove('shopTitle');
      shopNameTitleText.classList.remove('shopTitleText');
      publishButton.classList.remove('publishButton');
      shopNameTitleText.classList.add('shopTitleText-active');
      shopNameTitle.classList.add('shopTitle-active');

    };
  
  const shopButtons = () => {
        if (shops.length > 0) {
            return (
                <div className="shopsDropdownContainer">
                    {(shops).map((shop) => (
                        <div className="myShop" data-name={shop.shopName} data-id={shop.shopId} data-items={shop.items} onClick={shopItemsClicked} >
                        {shop.shopName}
                      </div>
                    ))}

                </div>
            );
        };
    };

    //____________Delete_Shops_______________________________________________-
   
  
  const deleteShop = async () => {
    if (currentUser) {
      const shopData = {
        id: ((JSON.parse(userData)).uniqid),
        shopId: shopId,
        shopName: shopName,
      }
      try {
        await axios.delete("/delete/shop/", {params: shopData, headers: authHeader()} );
      } catch (err) {
        console.error(err);
      }
    }
    return
  };
  
  const deleteButton = () => {
    deleteShop();
    if (currentUser) { 
    setTimeout(() => {
      fetchShops();
      shopButtons();
   
    }, "2000");
      alert(" Shop Deleted ");
      window.location.reload();
    } else {
      return
  };
  };

//____________Publish Button________________________________________
  const publishButton = () => {
    if (currentUser) {
      return (
        <div className="publishContainer"><Link id="publish" onClick={() => {

          saveShopItems();

        }} className="publishButton buttons" to={`/shop/${JSON.parse(userData).uniqid}/${shopId}/${shopName}`}>Publish Shop</Link> </div>
      )
    } else {
      return
    }
  };


  //_________________________________________________________________________
  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
    setTimeout(() => {
      saveShopItems();
    }, "1000");
  };

  const onItemClick = async (option) => {
    let newValue;
    const url = option.url;
    const urlSplit = url.split('/');
    const itemType = (urlSplit[2]);

    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        if (itemType === "equipment") {
      const item = await fetch(
             `https://www.dnd5eapi.co${url}`
    );
    const itemData = await item.json();
    const cost = await itemData.cost;
    const price = cost.quantity;
    const coinType = cost.unit;
    option.cost = price;
    option.coinType = coinType;
    } else {
      option.cost = 0;
    }
        newValue = [...selectedValue, option]; 
      }
    } else {
      if (itemType === "equipment") {
      const item = await fetch(
             `https://www.dnd5eapi.co${url}`
    );
    const itemData = await item.json();
    const cost = await itemData.cost;
    const price = cost.quantity;
    const coinType = cost.unit;
    option.cost = price;
    option.coinType = coinType;
    } else {
      option.cost = 0;
    }
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
    setTimeout(() => {
      saveShopItems();
    }, "1000");
    
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;

    
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );

  };

  const currentShop = () => {
    <input id="shopTitleText" className="shopTitleText" value={shopName} onChange={getShopName} type="text" />
  };


  
  return (
    <div className="shopPageContainer">
      <div className="myShops">
        <h3 className="myShopsTitle" >My Shops</h3>
        <div className="shops-dropdown">
          <div>=</div>
          {shopButtons()}
          <div className="buttons" onClick={() => newShop()} >New Shop</div>
        </div>
      </div>
      
      <div id="shopTitle" className="shopTitle"> 
        {currentShop()}
        <input id="shopTitleText" className="shopTitleText" value={shopName} onChange={getShopName} minLength="1" type="text" />
        <button id="delete" className="deleteButton buttons" onClick={() => deleteButton()}>Delete Shop</button>
        <button id="save" className="buttons saveButton" onClick={() => updateShopName()} >Update Name</button>
        {publishButton()}
      </div>
      <div id="itemsDropdown" className="dropdown-container itemsDropdown">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-tools">
          <div className="dropdown-tool">
                          <Icon />
                          {placeHolder}
          </div>
          </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu-main">
          {isSearchable && (
            <div className="search-box">
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.id}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      </div>
      {getDisplay()}
    </div>
  );
};

export default ShopDropdown;