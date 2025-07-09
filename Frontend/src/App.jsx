import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./components/Home/HomePage";
import Proccessors from "./ProductPages/Proccesors";
import System from "./ProductPages/Systems";
import Accerleraters from "./ProductPages/Acceleraters";
import Networks from "./ProductPages/Networks";
import Pdevices from "./ProductPages/PDevices";
import SignUp from "./Login/Signup";
import Login from "./Login/Login";
import Profile from "./Profile";
import CartPage from "./Cart/Cart";
import Intellect from "./Intellect/Intellect";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Main Page Content */}
      <div className="min-vh-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/proccessors" element={<Proccessors />} />
          <Route path="/Systems" element={<System />} />
          <Route path="/Acceleraters" element={<Accerleraters />} />
          <Route path="/Networks" element={<Networks />} />
          <Route path="/PDevices" element={<Pdevices />} />
          <Route path="/Intellect" element={<Intellect />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
