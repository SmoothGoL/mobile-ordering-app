import headerImage from "../assets/images/header.png";

export default function Header({ numberOfItems, returnHome, openAccountPage }) {
  return (
    <header>
      <img
        className="header-img"
        src={headerImage}
        alt="Jimmy's Diner - The best burgers and pizzas in town."
      />
      <nav>
        <a href="/" onClick={returnHome}>
          Home / Cart ({numberOfItems})
        </a>
        <a href="/account" onClick={openAccountPage}>
          Account
        </a>
      </nav>
    </header>
  );
}
