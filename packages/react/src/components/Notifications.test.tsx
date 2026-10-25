import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FluxRoot } from './Root';
import { FluxSnackbar, FluxSnackbarProvider, showAlert, showConfirm, showSnackbar } from './Notifications';

afterEach(() => vi.useRealTimers());

describe('FluxSnackbarProvider', () => {
    it('registers declarative notifications in the shared stack and removes them on unmount', async () => {
        const example = (message?: string) => <><div data-testid="source">{message && <FluxSnackbar message={message} />}</div><FluxSnackbarProvider /></>;
        const {rerender} = render(example('First message'));
        expect(screen.getByTestId('source')).toBeEmptyDOMElement();
        expect(screen.getByText('First message')).toBeInTheDocument();
        rerender(example('Updated message'));
        expect(screen.queryByText('First message')).not.toBeInTheDocument();
        expect(screen.getByText('Updated message')).toBeInTheDocument();
        rerender(example());
        await waitFor(() => expect(screen.queryByText('Updated message')).not.toBeInTheDocument());
    });

    it('pauses only the hovered notification and resumes its remaining duration', async () => {
        vi.useFakeTimers();
        render(<FluxSnackbarProvider />);
        const hovered = vi.fn(), other = vi.fn();
        act(() => {
            void showSnackbar({duration: 1000, message: 'Hovered'}).then(hovered);
            void showSnackbar({duration: 800, message: 'Other'}).then(other);
        });
        await act(async () => vi.advanceTimersByTime(400));
        fireEvent.mouseEnter(screen.getByText('Hovered').closest('[role="status"]')!);
        await act(async () => vi.advanceTimersByTime(2000));
        expect(hovered).not.toHaveBeenCalled();
        expect(other).toHaveBeenCalledOnce();
        fireEvent.mouseLeave(screen.getByText('Hovered').closest('[role="status"]')!);
        await act(async () => vi.advanceTimersByTime(599));
        expect(hovered).not.toHaveBeenCalled();
        await act(async () => vi.advanceTimersByTime(1));
        expect(hovered).toHaveBeenCalledOnce();
    });

    it('renders, dismisses, and resolves imperative notifications', async () => {
        render(<FluxSnackbarProvider />);
        let notification!: Promise<void>;
        act(() => {
            notification = showSnackbar({ duration: 0, isCloseable: true, message: 'Saved' });
        });
        expect(screen.getByText('Saved')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        await expect(notification).resolves.toBeUndefined();
        await waitFor(() => expect(screen.queryByText('Saved')).not.toBeInTheDocument());
    });

    it('keeps action notifications open until they are explicitly closed', async () => {
        render(<FluxSnackbarProvider />);
        const onAction = vi.fn(), resolved = vi.fn();
        let notification!: Promise<void>;
        act(() => {
            notification = showSnackbar({actions: {undo: 'Undo'}, duration: 6000, isCloseable: true, message: 'Saved', onAction});
            void notification.then(resolved);
        });
        fireEvent.click(screen.getByRole('button', {name: 'Undo'}));
        await act(async () => {});
        expect(onAction).toHaveBeenCalledWith('undo');
        expect(resolved).not.toHaveBeenCalled();
        expect(screen.getByText('Saved')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: 'Close'}));
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
        fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
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

describe('dialog replacement', () => {
    it('keeps simultaneous confirmations in one overlay and resolves each independently', async () => {
        render(<FluxRoot />);
        let first!: Promise<boolean>, second!: Promise<boolean>;
        act(() => {
            first = showConfirm({title: 'First', message: 'Continue?'});
            second = showConfirm({title: 'Second', message: 'Continue?'});
        });
        expect(screen.getAllByRole('dialog')).toHaveLength(1);
        fireEvent.click(screen.getAllByRole('button', {name: 'Cancel'})[0]);
        await expect(first).resolves.toBe(false);
        expect(screen.getByRole('dialog', {name: 'Second'})).toBeInTheDocument();
        expect(screen.queryByText('First')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: 'Ok'}));
        await expect(second).resolves.toBe(true);
    });

    it('replaces a confirmation that is still leaving with a single active confirmation', async () => {
        render(<FluxRoot/>);
        let first!: Promise<boolean>;
        act(() => {first = showConfirm({title: 'First confirmation', message: 'Continue?'});});
        fireEvent.click(screen.getByRole('button', {name: 'Cancel'}));
        await expect(first).resolves.toBe(false);
        let second!: Promise<boolean>;
        act(() => {second = showConfirm({title: 'Second confirmation', message: 'Continue again?'});});
        expect(screen.getAllByRole('button', {name: 'Ok'})).toHaveLength(1);
        expect(screen.queryByText('First confirmation')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: 'Ok'}));
        await expect(second).resolves.toBe(true);
    });
});
