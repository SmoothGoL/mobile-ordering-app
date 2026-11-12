import { menuArray } from '../assets/data';
import { memo } from 'react';


const OrderedItems = memo(function OrderedItems(props) {
    function onRemoveItem(uuid) {
        const idToExclude = uuid;
        props.setOrderArr(prevOrderArr => {
            return prevOrderArr.filter(orderItem => orderItem.uuid !== idToExclude);
        });
    }

    function showPaymentModal() {
        props.setAppStatus('paying')
    }

    function getTotalPrice() {
        return props.orderArr.reduce((total, orderItem) => {
            // Using the index lookup you already had, or use .find() if you changed it
            return total + menuArray.find(item => item.id === orderItem.itemId).price; 
        }, 0);
    }

    const outputHtml = props.orderArr.map(orderItem => {
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
            {(props.orderArr.length > 0) &&
                <>
                    <h2 className="order-title">Your order</h2>
                    {outputHtml}
                    <hr className="order-hr" />
                </>
            }
            <div className="total-price-container" style={{marginTop: (props.orderArr.length > 0 ? '0' : '30px')}}>
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
});

export default OrderedItems;
