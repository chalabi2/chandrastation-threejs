import React, { useState, useEffect, useRef } from "react";
import ArticleList from "./blog";

const ScrollableBlog = () => {
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    const handleScroll = (event) => {
      const maxScrollY = contentRef.current.offsetHeight - window.innerHeight;
      setScrollY((prevScrollY) => {
        const newScrollY = prevScrollY + event.deltaY * 0.5;
        return Math.min(Math.max(newScrollY, 0), maxScrollY);
      });
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div style={{ transform: `translateY(${-scrollY}px)` }} ref={contentRef}>
      <ArticleList />
    </div>
  );
};

export default ScrollableBlog;
