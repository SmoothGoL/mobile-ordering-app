import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCart } from './useCart';

const sampleMenu = [
    { id: 0, name: 'Pizza', price: 14, ingredients: ['pepperoni'], emoji: '🍕' },
    { id: 1, name: 'Hamburger', price: 12, ingredients: ['beef'], emoji: '🍔' },
];

describe('useCart', () => {
    it('starts with an empty cart when localStorage is empty', () => {
        const { result } = renderHook(() => useCart(sampleMenu));

        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('adds items, increments quantity, and calculates subtotals and totalPrice', () => {
        const { result } = renderHook(() => useCart(sampleMenu));

        act(() => {
            result.current.addToCart(0);
            result.current.addToCart(0);
            result.current.addToCart(1);
        });

        expect(result.current.orderedItems).toHaveLength(2);
        expect(result.current.orderedItems[0]).toMatchObject({
            id: 0,
            name: 'Pizza',
            quantity: 2,
            subtotal: 28,
        });
        expect(result.current.orderedItems[1]).toMatchObject({
            id: 1,
            name: 'Hamburger',
            quantity: 1,
            subtotal: 12,
        });
        expect(result.current.totalPrice).toBe(40);
    });

    it('decrements item quantity and removes the item when quantity reaches 0', () => {
        const { result } = renderHook(() => useCart(sampleMenu));

        act(() => {
            result.current.addToCart(0);
            result.current.addToCart(0);
        });
        expect(result.current.orderedItems[0].quantity).toBe(2);

        act(() => {
            result.current.decrementItem(0);
        });
        expect(result.current.orderedItems[0].quantity).toBe(1);

        act(() => {
            result.current.decrementItem(0);
        });
        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('removes an item and clears the cart', () => {
        const { result } = renderHook(() => useCart(sampleMenu));

        act(() => {
            result.current.addToCart(0);
            result.current.addToCart(1);
        });

        act(() => {
            result.current.removeFromCart(0);
        });
        expect(result.current.orderedItems).toHaveLength(1);
        expect(result.current.orderedItems[0].id).toBe(1);

        act(() => {
            result.current.clearCart();
        });
        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('persists cart to localStorage and ignores corrupted data', () => {
        const { result, unmount } = renderHook(() => useCart(sampleMenu));

        act(() => {
            result.current.addToCart(1);
        });
        unmount();

        const { result: restored } = renderHook(() => useCart(sampleMenu));
        expect(restored.current.orderedItems).toHaveLength(1);
        expect(restored.current.orderedItems[0].name).toBe('Hamburger');

        localStorage.setItem('mobile-ordering-app:cart', 'not-valid-json');
        const { result: fallback } = renderHook(() => useCart(sampleMenu));
        expect(fallback.current.orderedItems).toEqual([]);
    });
});
