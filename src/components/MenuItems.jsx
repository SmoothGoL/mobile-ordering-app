import { menuArray } from '../assets/data';
import MenuItem from './MenuItem';

export default function MenuItems(props) {
    return (
        <section id="menu-items" className="menu-items">
            {
                menuArray.map(menuItem => {
                    return (
                        <MenuItem 
                            key={menuItem.id}
                            item={menuItem}
                            onAddItem={props.onAddItem}
                        />
                    );
                })
            }
        </section>
    );
}
