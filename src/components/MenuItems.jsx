import { menuArray } from '../assets/data';
import { memo } from 'react';
import MenuItem from './MenuItem';

const MenuItems =  memo(function MenuItems(props) {
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
});

export default MenuItems;
