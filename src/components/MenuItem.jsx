export default function MenuItem(props) {
    return (
        <section className="menu-item" key={props.item.id}>
            <span className="dish-icon">{props.item.emoji}</span>
            <div className="menu-item-description">
                <h3 className="menu-item-title">{props.item.name}</h3>
                <p className="ingredients">{props.item.ingredients.join(', ')}</p>
                <p className="price">${props.item.price}</p>
            </div>
            <button className="add-btn" onClick={() => props.onAddItem(props.item.id)}><span className="add-btn-text">+</span></button>
        </section>
    );
}