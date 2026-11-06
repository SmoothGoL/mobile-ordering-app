import { menuArray } from '../src/assets/data';

export default function OrderedItems(props) {
    function removeOrderItem(e) {
        const indexToExclude = parseInt(e.currentTarget.dataset.removeOrderIndex);
        props.setOrderArr(prevOrderArr => {
            return prevOrderArr.filter((orderItem, index) => index !== indexToExclude);
        });
    }

    function getTotalPrice() {
        let totalPrice = 0;
        props.orderArr.forEach(itemId => {
            totalPrice += menuArray[itemId].price;
        });
        return totalPrice;
    }

    const outputHtml = props.orderArr.map((orderId, index) => {
        const orderItem = menuArray.filter(menuItem => menuItem.id === orderId)[0];
        return (
            <div className="order-item-container">
                <span className="order-item">{orderItem.name}</span>
                <button className="remove-btn" data-remove-order-index={index} onClick={removeOrderItem}>remove</button>
                <span className="order-price">${orderItem.price}</span>
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
                disabled={props.orderArr.length === 0}
            >
                Complete order
            </button>
        </section>
    );
}

