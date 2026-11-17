import { useState } from "react";
import MenuList from "./MenuList";
import OrderedItems from "./OrderedItems";
import PaymentModal from "./PaymentModal";
import ThankYouMessage from "./ThankYouMessage";
import { menuArray } from "../assets/data";

export default function Home({ cart }) {
  const {
    orderedItems,
    totalPrice,
    addToCart,
    decrementItem,
    removeFromCart,
    clearCart,
  } = cart;
  const [hasActiveOrder, setHasActiveOrder] = useState(orderedItems.length > 0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [completedOrderName, setCompletedOrderName] = useState(null);

  function handleAddItem(newItemId) {
    addToCart(newItemId);
    setHasActiveOrder(true);
    setCompletedOrderName(null);
  }

  function completePayment(paymentFormData) {
    const rawName = paymentFormData.get("name");
    const name = typeof rawName === "string" ? rawName.trim() : "";
    if (!name) return;
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
      <main>
        <MenuList menuItems={menuArray} onAddItem={handleAddItem} />
        {hasActiveOrder && (
        <OrderedItems
          orderedItems={orderedItems}
          totalPrice={totalPrice}
          onAddItem={handleAddItem}
          onDecrementItem={decrementItem}
          onRemoveItem={removeFromCart}
          showPaymentModal={showPaymentModal}
        />
        )}
        {completedOrderName !== null && (
          <ThankYouMessage userName={completedOrderName} />
        )}
      </main>
      <PaymentModal
        onPaymentComplete={completePayment}
        onClose={handleClosePaymentModal}
        isVisible={isPaymentModalOpen}
      />
    </>
  );
}
