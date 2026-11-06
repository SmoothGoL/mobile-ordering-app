import headerImage from './src/assets/images/header.png';
import PaymentModal from './components/PaymentModal';
import { useState } from 'react';

export default function App() {
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

    return (
        <>
            <header>
                <img className="header-img" src={headerImage}
                    alt="The restaurant header image with the title, 'Jimmy&apos;s Diner - The best burgers and pizzas in town.'" />
            </header>
            <main>
                <section id="menu-items" className="menu-items"></section>
                {/* <p id="window-width"></p> */}
                <section id="order" className="order"></section>
                <div id="thank-you-message-container" className="thank-you-message-container">
                    <p className="thank-you-message">Thanks, {name}! Your order is on its way!</p>
                </div>
            </main>
            {isPaymentModalVisible && <PaymentModal />}
        </>
    );
}