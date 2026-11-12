import Header from './components/Header';
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

    function handleAddItem(newItemId) {
        setOrderArr(prevOrderArr => [...prevOrderArr, {itemId: newItemId, uuid: crypto.randomUUID()}]);
        setAppStatus('ordering');
    }

    return (
        <>
            <Header />
            <main>
                <MenuItems 
                    onAddItem={handleAddItem}
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
            <PaymentModal 
                setAppStatus={setAppStatus}
                setUserName={setUserName}
                setOrderArr={setOrderArr}
                isVisible={appStatus === 'paying'}
            />
        </>
    );
}