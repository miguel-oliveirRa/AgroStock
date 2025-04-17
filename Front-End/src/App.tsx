import Home from "./pages/home/home";
import Create from "./pages/create/create";
import Login from "./pages/login/login";
import UpdateProduct from "./pages/update/update";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/update" element={<UpdateProduct />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
