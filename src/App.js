import React, { useState, useEffect } from "react";
import MoonScene from "./component/moonScene";
import LoadingScreen from "./loading";
import Menu from "./component/menu";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Change this value to control the duration of the loading screen

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Menu/>
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
          opacity: loading ? 1 : 0,
          pointerEvents: loading ? "auto" : "none",
          transform: loading ? "scale(1)" : "scale(1.1)",
        transition: "opacity 7s cubic-bezier(0.23, 1, 0.32, 1), transform 3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {loading && <LoadingScreen />}
      </div>
      <MoonScene />
      {/* Add other components here */}
    </div>
  );
}

export default App;