import { memo } from 'react';
import headerImage from '../assets/images/header.png';

const Header = memo(function Header() {
    return (
        <header>
            <img className="header-img" src={headerImage}
                alt="The restaurant header image with the title, 'Jimmy&apos;s Diner - The best burgers and pizzas in town.'" />
        </header>
    );
});

export default Header;
