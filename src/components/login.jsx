import React, { useState } from "react";
import { auth } from "./Firebase"; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      navigate("/adminpage");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const styles = {
    pageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
    },
    formContainer: {
      background: "#fff",
      padding: "70px",
      borderRadius: "15px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "100%",
      maxWidth: "300px",
      animation: "fadeIn 1s ease-out",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "40px",
      background: "linear-gradient(90deg, #007bff, #28a745)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      width: "110%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s",
      
    },
    loginButton: {
      background: "linear-gradient(90deg, #007bff, #0056b3)",
      color: "#fff",
      marginTop: "20px",
      marginBottom: "10px",
    },
    loginButtonHover: {
      background: "linear-gradient(90deg, #0056b3, #007bff)",
    },
    resetButton: {
      background: "linear-gradient(90deg, #28a745, #1e7e34)",
      color: "#fff",
    },
    resetButtonHover: {
      background: "linear-gradient(90deg, #1e7e34, #28a745)",
    },
    fadeInAnimation: `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  };

  return (
    <div style={styles.pageContainer}>
      <style>{styles.fadeInAnimation}</style> {/* Keyframes */}
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "-140px",
                top: "10%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.loginButton }}
            onMouseEnter={(e) =>
              Object.assign(e.target.style, styles.loginButtonHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.target.style, styles.loginButton)
            }
          >
            Login
          </button>
        </form>
        <button
          onClick={handleResetPassword}
          style={{ ...styles.button, ...styles.resetButton }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, styles.resetButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, styles.resetButton)
          }
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
