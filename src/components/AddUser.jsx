import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "./Firebase"; 
import { useNavigate } from "react-router-dom";
import '../CSS/AddUser.css'; 

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [occupation, setOccupation] = useState("staff"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userRef = ref(db, "userAuthList/" + user.uid);
      await set(userRef, {
        name: name,
        occupation: occupation,
      });

      
      navigate("/dashboard"); 
    } catch (err) {
      setError("Error creating user: " + err.message);
    }
  };

  return (
    <div className="add-user-form">
      <div className="form-container">
        <h2 className="title">Add New User</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <label>Occupation</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={occupation === "admin"}
                  onChange={() => setOccupation("admin")}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  value="staff"
                  checked={occupation === "staff"}
                  onChange={() => setOccupation("staff")}
                />
                Staff
              </label>
            </div>
          </div>
          <button type="submit" className="submit-btn">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
