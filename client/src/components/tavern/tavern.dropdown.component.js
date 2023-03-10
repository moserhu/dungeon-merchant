import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';




const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" className="icon">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};



const data = window.localStorage.getItem('TavernItems');
const currentUser = AuthService.getCurrentUser();
const userData = window.localStorage.getItem('user');
const API_URL = "http://localhost:8080/";
const registerLink = "http://localhost:3000/register";



const TavernDropdown = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange
}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
    const [searchValue, setSearchValue] = useState("");
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

  useEffect(() => {
    if (data !== null) setSelectedValue(JSON.parse(data))
  }, []);
  
  useEffect(() => {
    window.localStorage.setItem('TavernItems', JSON.stringify(selectedValue))
  }, [selectedValue]);
    


  



  //Save function to send currently selected items to the
 
  


   function saveTavernItems() {

    if (currentUser) {
      const tavernData = {
      id: JSON.stringify((JSON.parse(userData)).uniqid),
      taverns: JSON.stringify(selectedValue),
    };
      axios.put("/update/taverns" || API_URL + "update/taverns", { tavernData }, { headers: authHeader() });
      console.log("items Saved");
    } else {
      window.location.replace("/register" || registerLink);
      alert("Please create an account to save your Tavern!");
    };
    
  };


  

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
                      <h1><Link className='itemNames' to={`/tavern${option.url}`}>{option.value}</Link> </h1>
                      
                              <span key={option.id} className="itemCost">
                                  <input className="cost" data-id={option.id} value={option.cost} onChange={handleCostChange} type="text"  maxLength='6' id="cost" name="cost" />
                                  <div className="cost-dropdown">
                                      <div data-id={option.id} className="cost-select">
                                          <span  className="cost-selected">{option.coinType}</span>
                                          <div className="cost-caret"></div>
                                      </div>
                                      <ul className="cost-menu">
                                          <li data-id={option.id} className="cost-active">GP</li>
                                          <li data-id={option.id} >PP</li>
                                          <li data-id={option.id} >EP</li>
                                          <li data-id={option.id} >SP</li>
                                          <li data-id={option.id} >CP</li>
                                      </ul>
                                  </div>
                              </span>
                              <div className="itemQuantity">
                                  <p className="quantity">Quantity</p>
                                  <input  data-id={option.id} value={option.quantity} onChange={handleQuantityChange} type="number" id="quantity" />
                              </div>
                </span>
                  <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
                >
                <CloseIcon/>
                </span>
              </div>
          ))}
            
        </div>
      );
    }
        
        return selectedValue.label;
  };
  
    

  //---QUANTITY VALUE HANDLER---------------------------------------------------------------
  const handleQuantityChange = (event) => {
    const id = String(event.target.dataset.id);
    const val = String(event.target.value);
    const items = JSON.parse(window.localStorage.getItem('TavernItems'));
    const match = items.find(x => x.id === id);

    function updateItems() {
      window.localStorage.setItem('TavernItems', JSON.stringify(items));
      return;
    };

    function updateQuanity() {
      delete match.quantity;
      match.quantity = val;
      return;
    }

    updateQuanity();
    updateItems();
    setSelectedValue(JSON.parse(window.localStorage.getItem('TavernItems')));

    return;
  };
  
    
    // COST VALUE HANDLER____________________________________________-
  const handleCostChange = (event) => {
    const id = String(event.target.dataset.id);
    const val = String(event.target.value);
    const items = JSON.parse(window.localStorage.getItem('TavernItems'));
    const match = items.find(x => x.id === id);

    function updateItems() {
      window.localStorage.setItem('TavernItems', JSON.stringify(items));
      return;  
    };
       

    function updateCost() {
      delete match.cost;
      match.cost = val;
      return;        
    }
   
      updateCost()
      updateItems();
      setSelectedValue(JSON.parse(window.localStorage.getItem('TavernItems')));
    
    return;
  };

  //-----------------------------------------------------------

  


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
                const items = JSON.parse(window.localStorage.getItem('TavernItems'));
                const match = items.find(x => x.id === id);
                
                selected.innerText = option.innerText;
                const val = selected.innerText;
                
                function updateItems() {
                window.localStorage.setItem('TavernItems', JSON.stringify(items));
                };
       

                function updateCoinType() {
                    delete match.coinType;
                    match.coinType = selected.innerText;
            
                };
                if (match && val) {
                    updateCoinType()
                    updateItems();
                  setSelectedValue(JSON.parse(window.localStorage.getItem('TavernItems')));
                  
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
    


    //___________________________________________________________-
    
    
  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } 
      else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
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



  
  return (
    <div>
      <div className="dropdown-container">
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
      <div>{getDisplay()}</div>
      <button className="buttons" onClick={() => saveTavernItems()} >Save Tavern</button>
    </div>
  );
};


export default TavernDropdown;
