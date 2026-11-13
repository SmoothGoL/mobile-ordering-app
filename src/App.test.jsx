import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App ordering and checkout flow', () => {
    it('renders the menu and lets a user add, adjust, and remove items', async () => {
        const user = userEvent.setup();
        render(<App />);

        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Hamburger')).toBeInTheDocument();
        expect(screen.getByText('Beer')).toBeInTheDocument();
        expect(screen.queryByText('Your order')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Add Pizza to order' }));
        expect(screen.getByText('Your order')).toBeInTheDocument();
        expect(screen.getByText('x1')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Increase Pizza quantity' }));
        expect(screen.getByText('x2')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Decrease Pizza quantity' }));
        expect(screen.getByText('x1')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Remove Pizza from order' }));
        expect(screen.queryByText('x1')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Complete order' })).toBeDisabled();
    });

    it('completes payment and shows the thank you message', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button', { name: 'Add Hamburger to order' }));
        await user.click(screen.getByRole('button', { name: 'Complete order' }));

        expect(screen.getByRole('heading', { name: 'Enter card details' })).toBeVisible();

        await user.type(screen.getByLabelText('Full name'), 'Alex');
        await user.type(screen.getByLabelText('Card number'), '12345678');
        await user.type(screen.getByLabelText('CVV'), '123');
        await user.click(screen.getByRole('button', { name: 'Pay' }));

        expect(screen.getByText('Thanks, Alex! Your order is on its way!')).toBeInTheDocument();
        expect(screen.queryByText('Your order')).not.toBeInTheDocument();
    });
});
