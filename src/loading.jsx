import React from "react";

  
  const LoadingScreen = () => {


    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          opacity: 1,
        transition: "opacity 3s cubic-bezier(0.23, 1, 0.32, 1), transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <img src='./chandra.png' alt="Chandra Station" style={{ width: "300px" }} />
      </div>
    );
  };

export default LoadingScreen;