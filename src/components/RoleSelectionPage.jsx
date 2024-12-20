import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const styles = {
    pageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f9f9f9",
    },
    container: {
      textAlign: "center",
      background: "#fff",
      padding: "50px",
      borderRadius: "15px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      animation: "fadeIn 1s ease-out",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "30px",
      background: "linear-gradient(90deg, #007bff, #28a745)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      flexWrap: "wrap",
    },
    button: {
      padding: "15px 40px",
      fontSize: "1.2rem",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      borderRadius: "50px",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      fontWeight: "500",
      letterSpacing: "1px",
    },
    adminButton: {
      background: "linear-gradient(90deg, #007bff, #0056b3)",
    },
    adminButtonHover: {
      background: "linear-gradient(90deg, #0056b3, #007bff)",
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0, 123, 255, 0.3)",
    },
    staffButton: {
      background: "linear-gradient(90deg, #28a745, #1e7e34)",
    },
    staffButtonHover: {
      background: "linear-gradient(90deg, #1e7e34, #28a745)",
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(40, 167, 69, 0.3)",
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
      <style>{styles.fadeInAnimation}</style> {/* Add keyframes to the page */}
      <div style={styles.container}>
        <h1 style={styles.title}>Choose Your Role</h1>
        <div style={styles.buttonsContainer}>
          <button
            onClick={() => navigate("/login")}
            style={styles.adminButton}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, styles.adminButtonHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, styles.adminButton);
            }}
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/stafflogin")}
            style={styles.staffButton}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, styles.staffButtonHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, styles.staffButton);
            }}
          >
            Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
