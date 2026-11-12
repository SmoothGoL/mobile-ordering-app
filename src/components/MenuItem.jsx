export default function MenuItem({ item, onAddItem }) {
    return (
        <section className="menu-item">
            <span className="dish-icon">{item.emoji}</span>
            <div className="menu-item-description">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="ingredients">{item.ingredients.join(', ')}</p>
                <p className="price">${item.price}</p>
            </div>
            <button className="add-btn" onClick={() => onAddItem(item.id)}><span className="add-btn-text">+</span></button>
        </section>
    );
}