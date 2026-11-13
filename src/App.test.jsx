import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Mobile ordering app user flows', () => {
    it('renders the header and full menu in the initial browsing state', async () => {
        const { container } = await render(<App />);

        await expect
            .element(
                page.getByRole('img', {
                    name: "Jimmy's Diner - The best burgers and pizzas in town.",
                })
            )
            .toBeVisible();

        await expect.element(page.getByRole('heading', { name: 'Pizza' })).toBeVisible();
        await expect
            .element(page.getByText('pepperoni, mushroom, mozzarella, salami, garlic'))
            .toBeVisible();

        await expect.element(page.getByRole('heading', { name: 'Hamburger' })).toBeVisible();
        await expect.element(page.getByText('beef, cheese, lettuce')).toBeVisible();

        await expect.element(page.getByRole('heading', { name: 'Beer' })).toBeVisible();
        await expect.element(page.getByText('grain, hops, yeast, water')).toBeVisible();

        await expect.element(
            page.getByRole('region', { name: 'Pizza' }).getByText('$14')
        ).toBeVisible();

        await expect.element(
            page.getByRole('region', { name: 'Hamburger' }).getByText('$12')
        ).toBeVisible();

        await expect.element(
            page.getByRole('region', { name: 'Beer' }).getByText('$12')
        ).toBeVisible();

        await expect
            .element(page.getByRole('heading', { name: 'Your order' }))
            .not.toBeInTheDocument();
        await expect
            .element(page.getByText(/Thanks, .*! Your order is on its way!/))
            .not.toBeInTheDocument();
        await expect
            .element(page.getByRole('button', { name: "Complete order"}))
            .not.toBeInTheDocument();
    });

    it('lets a user add items, adjust quantities, remove items, and disables checkout when empty', async () => {
        const { container } = await render(<App />);

        await page.getByRole('button', { name: 'Add Pizza to order' }).click();

        await expect.element(page.getByRole('heading', { name: 'Your order' })).toBeVisible();
        await expect.element(page.getByText('x1')).toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$14');

        // Increase quantity from the order row and from the menu item button
        await page.getByRole('button', { name: 'Increase Pizza quantity' }).click();
        await expect.element(page.getByText('x2')).toBeVisible();
        await expect
            .element(container.querySelector('.order-item-container .order-price'))
            .toHaveTextContent('$28');

        await page.getByRole('button', { name: 'Add Pizza to order' }).click();
        await expect.element(page.getByText('x3')).toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$42');

        // Add another item and verify combined total
        await page.getByRole('button', { name: 'Add Beer to order' }).click();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$54');

        // Decrease Beer from x1 to 0 removes it from the order
        await page.getByRole('button', { name: 'Decrease Beer quantity' }).click();
        await expect
            .element(page.getByRole('button', { name: 'Remove Beer from order' }))
            .not.toBeInTheDocument();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$42');

        // Remove Pizza completely regardless of quantity
        await page.getByRole('button', { name: 'Remove Pizza from order' }).click();
        await expect.element(page.getByRole('heading', { name: 'Your order' })).not.toBeInTheDocument();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$0');
        await expect
            .element(page.getByRole('button', { name: 'Complete order' }))
            .toBeDisabled();
    });

    it('combines multiple distinct items and restores saved cart across reload', async () => {
        const firstRender = await render(<App />);

        await page.getByRole('button', { name: 'Add Pizza to order' }).click();
        await page.getByRole('button', { name: 'Add Hamburger to order' }).click();
        await page.getByRole('button', { name: 'Add Beer to order' }).click();

        await expect
            .element(firstRender.container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$38');

        await firstRender.unmount();

        // Simulate a page reload by mounting a fresh App instance with persisted localStorage
        const reloadedRender = await render(<App />);

        await expect.element(page.getByRole('heading', { name: 'Your order' })).toBeVisible();
        await expect
            .element(page.getByRole('button', { name: 'Remove Pizza from order' }))
            .toBeVisible();
        await expect
            .element(page.getByRole('button', { name: 'Remove Hamburger from order' }))
            .toBeVisible();
        await expect
            .element(page.getByRole('button', { name: 'Remove Beer from order' }))
            .toBeVisible();
        await expect
            .element(reloadedRender.container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$38');
    });

    it('opens and dismisses the payment modal via close button, Escape key, and backdrop click without losing the order', async () => {
        const { container } = await render(<App />);

        await page.getByRole('button', { name: 'Add Hamburger to order' }).click();

        // Dismiss via close button
        await page.getByRole('button', { name: 'Complete order' }).click();
        const modalHeading = page.getByRole('heading', {
            name: 'Enter card details',
            includeHidden: true,
        });
        await expect.element(modalHeading).toBeVisible();

        await page.getByRole('button', { name: 'Close payment modal' }).click();
        await expect.element(modalHeading).not.toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$12');

        // Dismiss via Escape key
        await page.getByRole('button', { name: 'Complete order' }).click();
        await expect.element(modalHeading).toBeVisible();

        await userEvent.keyboard('{Escape}');
        await expect.element(modalHeading).not.toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$12');

        // Dismiss via backdrop click outside the dialog box
        await page.getByRole('button', { name: 'Complete order' }).click();
        await expect.element(modalHeading).toBeVisible();

        await userEvent.pointer({ coords: { x: 5, y: 5 }, keys: '[MouseLeft]' });
        await expect.element(modalHeading).not.toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$12');
    });

    it('preserves entered payment form inputs when the modal is closed without submitting', async () => {
        await render(<App />);

        await page.getByRole('button', { name: 'Add Pizza to order' }).click();
        await page.getByRole('button', { name: 'Complete order' }).click();

        const modalHeading = page.getByRole('heading', {
            name: 'Enter card details',
            includeHidden: true,
        });
        await expect.element(modalHeading).toBeVisible();

        await userEvent.fill(page.getByLabelText('Full name'), 'Alex');
        await userEvent.fill(page.getByLabelText('Card number'), '12345678');
        await userEvent.fill(page.getByLabelText('CVV'), '123');

        await page.getByRole('button', { name: 'Close payment modal' }).click();
        await expect.element(modalHeading).not.toBeVisible();

        await page.getByRole('button', { name: 'Complete order' }).click();
        await expect.element(modalHeading).toBeVisible();

        await expect.element(page.getByLabelText('Full name')).toHaveValue('Alex');
        await expect.element(page.getByLabelText('Card number')).toHaveValue('12345678');
        await expect.element(page.getByLabelText('CVV')).toHaveValue('123');
    });

    it('sanitizes non-digit input and enforces browser form validation on payment fields', async () => {
        const { container } = await render(<App />);

        await page.getByRole('button', { name: 'Add Pizza to order' }).click();
        await page.getByRole('button', { name: 'Complete order' }).click();

        const nameInput = page.getByLabelText('Full name');
        const cardInput = page.getByLabelText('Card number');
        const cvvInput = page.getByLabelText('CVV');
        const payButton = page.getByRole('button', { name: 'Pay' });

        // Empty submission is blocked by required attributes
        await payButton.click();
        await expect
            .element(page.getByRole('heading', { name: 'Enter card details' }))
            .toBeVisible();
        await expect
            .element(page.getByText(/Thanks, .*! Your order is on its way!/))
            .not.toBeInTheDocument();

        // Non-digit characters are stripped from card number and CVV
        await userEvent.type(nameInput, 'Alex');
        await userEvent.type(cardInput, '1234-ab!56');
        await userEvent.type(cvvInput, '1a2');

        await expect.element(cardInput).toHaveValue('123456');
        await expect.element(cvvInput).toHaveValue('12');

        // Too-short card number (< 8 digits) and CVV (< 3 digits) fail native validation
        const paymentForm = container.querySelector('#payment-form');
        expect(paymentForm.checkValidity()).toBe(false);

        await payButton.click();
        await expect
            .element(page.getByRole('heading', { name: 'Enter card details' }))
            .toBeVisible();
        await expect
            .element(page.getByText(/Thanks, .*! Your order is on its way!/))
            .not.toBeInTheDocument();
    });

    it('completes payment, clears the cart, shows thank you message, and allows starting a new order', async () => {
        const { container } = await render(<App />);

        await page.getByRole('button', { name: 'Add Hamburger to order' }).click();
        await page.getByRole('button', { name: 'Complete order' }).click();

        await expect
            .element(page.getByRole('heading', { name: 'Enter card details' }))
            .toBeVisible();

        await userEvent.fill(page.getByLabelText('Full name'), '  Alex  ');
        await userEvent.fill(page.getByLabelText('Card number'), '1234567812345678');
        await userEvent.fill(page.getByLabelText('CVV'), '123');
        await page.getByRole('button', { name: 'Pay' }).click();

        await expect
            .element(page.getByRole('heading', { name: 'Enter card details', includeHidden: true }))
            .not.toBeVisible();
        await expect
            .element(page.getByText('Thanks, Alex! Your order is on its way!'))
            .toBeVisible();
        await expect.element(page.getByRole('heading', { name: 'Your order' })).not.toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('mobile-ordering-app:cart'))).toEqual([]);

        // Starting a new order replaces the thank-you message with a fresh cart
        await page.getByRole('button', { name: 'Add Beer to order' }).click();

        await expect
            .element(page.getByText('Thanks, Alex! Your order is on its way!'))
            .not.toBeInTheDocument();
        await expect.element(page.getByRole('heading', { name: 'Your order' })).toBeVisible();
        await expect.element(page.getByText('x1')).toBeVisible();
        await expect
            .element(container.querySelector('.total-price-container'))
            .toHaveTextContent('Total price:$12');
    });
});
