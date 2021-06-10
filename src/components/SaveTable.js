import React from "react";
import CryptoData from "./CryptoData";
import Pagination from "./Pagination";
import "../assets/css/crypto.css";

function SaveTable({
  savedCryptos,
  currentPage,
  cryptoPerPage,
  changePage,
  delRequest,
}) {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-row">
          <div className="header-text save-header">SAVED DATA TABLE</div>
        </div>
      </div>
      {savedCryptos
        .slice(
          currentPage * cryptoPerPage - cryptoPerPage,
          currentPage * cryptoPerPage
        )
        .map((crypto) => {
          return (
            <CryptoData
              crypto={crypto}
              key={crypto.id}
              delRequest={delRequest}
              saveData
            />
          );
        })}

      <Pagination
        cryptos={savedCryptos}
        currentPage={currentPage}
        cryptoPerPage={cryptoPerPage}
        changePage={changePage}
        saveData
      />
    </div>
  );
}

export default SaveTable;
