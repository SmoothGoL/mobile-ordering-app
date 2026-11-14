import MenuItem from './MenuItem';

export default function MenuList({ menuItems, onAddItem }) {
    return (
        <section id="menu-items" className="menu-items" aria-label="Menu">
            <ul className="menu-list">
                {menuItems.map(menuItem => (
                    <li key={menuItem.id}>
                        <MenuItem
                            item={menuItem}
                            onAddItem={onAddItem}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
