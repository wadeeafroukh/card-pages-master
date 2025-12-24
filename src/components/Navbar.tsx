import { FunctionComponent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getUserFromToken,
  isLoggedIn,
  removeToken,
} from "../services/authService";

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: Function;
  children?: React.ReactNode;
  search: string;
  setSearch: (val: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  children,
  search,
  setSearch,
}) => {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/");
  };

  const LoggedIn = isLoggedIn();
  const user = getUserFromToken();
  const canUserAccessBusinessPages =
    LoggedIn && (user?.isAdmin || user?.isBusiness);
  const UserIsAdmin = LoggedIn && user?.isAdmin;

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm bcard-navbar ${
        darkMode ? "navbar-dark" : "navbar-dark"
      }`}
      style={{ backgroundColor: darkMode ? "#111" : "#0d6efd" }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand fw-bold"
          to={"/"}
          style={{ color: "#ffffffff", fontSize: "1.7rem" }}
        >
          BCard
        </NavLink>

        <button
          className="navbar-toggler bcard-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2  mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/about"}
                style={{ color: "#ffffffff", fontSize: "1.1rem" }}
              >
                ABOUT
              </NavLink>
            </li>
            {LoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={"/favourit-cards"}
                  style={{ color: "#ffffffff", fontSize: "1.1rem" }}
                >
                  FAV CARDS
                </NavLink>
              </li>
            )}
            {canUserAccessBusinessPages && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/my-card"}
                    style={{ color: "#ffffffff", fontSize: "1.1rem" }}
                  >
                    MY CARDS
                  </NavLink>
                </li>
              </>
            )}
            {UserIsAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={"/sandbox"}
                  style={{ color: "#ffffffff", fontSize: "1.1rem" }}
                >
                  SANDBOX
                </NavLink>
              </li>
            )}
          </ul>

          <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: "1rem" }}
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              style={{ fontSize: "1rem" }}
            >
              <i className="fa-solid fa-magnifying-glass text-light"></i>
            </button>
          </form>

          <div className="d-flex align-items-center gap-3">
            <button onClick={() => toggleDarkMode?.()} className="btn">
              <i
                style={{
                  fontSize: 30,
                  color: darkMode ? "#fff" : "rgba(0, 0, 0, 1)",
                }}
                className="fa-solid fa-sun"
              ></i>
            </button>

            <i
              className="fa-solid fa-user-circle"
              style={{
                color: "#ffffffff",
                fontSize: "1.9rem",
                cursor: "pointer",
              }}
            ></i>
          </div>
          {LoggedIn && (
            <button
              onClick={logout}
              type="button"
              className="btn btn-danger text-white mx-4"
            >
              Logout
            </button>
          )}
          {!LoggedIn && (
            <>
              <button
                onClick={() => navigate("/register")}
                type="button"
                style={{ fontSize: "600" }}
                className={
                  darkMode
                    ? "btn btn-light text-dark mx-1"
                    : "btn btn-outline-light text-dark mx-1"
                }
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                type="button"
                className={
                  darkMode
                    ? "btn btn-light text-dark mx-1"
                    : "btn btn-outline-light text-dark mx-1"
                }
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
