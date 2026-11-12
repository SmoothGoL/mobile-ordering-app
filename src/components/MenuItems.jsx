import { menuArray } from '../assets/data';
import MenuItem from './MenuItem';

export default function MenuItems(props) {
    function handleAddItem(newItemId) {
        props.setOrderArr(prevOrderArr => [...prevOrderArr, {itemId: newItemId, uuid: crypto.randomUUID()}]);
        props.setAppStatus('ordering')
    }

    return (
        <section id="menu-items" className="menu-items">
            {
                menuArray.map(menuItem => {
                    return (
                        <MenuItem 
                            key={menuItem.id}
                            item={menuItem}
                            onAddItem={handleAddItem}
                        />
                    );
                })
            }
        </section>
    );
}
