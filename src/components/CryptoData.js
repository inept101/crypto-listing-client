import React from "react";
import "../assets/css/crypto.css";
import { Link } from "react-router-dom";

function CryptoData({ crypto, saveRequest, saveData, delRequest }) {
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (num > 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num > 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num < 1000) {
      return num;
    }
  }

  return (
    <div className="col-row">
      <div className="col-name">{crypto.name}</div>

      <div className="col-symbol">
        <span>
          <span className="dot" /> {crypto.symbol}
        </span>
      </div>

      <div className="col-mktcap">${numFormatter(crypto.market_cap)}</div>
      <div className="col-buttons">
        {crypto.saved ? (
          saveData ? (
            <button
              className="btn-view"
              onClick={() => {
                delRequest(crypto.id);
              }}
            >
              Delete
            </button>
          ) : (
            <Link to="/view" className="btn-view btn-a">
              View
            </Link>
          )
        ) : (
          <button
            className="btn-save"
            onClick={() => {
              saveRequest(crypto.id);
            }}
          >
            Save Data
          </button>
        )}
      </div>

      <div className="col-price">
        <div className="price-text">${crypto.current_price}</div>
        <div className="currency-text">USD</div>
      </div>
    </div>
  );
}

export default CryptoData;
