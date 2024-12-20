import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css'; 

const Header = ({ setSearchResults, inventory }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    
    
    setSearchResults(inventory); 
    navigate('/search'); 
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={require('../images/logo.png')} alt="Logo" />
      </div>
      <div className="search-bar">
        <div className="search-container">
          <button onClick={handleSearch}>
            <img src={require('../images/magnifier.png')} alt="Search" />
          </button>
        </div>
      </div>
      <div className="add-product">
        <button onClick={() => navigate('/roleselection')}>
          <img src={require('../images/user.png')} alt="Add Product" />
        </button>
      </div>
    </div>
  );
};

export default Header;
