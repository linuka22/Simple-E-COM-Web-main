import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './Firebase'; 
import '../CSS/SearchResults.css'; 

const SearchResults = () => {
  const categoryImages = {
    Fashion: require('../images/fashion.png'),
    Beauty: require('../images/beauty.png'),
    Sports: require('../images/sports.png'),
    Electronics: require('../images/electronics.png'),
  };

  const [inventory, setInventory] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredInventory, setFilteredInventory] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const inventoryRef = ref(db, 'products');
    onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data ? Object.values(data) : [];
      setInventory(productList);
      setFilteredInventory(productList); 
    });
  }, []);

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  const handleSearchClick = () => {
    
    const filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  
  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[0]; 
    const left = arr.filter((item) => parseFloat(item.price) > parseFloat(pivot.price));  
    const right = arr.filter((item) => parseFloat(item.price) < parseFloat(pivot.price));  
    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  
  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  };

  const merge = (left, right) => {
    let result = [];
    while (left.length && right.length) {
      if (left[0].name < right[0].name) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return [...result, ...left, ...right];
  };

  
  const shellSort = (arr) => {
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i];
        let j = i;
        while (j >= gap && arr[j - gap].quantity > temp.quantity) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    return arr;
  };

  
  const handleSort = (type) => {
    let sortedInventory = [...filteredInventory];
    switch (type) {
      case 'quick':
        sortedInventory = quickSort(sortedInventory);
        break;
      case 'merge':
        sortedInventory = mergeSort(sortedInventory);
        break;
      case 'shell':
        sortedInventory = shellSort(sortedInventory);
        break;
      default:
        break;
    }
    setFilteredInventory(sortedInventory);
  };

  return (
    <div className="product-grid-container">
      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
        <button className="search-button" onClick={handleSearchClick}>
          <img src={require('../images/magnifier.png')} alt="Search" className="search-icon" />
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button onClick={() => handleSort('quick')}>Sort by Price (Descending)</button>
        <button onClick={() => handleSort('merge')}>Sort by Name (A-Z)</button>
        <button onClick={() => handleSort('shell')}>Sort by Quantity (Ascending)</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredInventory.length > 0 ? (
          filteredInventory.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)} 
              style={{ flex: '1 1 calc(20% - 10px)', margin: '5px' }} 
            >
              <img
                src={categoryImages[item.category] || categoryImages['Electronics']} 
                alt={item.name}
                className="product-image"
              />
              <div className="product-name">{item.name}</div>
              <div className="product-price">${item.price}</div>
              <div className="product-quantity">Quantity: {item.quantity}</div>
            </div>
          ))
        ) : (
          <div className="no-products">No products available</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
