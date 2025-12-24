import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import FavouriteCards from "./components/FavouriteCards";
import MyCards from "./components/MyCards";
import SandBox from "./components/SandBox";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { getUserFromToken, isLoggedIn } from "./services/authService";
import { useEffect, useState } from "react";
import EditCardPage from "./components/EditCardPage";
import CreateCard from "./components/CreateCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.body.classList.toggle("dark", saved);
    document.documentElement.setAttribute(
      "data-bs-theme",
      saved ? "dark" : "light"
    );
  }, []);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.body.classList.toggle("dark", newMode);
    document.documentElement.setAttribute(
      "data-bs-theme",
      newMode ? "dark" : "light"
    );

    localStorage.setItem("darkMode", newMode.toString());
  };

  const LoggedIn = isLoggedIn();
  const user = getUserFromToken();
  const canUserAccessBusinessPages =
    LoggedIn && (user?.isAdmin || user?.isBusiness);
  const UserIsAdmin = LoggedIn && user?.isAdmin;
  const [search, setSearch] = useState("");
  return (
    <>
      <BrowserRouter>
      <div className="app-shell">

        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          search={search}
          setSearch={setSearch}
          />
        <Routes>
          <Route path="/" element={<HomePage search={search} />} />
          <Route path="/about" element={<About />} />
          {LoggedIn === true && (
            <Route path="/favourit-cards" element={<FavouriteCards />} />
          )}
          {canUserAccessBusinessPages && (
            <>
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

        <Footer darkMode={darkMode} />
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
