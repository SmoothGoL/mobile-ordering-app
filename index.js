import { menuArray } from './data.js';

const menuItemsEl = document.getElementById('menu-items');
const orderEl = document.getElementById('order');
const paymentModalEl = document.getElementById('payment-modal');
const paymentForm = document.getElementById('payment-form');
const thankYouMessageContainer = document.getElementById('thank-you-message-container');
const windowWidthDisplayEl = document.getElementById('window-width');
const myOrder = [];

window.addEventListener('resize', () => {
    windowWidthDisplayEl.textContent = window.innerWidth;
});

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

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const paymentFormData = new FormData(paymentForm);
    console.log(paymentFormData.get('card-number'));
    paymentModalEl.style.display = 'none';
    orderEl.innerHTML = '';
    myOrder.length = 0;
    paymentForm.reset();
    renderThankYouMessage(paymentFormData.get('name'));
});

function renderThankYouMessage(name) {
    const thankYouMessage = document.createElement('p');
    thankYouMessage.classList.add('thank-you-message');
    thankYouMessage.textContent = `Thanks, ${name}! Your order is on its way!`;
    thankYouMessageContainer.appendChild(thankYouMessage);
    thankYouMessageContainer.style.display = 'block';
}

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

function getMenuHtml(menuItems) {
    let outputHtml = '';
    menuItems.forEach((menuItem) => {
        outputHtml += `
            <section class="menu-item">
                <span class="dish-icon">${menuItem.emoji}</span>
                <div class="menu-item-description">
                    <h3 class="menu-item-title">${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients.join(', ')}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
                <button class="add-btn" data-add-btn="${menuItem.id}"><span class="add-btn-text">+</span></button>
            </section>
        `;
    });
    return outputHtml;
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
windowWidthDisplayEl.textContent = window.innerWidth;
