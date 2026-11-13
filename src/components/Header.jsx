import headerImage from '../assets/images/header.png';

export default function Header() {
    return (
        <header>
            <img className="header-img" src={headerImage}
                alt="Jimmy's Diner - The best burgers and pizzas in town." />
        </header>
    );
}
