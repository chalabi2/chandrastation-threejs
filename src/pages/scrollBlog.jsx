import { useState, useEffect, useRef } from "react";
import ArticleList from "./blog";

const ScrollableBlog = () => {
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const normalizedDeltaY = event.deltaY ? event.deltaY * 1 : -event.detail * 100; // This line is changed
      const maxScrollY = contentRef.current.offsetHeight - window.innerHeight;
      setScrollY((prevScrollY) => {
        const newScrollY = prevScrollY + normalizedDeltaY;
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
