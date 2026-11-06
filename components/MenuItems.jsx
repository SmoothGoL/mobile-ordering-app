import { menuArray } from '../src/assets/data';

export default function MenuItems(props) {
    function addItem(e) {
        const newItemId = parseInt(e.currentTarget.dataset.itemId);
        props.setOrderArr(prevOrderArr => [...prevOrderArr, newItemId])
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
}

