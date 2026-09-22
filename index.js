import { menuArray } from './data.js';

const menuItemsEl = document.querySelector('.menu-items');
const orderEl = document.querySelector('.order');
const myOrder = [0, 2];

document.addEventListener('click', (e) => {
    if (e.target.dataset.addBtn) {
        addItem(e.target.dataset.addBtn, myOrder)
    } else if (e.target.parentElement.dataset.addBtn) {
        addItem(e.target.parentElement.dataset.addBtn, myOrder);
    } else if (e.target.dataset.removeOrderIndex) {
        removeOrderItem(e.target.dataset.removeOrderIndex, myOrder);
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
        <button class="complete-order-btn">Complete order</button>`;
    return outputHtml;
}

function getMenuHtml(menuItems) {
    let outputHtml = '';
    menuItems.forEach((menuItem) => {
        outputHtml += `
            <section class="menu-item">
                <span class="dish-icon">${menuItem.emoji}</span>
                <div class="menu-item-description">
                    <h3 class="menu-item-title">${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients.join(',')}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
                <button class="add-btn" data-add-btn="${menuItem.id}"><span class="add-btn-text">+</span></button>
            </section>
        `;
    });
    return outputHtml;
}

menuItemsEl.innerHTML = getMenuHtml(menuArray);
renderOrder(myOrder);
