export default function OrderedItems({ orderedItems, totalPrice, onAddItem, onDecrementItem, onRemoveItem, showPaymentModal }) {
    const hasItems = orderedItems.length > 0;

    return (
        <section id="order" className="order">
            {hasItems &&
                <>
                    <h2 className="order-title">Your order</h2>
                    <ul className="order-list">
                        {orderedItems.map(item => (
                            <li className="order-item-container" key={item.id}>
                                <span className="order-item">
                                    {item.name} <span className="order-quantity">x{item.quantity}</span>
                                </span>
                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        aria-label={`Decrease ${item.name} quantity`}
                                        onClick={() => onDecrementItem(item.id)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        aria-label={`Increase ${item.name} quantity`}
                                        onClick={() => onAddItem(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="remove-btn"
                                    aria-label={`Remove ${item.name} from order`}
                                    onClick={() => onRemoveItem(item.id)}
                                >
                                    remove
                                </button>
                                <span className="order-price">${item.subtotal}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="order-hr" />
                </>
            }
            <div className="total-price-container" style={{ marginTop: hasItems ? '0' : '30px' }}>
                <span className="total-price">Total price:</span>
                <span className="order-price">${totalPrice}</span>
            </div>
            <button
                type="button"
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
