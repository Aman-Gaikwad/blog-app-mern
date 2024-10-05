import { Header, Footer, PrivateRoute, AdminPrivateRoute } from "./components/components.exporter.js";
import {
  About,
  Dashboard,
  Home,
  Projects,
  Signin,
  Signup,
  CreatePost,
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
          <Route element={<PrivateRoute/>} >
            <Route path="/dashboard" element={<Dashboard />}  />
          </Route>
          <Route element={<AdminPrivateRoute/>} >
            <Route path="/createpost" element={<CreatePost/>} />
          </Route>
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
