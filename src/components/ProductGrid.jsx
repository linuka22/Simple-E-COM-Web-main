import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './Firebase'; 
import '../CSS/ProductGrid.css'; 

const ProductGrid = () => {
  const categoryImages = {
    Fashion: require('../images/fashion.png'),
    Beauty: require('../images/beauty.png'),
    Sports: require('../images/sports.png'),
    Electronics: require('../images/electronics.png'),
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [inventory, setInventory] = useState([]); 
  const navigate = useNavigate();

  const slideshowImages = ['ad1.jpg', 'ad2.jpg', 'ad3.jpg', 'ad4.jpg', 'ad5.jpg'];

  useEffect(() => {
    
    const inventoryRef = ref(db, 'products');
    onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data ? Object.values(data) : [];
      setInventory(productList);
    });
  }, []);

  
  const filteredInventory = selectedCategory
    ? inventory.filter((item) => item.category === selectedCategory)
    : inventory;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  return (
    <div className="product-grid-container">
      {/* Slideshow */}
      <div className="slideshow">
        <button className="arrow left" onClick={handlePrevious}>&#8249;</button>
        <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slideshowImages.map((image, index) => (
            <img
              key={index}
              src={require(`../images/${image}`)}
              alt={`Slide ${index + 1}`}
              className="slideshow-image"
            />
          ))}
        </div>
        <button className="arrow right" onClick={handleNext}>&#8250;</button>
        <div className="slideshow-navigation">
          {slideshowImages.map((_, index) => (
            <span
              key={index}
              className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="categories">
        {Object.keys(categoryImages).map((cat) => (
          <button
            key={cat}
            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)} 
          >
            <img
              src={categoryImages[cat]}
              alt={cat}
              className="category-image"
            />
            <span>{cat}</span>
          </button>
        ))}
        <button
          className="category-button"
          onClick={() => setSelectedCategory('')} 
        >
          <span>All Products</span>
        </button>
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

export default ProductGrid;