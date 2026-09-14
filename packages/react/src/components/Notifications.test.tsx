import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluxRoot } from './Root';
import { FluxSnackbarProvider, showAlert, showConfirm, showSnackbar } from './Notifications';

describe('FluxSnackbarProvider', () => {
    it('renders, dismisses, and resolves imperative notifications', async () => {
        render(<FluxSnackbarProvider />);
        let notification!: Promise<void>;
        act(() => {
            notification = showSnackbar({ duration: 0, isCloseable: true, message: 'Saved' });
        });
        expect(screen.getByText('Saved')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        await expect(notification).resolves.toBeUndefined();
        expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    });

    it('resolves an imperative notification dismissed by an action', async () => {
        render(<FluxSnackbarProvider />);
        let notification!: Promise<void>;
        act(() => {
            notification = showSnackbar({actions: {undo: 'Undo'}, duration: 0, message: 'Saved'});
        });
        fireEvent.click(screen.getByRole('button', {name: 'Undo'}));
        await expect(notification).resolves.toBeUndefined();
    });

    it('renders and resolves imperative dialogs from FluxRoot', async () => {
        render(<FluxRoot>Application</FluxRoot>);

        let alert!: Promise<void>;
        act(() => {
            alert = showAlert({ message: 'Details', title: 'Attention' });
        });
        expect(screen.getByText('Application')).toHaveAttribute('inert');
        expect(screen.getByRole('dialog', { name: 'Attention' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'OK' }));
        await expect(alert).resolves.toBeUndefined();
        expect(screen.getByText('Application')).not.toHaveAttribute('inert');

        let confirm!: Promise<boolean>;
        act(() => {
            confirm = showConfirm({ message: 'Continue?', title: 'Confirm' });
        });
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        await expect(confirm).resolves.toBe(false);
    });
});
