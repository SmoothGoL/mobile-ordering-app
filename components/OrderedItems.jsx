import { menuArray } from '../src/assets/data';

export default function OrderedItems(props) {
    function removeOrderItem(e) {
        const orderIdToExclude = parseInt(e.currentTarget.dataset.removeOrderId);
        props.setOrderArr(prevOrderArr => {
            return prevOrderArr.filter(orderItem => orderItem.orderId !== orderIdToExclude);
        });
    }

    function showPaymentModal() {
        props.setAppStatus('paying')
    }

    function getTotalPrice() {
        let totalPrice = 0;
        props.orderArr.forEach(orderItem => {
            totalPrice += menuArray[orderItem.itemId].price;
        });
        return totalPrice;
    }

    const outputHtml = props.orderArr.map(orderItem => {
        const orderedMenuItem = menuArray.filter(menuItem => menuItem.id === orderItem.itemId)[0];
        return (
            <div className="order-item-container" key={orderItem.orderId}>
                <span className="order-item">{orderedMenuItem.name}</span>
                <button className="remove-btn" data-remove-order-id={orderItem.orderId} onClick={removeOrderItem}>remove</button>
                <span className="order-price">${orderedMenuItem.price}</span>
            </div>
        );
    });

    return (
        <section id="order" className="order">
            <h2 className="order-title">Your order</h2>
            {outputHtml}
            <hr className="order-hr" />
            <div className="total-price-container">
                <span className="total-price">Total price:</span>
                <span className="order-price">${getTotalPrice()}</span>
            </div>
            <button
                id="complete-order-btn"
                className="complete-order-btn"
                onClick={showPaymentModal}
                disabled={props.orderArr.length === 0}
            >
                Complete order
            </button>
        </section>
    );
}

