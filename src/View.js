import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import SaveTable from "./components/SaveTable";

function View() {
  const [savedCryptos, setSavedCryptos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptoPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://crypto-listing-ap.herokuapp.com/view")
      .then((res) => {
        setSavedCryptos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changePage(direction) {
    if (direction === "next") {
      const noOfPages = Math.ceil(savedCryptos.length / cryptoPerPage);
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

  function delRequest(cId) {
    axios
      .post("https://crypto-listing-ap.herokuapp.com/view", { id: cId })
      .then((res) => {
        if (res.status === 200) {
          let newCrypto = [...savedCryptos];
          newCrypto = newCrypto.filter((crypto) => crypto.id !== cId);
          setSavedCryptos(newCrypto);
        }
      });
  }

  return (
    <>
      <Cards />
      <SaveTable
        savedCryptos={savedCryptos}
        currentPage={currentPage}
        cryptoPerPage={cryptoPerPage}
        changePage={changePage}
        delRequest={delRequest}
      />
    </>
  );
}

export default View;
