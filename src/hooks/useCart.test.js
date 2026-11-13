import { renderHook } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { useCart } from './useCart';

const sampleMenu = [
    { id: 0, name: 'Pizza', price: 14, ingredients: ['pepperoni'], emoji: '🍕' },
    { id: 1, name: 'Hamburger', price: 12, ingredients: ['beef'], emoji: '🍔' },
];

describe('useCart', () => {
    it('starts with an empty cart when localStorage is empty', async () => {
        const { result } = await renderHook(() => useCart(sampleMenu));

        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('adds items, increments quantity, and calculates subtotals and totalPrice', async () => {
        const { result, act } = await renderHook(() => useCart(sampleMenu));

        await act(() => {
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

    it('decrements item quantity, removes at 0, and ignores missing items', async () => {
        const { result, act } = await renderHook(() => useCart(sampleMenu));

        await act(() => {
            result.current.addToCart(0);
            result.current.addToCart(0);
        });
        expect(result.current.orderedItems[0].quantity).toBe(2);

        await act(() => {
            result.current.decrementItem(999);
        });
        expect(result.current.orderedItems[0].quantity).toBe(2);

        await act(() => {
            result.current.decrementItem(0);
        });
        expect(result.current.orderedItems[0].quantity).toBe(1);

        await act(() => {
            result.current.decrementItem(0);
        });
        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('removes an item regardless of quantity and clears the cart', async () => {
        const { result, act } = await renderHook(() => useCart(sampleMenu));

        await act(() => {
            result.current.addToCart(0);
            result.current.addToCart(0);
            result.current.addToCart(1);
        });

        await act(() => {
            result.current.removeFromCart(0);
        });
        expect(result.current.orderedItems).toHaveLength(1);
        expect(result.current.orderedItems[0].id).toBe(1);

        await act(() => {
            result.current.addToCart(0);
            result.current.addToCart(0);
        });

        expect(result.current.orderedItems).toHaveLength(2);
        expect(result.current.orderedItems[0].id).toBe(1);

        await act(() => {
            result.current.clearCart();
        });
        expect(result.current.orderedItems).toEqual([]);
        expect(result.current.totalPrice).toBe(0);
    });

    it('persists cart to localStorage and handles corrupted or invalid stored data', async () => {
        const { result, act, unmount } = await renderHook(() => useCart(sampleMenu));

        await act(() => {
            result.current.addToCart(1);
        });
        await unmount();

        const restored = await renderHook(() => useCart(sampleMenu));
        expect(restored.result.current.orderedItems).toHaveLength(1);
        expect(restored.result.current.orderedItems[0].name).toBe('Hamburger');
        await restored.unmount();

        localStorage.setItem('mobile-ordering-app:cart', 'not-valid-json');
        const corruptedJson = await renderHook(() => useCart(sampleMenu));
        expect(corruptedJson.result.current.orderedItems).toEqual([]);
        await corruptedJson.unmount();

        localStorage.setItem('mobile-ordering-app:cart', JSON.stringify({ itemId: 0, quantity: 1 }));
        const nonArray = await renderHook(() => useCart(sampleMenu));
        expect(nonArray.result.current.orderedItems).toEqual([]);
        await nonArray.unmount();

        localStorage.setItem(
            'mobile-ordering-app:cart',
            JSON.stringify([
                null,
                { quantity: 2 },
                { itemId: 0, quantity: 0 },
                { itemId: 1, quantity: -1 },
                { itemId: 999, quantity: 3 },
                { itemId: 0, quantity: 2 },
            ])
        );
        const filtered = await renderHook(() => useCart(sampleMenu));
        expect(filtered.result.current.orderedItems).toHaveLength(1);
        expect(filtered.result.current.orderedItems[0]).toMatchObject({
            id: 0,
            name: 'Pizza',
            quantity: 2,
            subtotal: 28,
        });
        expect(filtered.result.current.totalPrice).toBe(28);
    });
});
