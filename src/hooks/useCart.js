import { useState } from 'react';
import { menuArray } from '../assets/data';

export function useCart() {
    const [cart, setCart] = useState([]);

    function addToCart(itemId) {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.itemId === itemId);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.itemId === itemId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { itemId, quantity: 1 }];
        });
    }

    function decrementItem(itemId) {
        setCart(prevCart =>
            prevCart
                .map(cartItem =>
                    cartItem.itemId === itemId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
                .filter(cartItem => cartItem.quantity > 0)
        );
    }

    function removeFromCart(itemId) {
        setCart(prevCart => prevCart.filter(cartItem => cartItem.itemId !== itemId));
    }

    function clearCart() {
        setCart([]);
    }

    const orderedItems = cart.map(cartItem => {
        const menuItem = menuArray.find(item => item.id === cartItem.itemId);
        return {
            ...menuItem,
            quantity: cartItem.quantity,
            subtotal: menuItem.price * cartItem.quantity,
        };
    });

    const totalPrice = orderedItems.reduce((total, item) => total + item.subtotal, 0);

    return {
        cart,
        orderedItems,
        totalPrice,
        addToCart,
        decrementItem,
        removeFromCart,
        clearCart,
    };
}
