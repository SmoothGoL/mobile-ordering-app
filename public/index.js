import { menuArray } from './data.js';

const mainEl = document.querySelector('main');

function getMenuHtml(menuItems) {
    let outputHtml = '';
    menuItems.forEach((menuItem) => {
        outputHtml += `
            <section>
                <span class="dish-icon">${menuItem.emoji}</span>
                <div>
                    <h2>${menuItem.name}</h2>
                    <p class="ingredients">${menuItem.ingredients.join(',')}</p>
                    <p>$${menuItem.price}</p>
                </div>
            </section>
        `;
    });
    return outputHtml;
}

mainEl.innerHTML = getMenuHtml(menuArray);
