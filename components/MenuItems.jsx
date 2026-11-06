import { menuArray } from '../src/assets/data';

export default function MenuItems() {
    const outputHtml = menuArray.map(menuItem => {
        return (
            <section class="menu-item">
                <span class="dish-icon">{menuItem.emoji}</span>
                <div class="menu-item-description">
                    <h3 class="menu-item-title">{menuItem.name}</h3>
                    <p class="ingredients">{menuItem.ingredients.join(', ')}</p>
                    <p class="price">${menuItem.price}</p>
                </div>
                <button class="add-btn" data-add-btn="${menuItem.id}"><span class="add-btn-text">+</span></button>
            </section>
        );
    });

    return (
        <section id="menu-items" className="menu-items">
            {outputHtml}
        </section>
    );
}

