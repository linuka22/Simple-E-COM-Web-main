import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/EmployeePage.css'; 

const EmployeePage = () => {
  const navigate = useNavigate(); 

  
  const goToAddProduct = () => {
    navigate('/add');
  };

  
  const goToEditProduct = () => {
    navigate('/editproduct');
  };

  return (
    <div className="employee-page-container">
      <h1>Employee Dashboard</h1>
      <div className="button-container">
        <button className="add-product" onClick={goToAddProduct}>Add Product</button>
        <button className="edit-product" onClick={goToEditProduct}>Edit Product</button>
      </div>
    </div>
  );
};

export default EmployeePage;
