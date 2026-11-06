import headerImage from './src/assets/images/header.png';
import PaymentModal from './components/PaymentModal';
import { useState } from 'react';
import ThankYouMessage from './components/ThankYouMessage';
import MenuItems from './components/MenuItems';
import OrderedItems from './components/OrderedItems';

export default function App() {
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isThankYouMessageVisible, setIsThankYouMessageVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [orderArr, setOrderArr] = useState([]);

    return (
        <>
            <header>
                <img className="header-img" src={headerImage}
                    alt="The restaurant header image with the title, 'Jimmy&apos;s Diner - The best burgers and pizzas in town.'" />
            </header>
            <main>
                <MenuItems setOrderArr={setOrderArr} />
                {orderArr.length > 0 && 
                    <OrderedItems setOrderArr={setOrderArr} />
                }
                {isThankYouMessageVisible && <ThankYouMessage userName={userName} />}
            </main>
            {isPaymentModalVisible && 
                <PaymentModal 
                    setIsPaymentModalVisible={setIsPaymentModalVisible} 
                    setIsThankYouMessageVisible={setIsThankYouMessageVisible}
                    setUserName={setUserName}
                />
            }
        </>
    );
}