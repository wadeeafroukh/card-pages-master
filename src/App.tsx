import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import About from "./components/About";
import FavouriteCards from "./components/FavouriteCards";
import MyCards from "./components/MyCards";
import SandBox from "./components/SandBox";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { getUserFromToken, isLoggedIn } from "./services/authService";
import { useState } from "react";
import EditCardPage from "./components/EditCardPage";
import CreateCard from "./components/CreateCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const LoggedIn = isLoggedIn();
  const user = getUserFromToken();
  const canUserAccessBusinessPages =
    LoggedIn && (user?.isAdmin || user?.isBusiness);
  const UserIsAdmin = LoggedIn && user?.isAdmin;
  return (
    <>
      <BrowserRouter>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {LoggedIn === true && (
            <Route path="/favourit-cards" element={<FavouriteCards />} />
          )}
          {canUserAccessBusinessPages && (
            <>
              <Route path="/contact-page" element={<ContactPage />} />
              <Route path={`/my-card`} element={<MyCards />} />
            </>
          )}
          {UserIsAdmin && <Route path="/sandbox" element={<SandBox />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-card/:id" element={<EditCardPage />} />
          <Route path="/create-card" element={<CreateCard />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
