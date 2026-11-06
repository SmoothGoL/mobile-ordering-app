import { menuArray } from '../src/assets/data';
import { useState } from 'react';

export default function OrderedItems(props) {
    const [totalPrice, setTotalPrice] = useState(0);

    const outputHtml = props.orderArr.map((orderId, index) => {
        const orderItem = menuArray.filter(menuItem => menuItem.id === orderId)[0];
        setTotalPrice(prevTotalPrice => prevTotalPrice + orderItem.price);
        return (
            <div class="order-item-container">
                <span class="order-item">{orderItem.name}</span>
                <button class="remove-btn" data-remove-order-index={index}>remove</button>
                <span class="order-price">${orderItem.price}</span>
            </div>
        );
    });

    return (
        <section id="order" className="order">
            <h2 class="order-title">Your order</h2>
            {outputHtml}
            <hr class="order-hr" />
            <div class="total-price-container">
                <span class="total-price">Total price:</span>
                <span class="order-price">$${totalPrice}</span>
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

