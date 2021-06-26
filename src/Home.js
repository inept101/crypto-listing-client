import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import Table from "./components/Table";
import "./assets/css/app.css";

function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [cryptoPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://crypto-listing-ap.herokuapp.com/home")
      .then((res) => {
        setCryptos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changePage(direction) {
    if (direction === "next") {
      const noOfPages = Math.ceil(cryptos.length / cryptoPerPage);
      if (currentPage < noOfPages) {
        const c = currentPage + 1;
        setCurrentPage(c);
      }
    } else if (direction === "back") {
      if (currentPage >= 2) {
        const c = currentPage - 1;
        setCurrentPage(c);
      }
    }
  }

  function searchHandle(searchValue) {
    setSearch(searchValue);
  }

  const searchedCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  function saveRequest(cId) {
    axios
      .post("https://crypto-listing-ap.herokuapp.com/home", { id: cId })
      .then((res) => {
        if (res.status === 200) {
          const newCrypto = [...cryptos];
          const crypto = newCrypto.find((crypto) => crypto.id === cId);
          crypto.saved = !crypto.saved;
          setCryptos(newCrypto);
        }
      });
  }

  return (
    <>
      <Cards />
      <Table
        cryptos={cryptos}
        currentPage={currentPage}
        cryptoPerPage={cryptoPerPage}
        changePage={changePage}
        searchHandle={searchHandle}
        searchedCryptos={searchedCryptos}
        saveRequest={saveRequest}
      />
    </>
  );
}

export default Home;
