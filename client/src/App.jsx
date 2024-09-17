import {Header, Footer} from "./components/components.exporter.js";
import {
  About,
  Dashboard,
  Home,
  Projects,
  Signin,
  Signup,
} from "./pages/pages.exporter.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/about" element={<About />}  />
          <Route path="/dashboard" element={<Dashboard />}  />
          <Route path="/projects" element={<Projects />}  />
          <Route path="/signin" element={<Signin />}  />
          <Route path="/signup" element={<Signup />}  />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
