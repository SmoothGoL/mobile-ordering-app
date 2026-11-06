import { menuArray } from '../src/assets/data';
import { memo, useState } from 'react';

const MenuItems =  memo(function MenuItems(props) {
    const [currentOrderId, setCurrentOrderId] = useState(0);

    function addItem(e) {
        const newItemId = parseInt(e.currentTarget.dataset.itemId);
        props.setOrderArr(prevOrderArr => [...prevOrderArr, {itemId: newItemId, orderId: currentOrderId}]);
        setCurrentOrderId(prevOrderId => prevOrderId + 1);
        props.setAppStatus('ordering')
    }

    const outputHtml = menuArray.map(menuItem => {
        return (
            <section className="menu-item" key={menuItem.id}>
                <span className="dish-icon">{menuItem.emoji}</span>
                <div className="menu-item-description">
                    <h3 className="menu-item-title">{menuItem.name}</h3>
                    <p className="ingredients">{menuItem.ingredients.join(', ')}</p>
                    <p className="price">${menuItem.price}</p>
                </div>
                <button className="add-btn" data-item-id={menuItem.id} onClick={addItem}><span className="add-btn-text">+</span></button>
            </section>
        );
    });

    return (
        <section id="menu-items" className="menu-items">
            {outputHtml}
        </section>
    );
});

export default MenuItems;
