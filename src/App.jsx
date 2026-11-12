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
        setOrderArr(prevOrderArr => {
            const existingItem = prevOrderArr.find(orderItem => orderItem.itemId === newItemId);
            if (existingItem) {
                return prevOrderArr.map(orderItem =>
                    orderItem.itemId === newItemId
                        ? { ...orderItem, quantity: orderItem.quantity + 1 }
                        : orderItem
                );
            }
            return [...prevOrderArr, { itemId: newItemId, quantity: 1 }];
        });
        setAppStatus('ordering');
    }

    function handleDecrementItem(itemId) {
        setOrderArr(prevOrderArr =>
            prevOrderArr
                .map(orderItem =>
                    orderItem.itemId === itemId
                        ? { ...orderItem, quantity: orderItem.quantity - 1 }
                        : orderItem
                )
                .filter(orderItem => orderItem.quantity > 0)
        );
    }

    function handleRemoveItem(itemId) {
        setOrderArr(prevOrderArr =>
            prevOrderArr.filter(orderItem => orderItem.itemId !== itemId)
        );
    }

    function completePayment(paymentFormData) {
        setUserName(paymentFormData.get('name').trim());
        setOrderArr([]);
        setAppStatus('success')
    }

    function handleClosePaymentModal() {
        setAppStatus('ordering')
    }

    function showPaymentModal() {
        setAppStatus('paying')
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
                        orderArr={orderArr}
                        onAddItem={handleAddItem}
                        onDecrementItem={handleDecrementItem}
                        onRemoveItem={handleRemoveItem}
                        showPaymentModal={showPaymentModal}
                    />
                }
                {appStatus === 'success' && <ThankYouMessage userName={userName} />}
            </main>
            <PaymentModal 
                onPaymentComplete={completePayment}
                onClose={handleClosePaymentModal}
                isVisible={appStatus === 'paying'}
            />
        </>
    );
}