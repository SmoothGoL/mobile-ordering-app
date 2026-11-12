import { menuArray } from '../assets/data';

export default function OrderedItems({ orderArr, onRemoveItem, showPaymentModal}) {
    function getTotalPrice() {
        return orderArr.reduce((total, orderItem) => {
            // Using the index lookup you already had, or use .find() if you changed it
            return total + menuArray.find(item => item.id === orderItem.itemId).price; 
        }, 0);
    }

    const outputHtml = orderArr.map(orderItem => {
        const orderedMenuItem = menuArray.find(menuItem => menuItem.id === orderItem.itemId);
        return (
            <div className="order-item-container" key={orderItem.uuid}>
                <span className="order-item">{orderedMenuItem.name}</span>
                <button className="remove-btn" onClick={() => onRemoveItem(orderItem.uuid)}>remove</button>
                <span className="order-price">${orderedMenuItem.price}</span>
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
