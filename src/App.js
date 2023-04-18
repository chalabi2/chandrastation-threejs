import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoonScene from "./component/moonScene";
import Menu from "./component/menu/menu";
import ScrollableBlog from "./pages/scrollBlog";
import Contact from "./pages/contact";
import Services from "./pages/services";
import About from "./pages/about";

function App() {

  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<MoonScene />} />
          <Route path="/blog" element={<ScrollableBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
