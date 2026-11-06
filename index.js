import { menuArray } from './data.js';

const menuItemsEl = document.getElementById('menu-items');
const orderEl = document.getElementById('order');
const paymentModalEl = document.getElementById('payment-modal');
const thankYouMessageContainer = document.getElementById('thank-you-message-container');
// const windowWidthDisplayEl = document.getElementById('window-width');
const myOrder = [];

// window.addEventListener('resize', () => {
//     windowWidthDisplayEl.textContent = window.innerWidth;
// });

document.addEventListener('click', (e) => {
    if (e.target.dataset.addBtn) {
        addItem(e.target.dataset.addBtn, myOrder)
    } else if (e.target.parentElement.dataset.addBtn) {
        addItem(e.target.parentElement.dataset.addBtn, myOrder);
    } else if (e.target.dataset.removeOrderIndex) {
        removeOrderItem(e.target.dataset.removeOrderIndex, myOrder);
    } else if (e.target.id === 'complete-order-btn') {
        paymentModalEl.style.display = 'block';
    } else if (e.target.id === 'modal-close-btn') {
        paymentModalEl.style.display = 'none'
    }
});

function addItem(itemId, orderArr) {
    orderArr.push(Number(itemId));
    renderOrder(orderArr);
}

function removeOrderItem(id, orderArr) {
    orderArr.splice(Number(id), 1);
    renderOrder(orderArr);
}

function renderOrder(orderArr) {
    thankYouMessageContainer.style.display = 'none';
    orderEl.innerHTML = getOrderHtml(orderArr);
}

function getOrderHtml(orderArr) {
    let outputHtml = '<h2 class="order-title">Your order</h2>';
    let totalPrice = 0;
    orderArr.forEach((orderId, index) => {
        const orderItem = menuArray.filter(menuItem => menuItem.id === orderId)[0];
        outputHtml += `<div class="order-item-container">
            <span class="order-item">${orderItem.name}</span>
            <button class="remove-btn" data-remove-order-index="${index}">remove</button>
            <span class="order-price">$${orderItem.price}</span>
        </div>`;
        totalPrice += orderItem.price;
    });

    outputHtml += `
        <hr class="order-hr">
        <div class="total-price-container">
            <span class="total-price">Total price:</span>
            <span class="order-price">$${totalPrice}</span>
        </div>
        <button id="complete-order-btn" class="complete-order-btn" ${orderArr.length > 0 ? '' : 'disabled'}>Complete order</button>`;
    return outputHtml;
}

menuItemsEl.innerHTML = getMenuHtml(menuArray);
// renderOrder(myOrder);
// windowWidthDisplayEl.textContent = window.innerWidth;
