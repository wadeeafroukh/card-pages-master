import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { deleteCard, getAllCards, toggleLike } from "../services/cardService";
import { errorMsg, successMsg, updateMsg } from "../services/feedBacks";
import { getUserFromToken, isLoggedIn } from "../services/authService";
import { data } from "react-router-dom";

interface HomePageProps {
  search: string;
}

const HomePage: FunctionComponent<HomePageProps> = ({ search }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const LoggedIn = isLoggedIn();
  const user = getUserFromToken();
  const userId = user?.id;

  useEffect(() => {
    async function loadCards() {
      try {
        const res = await getAllCards();
        const cardsWithLike: Card[] = res.data.map((card: Card) => ({
          ...card,
          isLiked: card.likes?.includes(userId || "") || false,
        }));

        setCards(cardsWithLike);
      } catch (error) {
        console.error(error);
        errorMsg("Something went wrong while loading cards");
      }
    }

    loadCards();
  }, [userId]);

  const handleLike = async (_id: string) => {
    try {
      await toggleLike(_id);

      setCards((prev) =>
        prev.map((card) =>
          card._id === _id ? { ...card, isLiked: !card.isLiked } : card
        )
      );
    } catch (error) {
      console.error(error);
      errorMsg("Something went wrong with liking");
    }
  };
  const handleDelete = async (_id: string) => {
    try {
      await deleteCard(_id);
      setCards((prev) => prev.filter((card) => card._id !== _id));
      successMsg("Card deleted successfully");
    } catch (error) {
      errorMsg("Error in the deleting procces");
    }
  };

  const q = search.trim().toLowerCase();
  const filterdCards = q
    ? cards.filter(
        (c) =>
          (c.title ?? "").toLowerCase().includes(q) ||
          (c.subtitle ?? "").toLowerCase().includes(q) ||
          (c.description ?? "").toLowerCase().includes(q)
      )
    : cards;

  return (
    <>
      <div className="container p-4 gap-5">
        <h1 className="text-center">Cards page</h1>
        <p className="text-center mt-4 hm-text" style={{ fontSize: "35px", color: "#373737ff"}}>
          Here you can find business cards from all categorys
        </p>
        <div className="row g-4 justify-content-center">
          {filterdCards.map((busCard) => (
            <div
              key={busCard._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <div className="card bcard-card shadow-sm">
                <div className="bcard-imgWrap">
                  <img
                    src={busCard.image?.url}
                    className="bcard-img"
                    alt={busCard.image?.alt}
                  />
                </div>

                <div className="card-body bcard-body">
                  <h5 className="card-title mb-1">{busCard.title}</h5>
                  <p className="text-muted small mb-2">{busCard.subtitle}</p>

                  <p className="card-text bcard-desc mb-3">
                    {busCard.description}
                  </p>

                  <hr className="bcard-divider" />

                  <div className="bcard-info small">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Phone:</span>
                      <span>{busCard.phone}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Address:</span>
                      <span>{busCard.address?.country}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Card Number:</span>
                      <span>{busCard.bizNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer bcard-footer d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    {LoggedIn && (
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleLike(busCard._id!)}
                      >
                        <i
                          className={
                            busCard.isLiked
                              ? "fa-solid fa-heart text-danger"
                              : "fa-regular fa-heart"
                          }
                          style={{ fontSize: 18 }}
                        ></i>
                      </button>
                    )}

                    <a
                      className="btn btn-link p-0 border-0"
                      href={`tel:${busCard.phone}`}
                    >
                      <i
                        className="fa-solid fa-phone"
                        style={{ fontSize: 18 }}
                      ></i>
                    </a>
                  </div>

                  {user?.isAdmin && (
                    <button
                      type="button"
                      className="btn btn-link p-0 border-0"
                      onClick={() => handleDelete(busCard._id!)}
                    >
                      <i
                        className="fa-solid fa-trash-can"
                        style={{ fontSize: 18 }}
                      ></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
