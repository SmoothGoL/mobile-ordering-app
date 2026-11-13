import { useState } from 'react';
import Header from './components/Header';
import MenuItems from './components/MenuItems';
import OrderedItems from './components/OrderedItems';
import PaymentModal from './components/PaymentModal';
import ThankYouMessage from './components/ThankYouMessage';
import { useCart } from './hooks/useCart';
import { menuArray } from './assets/data';

export default function App() {
    const [userName, setUserName] = useState(null);
    const { orderedItems, totalPrice, addToCart, decrementItem, removeFromCart, clearCart } = useCart(menuArray);
    const [appStatus, setAppStatus] = useState(orderedItems.length > 0 ? 'ordering' : 'browsing'); 
    // Possible statuses: 'browsing', 'ordering', 'paying', 'success'

    function handleAddItem(newItemId) {
        addToCart(newItemId);
        setAppStatus('ordering');
    }

    function completePayment(paymentFormData) {
        const rawName = paymentFormData.get('name');
        const name = typeof rawName === 'string' ? rawName.trim() : '';
        setUserName(name);
        clearCart();
        setAppStatus('success');
    }

    function handleClosePaymentModal() {
        setAppStatus('ordering');
    }

    function showPaymentModal() {
        setAppStatus('paying');
    }

    return (
        <>
            <Header />
            <main>
                <MenuItems 
                    menuItems={menuArray}
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