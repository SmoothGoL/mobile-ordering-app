import { menuArray } from './data.js';

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


