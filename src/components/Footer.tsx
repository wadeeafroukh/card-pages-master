import { FunctionComponent } from "react";
import { getUserFromToken, isLoggedIn } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  darkMode: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const userLoggedin = isLoggedIn();
  const canAccessToBizPages =
    userLoggedin && (user?.isAdmin || user?.isBusiness);

  return (
    <footer className={darkMode ? "bcard-footer dark" : "bcard-footer"}>
      <div className="bcard-footer-top">
        <span className="bcard-footer-item" onClick={() => navigate("/about")}>
          <i className="fa-solid fa-circle-question"></i>
          <span>About</span>
        </span>

        {userLoggedin && (
          <span
            className="bcard-footer-item"
            onClick={() => navigate("/favourit-cards")}
          >
            <i className="fa-solid fa-heart"></i>
            <span>Favourites</span>
          </span>
        )}

        {canAccessToBizPages && (
          <span
            className="bcard-footer-item"
            onClick={() => navigate("/my-card")}
          >
            <i className="fa-solid fa-address-card"></i>
            <span>My cards</span>
          </span>
        )}
      </div>

      <div className="bcard-footer-bottom">
        <p className="footer-text">All rights are reserved WadeeaForukh@</p>
      </div>
    </footer>
  );
};

export default Footer;
