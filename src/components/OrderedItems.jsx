import { menuArray } from '../assets/data';

export default function OrderedItems({ orderArr, onAddItem, onDecrementItem, onRemoveItem, showPaymentModal }) {
    function getTotalPrice() {
        return orderArr.reduce((total, orderItem) => {
            const menuItem = menuArray.find(item => item.id === orderItem.itemId);
            return total + menuItem.price * orderItem.quantity;
        }, 0);
    }

    const outputHtml = orderArr.map(orderItem => {
        const orderedMenuItem = menuArray.find(menuItem => menuItem.id === orderItem.itemId);
        return (
            <div className="order-item-container" key={orderItem.itemId}>
                <span className="order-item">
                    {orderedMenuItem.name} <span className="order-quantity">x{orderItem.quantity}</span>
                </span>
                <div className="quantity-controls">
                    <button
                        className="qty-btn"
                        aria-label={`Decrease ${orderedMenuItem.name} quantity`}
                        onClick={() => onDecrementItem(orderItem.itemId)}
                    >
                        -
                    </button>
                    <button
                        className="qty-btn"
                        aria-label={`Increase ${orderedMenuItem.name} quantity`}
                        onClick={() => onAddItem(orderItem.itemId)}
                    >
                        +
                    </button>
                </div>
                <button className="remove-btn" onClick={() => onRemoveItem(orderItem.itemId)}>remove</button>
                <span className="order-price">${orderedMenuItem.price * orderItem.quantity}</span>
            </div>
        );
    });

    return (
        <section id="order" className="order">
            {(orderArr.length > 0) &&
                <>
                    <h2 className="order-title">Your order</h2>
                    {outputHtml}
                    <hr className="order-hr" />
                </>
            }
            <div className="total-price-container" style={{marginTop: (orderArr.length > 0 ? '0' : '30px')}}>
                <span className="total-price">Total price:</span>
                <span className="order-price">${getTotalPrice()}</span>
            </div>
            <button
                id="complete-order-btn"
                className="complete-order-btn"
                onClick={showPaymentModal}
                disabled={orderArr.length === 0}
            >
                Complete order
            </button>
        </section>
    );
}
