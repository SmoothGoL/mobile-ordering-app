import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AccountPage from "./components/AccountPage";
import { useCart } from "./hooks/useCart";
import { menuArray } from "./assets/data";

export default function App() {
  const navigate = useNavigate();
  const cart = useCart(menuArray);
  const sites = {
    home: <Home cart={cart} />,
    account: <AccountPage />,
  };
  const [currentPage, setCurrentPage] = useState("home");

  function returnHome(e) {
    e.preventDefault();
    navigate("/");
    setCurrentPage("home");
  }

  function openAccountPage(e) {
    e.preventDefault();
    navigate("/account");
    setCurrentPage("account");
  }

  return (
    <>
      <Header
        numberOfItems={cart.numberOfItems}
        returnHome={returnHome}
        openAccountPage={openAccountPage}
      />
      {sites[currentPage]}
    </>
  );
}
