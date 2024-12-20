import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; 
import "../CSS/Calculate.css";

const Calculate = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [products, setProducts] = useState([]);
  
  
  const calculateTotalValueRecursive = (filteredProducts, index = 0, total = 0) => {
    if (index >= filteredProducts.length) {
      return total;
    }

    const product = filteredProducts[index];
    
    const productTotal = parseInt(product.price) * parseInt(product.quantity);
    return calculateTotalValueRecursive(filteredProducts, index + 1, total + productTotal);
  };

  
  const fetchProducts = () => {
    const db = getDatabase();
    const productsRef = ref(db, 'products'); 

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.values(data)); 
      } else {
        setProducts([]); 
      }
    });

    return () => unsubscribe(); 
  };

  
  const calculateTotalValue = (category) => {
    const filteredProducts =
      category === "all" ? products : products.filter((product) => product.category === category);

    
    const total = calculateTotalValueRecursive(filteredProducts);
    setTotalValue(total);
  };

  useEffect(() => {
    
    fetchProducts();
  }, []);

  return (
    <div className="calculate-page">
      <h1>Product Category Calculation</h1>
      <div className="category-buttons">
        <button onClick={() => calculateTotalValue("Electronics")}>Electronics</button>
        <button onClick={() => calculateTotalValue("Fashion")}>Fashion</button>
        <button onClick={() => calculateTotalValue("Beauty")}>Beauty</button>
        <button onClick={() => calculateTotalValue("Sports")}>Sports</button>
        <button onClick={() => calculateTotalValue("all")}>All Products</button>
      </div>
      <div className="total-value">
        <h3>Total Value: ${totalValue}</h3>
      </div>
    </div>
  );
};

export default Calculate;
