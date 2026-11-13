import MenuItem from './MenuItem';

export default function MenuItems({ menuItems, onAddItem }) {
    return (
        <section id="menu-items" className="menu-items">
            {menuItems.map(menuItem => (
                <MenuItem
                    key={menuItem.id}
                    item={menuItem}
                    onAddItem={onAddItem}
                />
            ))}
        </section>
    );
}
