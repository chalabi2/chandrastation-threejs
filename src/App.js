import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoonScene from "./component/moonScene";
import Menu from "./component/menu/menu";
import ArticleList from "./pages/blog";
import Contact from "./pages/contact";
import Services from "./pages/services";
import About from "./pages/about";

function App() {

  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/moon-station" element={<MoonScene />} />
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
