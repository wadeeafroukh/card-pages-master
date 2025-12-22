import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { deleteCard, getAllCards, toggleLike } from "../services/cardService";
import { errorMsg, successMsg, updateMsg } from "../services/feedBacks";
import { getUserFromToken, isLoggedIn } from "../services/authService";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const LoggedIn = isLoggedIn();
  const user = getUserFromToken();
  const userId = user?.id;

  useEffect(() => {
    async function loadCards() {
      try {
        const res = await getAllCards();
        console.log(res.data[0]);
        console.log(userId);
        

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

  return (
    <>
      <div className="container-fluid p-3 d-flex flex-column align-items-center gap-3">
        <h1>Home page</h1>
        <h2 style={{ fontSize: "20px" }}>
          Here you can find business cards from all categories
        </h2>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {cards.map((busCard) => (
            <div
              key={busCard._id}
              className="card shadow-sm"
              style={{ width: "18rem" }}
            >
              <div className="overflow-hidden" style={{ height: "180px" }}>
                <img
                  src={busCard.image?.url}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt={busCard.image?.alt}
                />
              </div>

              <div className="card-body border-bottom">
                <h5 className="card-title mb-2">{busCard.title}</h5>
                <p
                  className="card-text mb-0 overflow-hidden"
                  style={{ height: "72px" }}
                >
                  {busCard.description}.
                </p>
              </div>

              <div className="card-body d-flex justify-content-between align-items-center">
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
                            ? "fa-solid fa-heart text-danger fa-lg"
                            : "fa-solid fa-heart fa-lg"
                        }
                      ></i>
                    </button>
                  )}

                  <a
                    className="btn btn-link p-0 border-0"
                    href={`tel:${busCard.phone}`}
                  >
                    <i className="fa-solid fa-phone fa-lg"></i>
                  </a>
                </div>

                {user?.isAdmin && (
                  <button
                    type="button"
                    className="btn btn-link p-0 border-0"
                    onClick={() => handleDelete(busCard._id!)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
