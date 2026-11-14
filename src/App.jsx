import { useState } from 'react';
import Header from './components/Header';
import MenuList from './components/MenuList';
import OrderedItems from './components/OrderedItems';
import PaymentModal from './components/PaymentModal';
import ThankYouMessage from './components/ThankYouMessage';
import { useCart } from './hooks/useCart';
import { menuArray } from './assets/data';

export default function App() {
    const { orderedItems, totalPrice, addToCart, decrementItem, removeFromCart, clearCart } = useCart(menuArray);
    const [hasActiveOrder, setHasActiveOrder] = useState(orderedItems.length > 0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [completedOrderName, setCompletedOrderName] = useState(null);

    function handleAddItem(newItemId) {
        addToCart(newItemId);
        setHasActiveOrder(true);
        setCompletedOrderName(null);
    }

    function completePayment(paymentFormData) {
        const rawName = paymentFormData.get('name');
        const name = typeof rawName === 'string' ? rawName.trim() : '';
        clearCart();
        setHasActiveOrder(false);
        setIsPaymentModalOpen(false);
        setCompletedOrderName(name);
    }

    function handleClosePaymentModal() {
        setIsPaymentModalOpen(false);
    }

    function showPaymentModal() {
        setIsPaymentModalOpen(true);
    }

    return (
        <>
            <Header />
            <main>
                <MenuList 
                    menuItems={menuArray}
                    onAddItem={handleAddItem}
                />
                {hasActiveOrder && 
                    <OrderedItems 
                        orderedItems={orderedItems}
                        totalPrice={totalPrice}
                        onAddItem={handleAddItem}
                        onDecrementItem={decrementItem}
                        onRemoveItem={removeFromCart}
                        showPaymentModal={showPaymentModal}
                    />
                }
                {completedOrderName !== null && <ThankYouMessage userName={completedOrderName} />}
            </main>
            <PaymentModal 
                onPaymentComplete={completePayment}
                onClose={handleClosePaymentModal}
                isVisible={isPaymentModalOpen}
            />
        </>
    );
}