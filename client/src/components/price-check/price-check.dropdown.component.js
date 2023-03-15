import React, { useEffect, useRef, useState } from "react";
import './price-check.css';




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



const PriceCheckDropdown = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange
}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [itemPrice, setItemPrice] = useState([]);
    const [coinType, setCoinType] = useState([]);
    const [desc, setDesc] = useState([]);
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
    
   


//display function to put selected items on page____________________

const getDisplay = () => {

    if (!selectedValue || selectedValue.length === 0) {
        return 
    }
    if (isMulti) {
      return (
          <div className='priceCheckContainer'>
              
          {(selectedValue).map((option) => (

                <div key={option.id} className='priceItems'>
                  <h2 className="priceCheckTitle">{option.value}</h2>
                  
                  <span className="priceContainer">
                      <div className="priceWrapper">
                <strong className="costTitle">COST</strong>
                      <p className="price">{itemPrice} {coinType}</p>
                      </div>
                  </span>
                  <div className="descContainer">
                      {desc}
                        {desc.length === 0 &&
                            <div>
                                This item contains no description.
                            </div>
                        }

                  </div>
              </div>
              
          ))}
            
        </div>
      );
    }
    
        return selectedValue.label;
  };


  
    
    
    
    
    
//------------------------------------------------------------
    
    

    
    
    
    
    
//___________________________________________________________-
       

  const onItemClick = async (option) => {
    let newValue;
    const url = option.url;
    const items = await fetch(
             `https://www.dnd5eapi.co${url}`
    );
    const itemData = await items.json();
    const cost = await itemData.cost;
    const price = cost.quantity;
    const coinType = cost.unit;
    const desc = itemData.desc;
  

    newValue = [option];
     
    setSelectedValue(newValue);
      onChange(newValue);
      setItemPrice(price);  
      setCoinType(coinType);
      setDesc(desc);

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
      {getDisplay()}
    </div>
  );
};

export default PriceCheckDropdown;