import { Header, Footer, PrivateRoute, AdminPrivateRoute, ScrollToTop } from "./components/components.exporter.js";
import {
  About,
  Dashboard,
  Home,
  Projects,
  Signin,
  Signup,
  CreatePost,
  UpdatePost,
  PostPage
} from "./pages/pages.exporter.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/about" element={<About />}  />
          <Route element={<PrivateRoute/>} >
            <Route path="/dashboard" element={<Dashboard />}  />
          </Route>
          <Route element={<AdminPrivateRoute/>} >
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/updatepost/:postID" element={<UpdatePost />} />
          </Route>
          <Route path="/projects" element={<Projects />}  />
          <Route path='/post/:postSlug' element={<PostPage />} />
          <Route path="/signin" element={<Signin />}  />
          <Route path="/signup" element={<Signup />}  />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
