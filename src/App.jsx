import Header from './components/Header';
import PaymentModal from './components/PaymentModal';
import { useState } from 'react';
import ThankYouMessage from './components/ThankYouMessage';
import MenuItems from './components/MenuItems';
import OrderedItems from './components/OrderedItems';
import { useCart } from './hooks/useCart';

export default function App() {
    const [appStatus, setAppStatus] = useState('browsing'); 
    // Possible statuses: 'browsing', 'ordering', 'paying', 'success'
    const [userName, setUserName] = useState(null);
    const { orderedItems, totalPrice, addToCart, decrementItem, removeFromCart, clearCart } = useCart();

    function handleAddItem(newItemId) {
        addToCart(newItemId);
        setAppStatus('ordering');
    }

    function completePayment(paymentFormData) {
        setUserName(paymentFormData.get('name').trim());
        clearCart();
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
                        orderedItems={orderedItems}
                        totalPrice={totalPrice}
                        onAddItem={handleAddItem}
                        onDecrementItem={decrementItem}
                        onRemoveItem={removeFromCart}
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