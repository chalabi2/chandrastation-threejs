import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoonScene from "./component/moonScene";
import LoadingScreen from "./component/loading/loading";
import Menu from "./component/menu/menu";
import ArticleList from "./pages/blog";
import Contact from "./pages/contact";
import Services from "./pages/services";
import About from "./pages/about";

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
    <Router>
      <div>
        <Menu />
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
            transition: "opacity 15s cubic-bezier(0.23, 1, 0.32, 1), transform 15s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {loading && <LoadingScreen />}
        </div>
        <Routes>
          <Route path="/" element={<MoonScene />} />
          <Route path="/blog" element={<ArticleList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
