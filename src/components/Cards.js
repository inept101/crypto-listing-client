import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import HeroCard from "./HeroCard";

function Cards() {
  const [cardList, setCardList] = useState([]);
  // const [cryptos, setCryptos] = useState(cardList);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCardList(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(cardList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCardList(items);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="cryptos" direction="horizontal">
        {(provided) => (
          <div
            className="card-container cryptos"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cardList.map((cardData, index) => {
              return (
                <Draggable
                  key={cardData.id}
                  draggableId={cardData.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="h-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="upper-box">
                        <div className="c-name">
                          {cardData.symbol.toUpperCase()}
                        </div>
                        <div className="c-icon">
                          <img src={cardData.image} alt={cardData.name} />
                        </div>
                      </div>
                      <div className="c-value">
                        {cardData.current_price} USD
                      </div>
                    </div>

                    // <HeroCard {...provided.droppableProps} {...provided.dragHandleProps} ref={provided.innerRef}  cardData={cardData} />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Cards;
