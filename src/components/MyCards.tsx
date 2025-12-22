import { FunctionComponent, useEffect, useState } from "react";
import { getUserFromToken } from "../services/authService";
import {
  createCard,
  deleteCard,
  getMyCards,
  toggleLike,
} from "../services/cardService";
import { Card } from "../interfaces/Card";
import { errorMsg, successMsg, updateMsg } from "../services/feedBacks";
import { useNavigate } from "react-router-dom";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const navigate = useNavigate();
  const [myCards, setMyCards] = useState<Card[]>([]);
  useEffect(() => {
    async function fetchMyCards() {
      try {
        const res = await getMyCards();
        setMyCards(res.data);
      } catch (error) {
        errorMsg("Something went wrong while loading your cards");
      }
    }
    fetchMyCards();
  }, []);
  const likeMyCard = async (_id: string) => {
    try {
      await toggleLike(_id);

      setMyCards((prev) =>
        prev.map((card) =>
          card._id === _id ? { ...card, isLiked: !card.isLiked } : card
        )
      );
    } catch (error) {
      console.error(error);
      errorMsg("Something went wrong with liking");
    }
  };
  const deleteMyCard = async (_id: string) => {
    try {
      await deleteCard(_id);
      setMyCards((prev) => prev.filter((card) => card._id !== _id));
      successMsg("Card deleted successfully");
    } catch (error) {
      errorMsg("Error in the deleting procces");
    }
  };

  const editMyCard =  (_id: string, updatedCard: Card) => {
    setMyCards((prev) =>
      prev.map((card) => (card._id === _id ? updatedCard : card))
    );
    navigate("/edit-card/" + _id);
  }

  const goToCreateCard = () => {
    navigate("/create-card");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center  flex-column p-3 gap-3">
        <h1>My Cards</h1>
        {myCards.length === 0 && (
          <p>You have no cards yet, Add new your new card</p>
        )}
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {myCards.map((card: Card) => (
            <div
              key={card._id}
              className="card shadow-sm"
              style={{ width: "18rem" }}
            >
              <div className="overflow-hidden" style={{ height: "180px" }}>
                <img
                  src={card.image?.url}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt={card.image?.alt}
                />
              </div>

              <div className="card-body border-bottom">
                <h5 className="card-title mb-2">{card.title}</h5>
                <p
                  className="card-text mb-0 overflow-hidden"
                  style={{ height: "72px" }}
                >
                  {card.description}.
                </p>
              </div>

              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-link p-0 border-0"
                    onClick={() => likeMyCard(card._id!)}
                  >
                    <i
                      className={
                        card.isLiked
                          ? "fa-solid fa-heart text-danger fa-lg"
                          : "fa-solid fa-heart fa-lg"
                      }
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-link p-0 border-0"
                    onClick={() => editMyCard(card._id!, card)}
                  ><i className="fa-solid fa-pen-to-square"></i></button>

                  <a
                    className="btn btn-link p-0 border-0"
                    href={`tel:${card.phone}`}
                  >
                    <i className="fa-solid fa-phone fa-lg"></i>
                  </a>

                  <button
                    type="button"
                    className="btn btn-link p-0 border-0"
                    onClick={() => deleteMyCard(card._id!)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
          <button onClick={goToCreateCard} type="button" className="btn">
            <i className="fa-solid fa-plus display-5 text-primary"></i>
          </button>
      </div>
    </>
  );
};

export default MyCards;
