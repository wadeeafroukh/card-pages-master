import { FunctionComponent, useEffect, useState } from "react";
import { getUserFromToken } from "../services/authService";
import { getAllCards, toggleLike } from "../services/cardService";
import { errorMsg } from "../services/feedBacks";
import { Card } from "../interfaces/Card";

interface FavouriteCardsProps {}

const FavouriteCards: FunctionComponent<FavouriteCardsProps> = () => {
  const [likedCards, setLikedCards] = useState<Card[]>([]);
  const user = getUserFromToken();
  const userId = user?.id;

  
  useEffect(() => {
  const getMyLikedCard = async () => {
    try {
      if (!userId) {
        setLikedCards([]);
        return;
      }

      const res = await getAllCards();

      const onlyLiked: Card[] = res.data
        .filter((card: Card) => card.likes?.includes(userId))
        .map((card: Card) => ({ ...card, isLiked: true }));

      setLikedCards(onlyLiked);
    } catch (error) {
      errorMsg("Error fetching liked cards");
    }
  };

  getMyLikedCard();
}, [userId]);

  const likeMyCard = async (_id: string) => {
    try {
      await toggleLike(_id);
      setLikedCards((prev) => prev.filter((card) => card._id !== _id));
    } catch (error) {
      console.error(error);
      errorMsg("Something went wrong with liking");
    }
  };

  return (
    <>
      <div className="container-fluid text-center p-3">
        <h1 className="mb-4">Favourite Cards</h1>

        {likedCards.length === 0 ? (
          <p>You have no favourite cards yet.</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {likedCards.map((card) => (
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavouriteCards;
