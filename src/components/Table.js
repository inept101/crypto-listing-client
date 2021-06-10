import React from "react";
import CryptoData from "./CryptoData.js";
import Pagination from './Pagination.js'
import "../assets/css/crypto.css";

function Table({ cryptos, currentPage, cryptoPerPage, changePage, searchHandle, searchedCryptos, saveRequest }) {
  return (
    <div className="table-container">
      <div className="table-search">
        <div className="table-head">Crypto Details Table</div>
        <div className="search-box">
          <input placeholder="Search by Crypto name" onChange={(e)=>{searchHandle(e.target.value)}} />
        </div>
      </div>
      <div className="table-header">
        <div className="table-row">
          <div className="header-name header-text">COMPANY NAME</div>
          <div className="header-symbol header-text">Symbol</div>
          <div className="header-mktcap header-text">MARKET CAP</div>
          <div className="header-price header-text">CURRENT PRICE</div>
        </div>
      </div>
      {searchedCryptos.slice((currentPage * cryptoPerPage)-cryptoPerPage, (currentPage * cryptoPerPage)).map((crypto) => {
        return <CryptoData crypto={crypto} key={crypto.id} saveRequest={saveRequest} />;
      })}

      <Pagination cryptos={cryptos} currentPage={currentPage} cryptoPerPage= {cryptoPerPage} changePage={changePage} />
    
        
    </div>
  );
}

export default Table;
