import { menuArray } from '../assets/data';

export default function OrderedItems({ orderArr, onAddItem, onDecrementItem, onRemoveItem, showPaymentModal }) {
    const orderedItems = orderArr.map(orderItem => {
        const menuItem = menuArray.find(item => item.id === orderItem.itemId);
        return {
            ...menuItem,
            quantity: orderItem.quantity,
            subtotal: menuItem.price * orderItem.quantity,
        };
    });

    const totalPrice = orderedItems.reduce((total, item) => total + item.subtotal, 0);
    const hasItems = orderedItems.length > 0;

    return (
        <section id="order" className="order">
            {hasItems &&
                <>
                    <h2 className="order-title">Your order</h2>
                    {orderedItems.map(item => (
                        <div className="order-item-container" key={item.id}>
                            <span className="order-item">
                                {item.name} <span className="order-quantity">x{item.quantity}</span>
                            </span>
                            <div className="quantity-controls">
                                <button
                                    className="qty-btn"
                                    aria-label={`Decrease ${item.name} quantity`}
                                    onClick={() => onDecrementItem(item.id)}
                                >
                                    -
                                </button>
                                <button
                                    className="qty-btn"
                                    aria-label={`Increase ${item.name} quantity`}
                                    onClick={() => onAddItem(item.id)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>remove</button>
                            <span className="order-price">${item.subtotal}</span>
                        </div>
                    ))}
                    <hr className="order-hr" />
                </>
            }
            <div className="total-price-container" style={{marginTop: (hasItems ? '0' : '30px')}}>
                <span className="total-price">Total price:</span>
                <span className="order-price">${totalPrice}</span>
            </div>
            <button
                id="complete-order-btn"
                className="complete-order-btn"
                onClick={showPaymentModal}
                disabled={!hasItems}
            >
                Complete order
            </button>
        </section>
    );
}
