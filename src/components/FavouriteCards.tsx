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
      <div className="container-fluid text-center p-4">
        <h1 className="mb-4">Favourite Cards</h1>

        {likedCards.length === 0 ? (
          <p>You have no favourite cards yet.</p>
        ) : (
          <div className="container gap-2">
            <div className="row g-4 justify-content-center">
              {likedCards.map((card: Card) => (
                <div
                  key={card._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                >
                  <div className="card bcard-card shadow-sm">
                    <div className="bcard-imgWrap">
                      <img
                        src={card.image?.url}
                        className="bcard-img"
                        alt={card.image?.alt}
                      />
                    </div>

                    <div className="card-body bcard-body">
                      <h5 className="card-title mb-1">{card.title}</h5>
                      <p className="text-muted small mb-2">{card.subtitle}</p>

                      <p className="card-text bcard-desc mb-3">
                        {card.description}
                      </p>

                      <hr className="bcard-divider" />

                      <div className="bcard-info small">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Phone:</span>
                          <span>{card.phone}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Address:</span>
                          <span>{card.address?.country}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Card Number:</span>
                          <span>{card.bizNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer bcard-footer d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => likeMyCard(card._id!)}
                        >
                          <i
                            className={
                              card.isLiked
                                ? "fa-solid fa-heart text-danger"
                                : "fa-regular fa-heart"
                            }
                            style={{ fontSize: 18 }}
                          ></i>
                        </button>

                        <a
                          className="btn btn-link p-0 border-0"
                          href={`tel:${card.phone}`}
                        >
                          <i
                            className="fa-solid fa-phone"
                            style={{ fontSize: 18 }}
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FavouriteCards;
