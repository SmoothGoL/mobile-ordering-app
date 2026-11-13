import { useCallback, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'mobile-ordering-app:cart';

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (!savedCart) return [];
        const parsed = JSON.parse(savedCart);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            item => item && item.itemId !== undefined && typeof item.quantity === 'number' && item.quantity > 0
        );
    } catch {
        return [];
    }
}

export function useCart(menuItems) {
    const [cart, setCart] = useState(loadCartFromStorage);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch {
            // Ignore storage errors (e.g. private browsing or full quota)
        }
    }, [cart]);

    const addToCart = useCallback(itemId => {
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
    }, []);

    const decrementItem = useCallback(itemId => {
        setCart(prevCart =>
            prevCart
                .map(cartItem =>
                    cartItem.itemId === itemId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
                .filter(cartItem => cartItem.quantity > 0)
        );
    }, []);

    const removeFromCart = useCallback(itemId => {
        setCart(prevCart => prevCart.filter(cartItem => cartItem.itemId !== itemId));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const menuItemsById = useMemo(
        () => new Map(menuItems.map(item => [item.id, item])),
        [menuItems]
    );

    const orderedItems = useMemo(
        () =>
            cart.reduce((items, cartItem) => {
                const menuItem = menuItemsById.get(cartItem.itemId);
                if (!menuItem) return items;
                items.push({
                    ...menuItem,
                    quantity: cartItem.quantity,
                    subtotal: menuItem.price * cartItem.quantity,
                });
                return items;
            }, []),
        [cart, menuItemsById]
    );

    const totalPrice = useMemo(
        () => orderedItems.reduce((total, item) => total + item.subtotal, 0),
        [orderedItems]
    );

    return {
        orderedItems,
        totalPrice,
        addToCart,
        decrementItem,
        removeFromCart,
        clearCart,
    };
}
