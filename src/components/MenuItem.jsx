export default function MenuItem({ item, onAddItem }) {
    return (
        <section className="menu-item" aria-label={item.name}>
            <span className="dish-icon" aria-hidden="true">{item.emoji}</span>
            <div className="menu-item-description">
                <h2 className="menu-item-title">{item.name}</h2>
                <p className="ingredients">{item.ingredients.join(', ')}</p>
                <p className="price">${item.price}</p>
            </div>
            <button
                type="button"
                className="add-btn"
                aria-label={`Add ${item.name} to order`}
                onClick={() => onAddItem(item.id)}
            >
                <span className="add-btn-text" aria-hidden="true">+</span>
            </button>
        </section>
    );
}