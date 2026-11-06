import headerImage from './src/assets/images/header.png';
import PaymentModal from './components/PaymentModal';
import { useState } from 'react';
import ThankYouMessage from './components/ThankYouMessage';
import MenuItems from './components/MenuItems';
import OrderedItems from './components/OrderedItems';

export default function App() {
    const [appStatus, setAppStatus] = useState('browsing'); 
    // Possible statuses: 'browsing', 'ordering', 'paying', 'success'
    const [userName, setUserName] = useState(null);
    const [orderArr, setOrderArr] = useState([]);

    return (
        <>
            <header>
                <img className="header-img" src={headerImage}
                    alt="The restaurant header image with the title, 'Jimmy&apos;s Diner - The best burgers and pizzas in town.'" />
            </header>
            <main>
                <MenuItems 
                    setOrderArr={setOrderArr} 
                    appStatus={appStatus}
                    setAppStatus={setAppStatus}
                />
                {(appStatus === 'ordering' || appStatus === 'paying') && 
                    <OrderedItems 
                        setOrderArr={setOrderArr} 
                        orderArr={orderArr} 
                        setAppStatus={setAppStatus}
                    />
                }
                {appStatus === 'success' && <ThankYouMessage userName={userName} />}
            </main>
            {appStatus === 'paying' && 
                <PaymentModal 
                    setAppStatus={setAppStatus}
                    setUserName={setUserName}
                    setOrderArr={setOrderArr}
                />
            }
        </>
    );
}