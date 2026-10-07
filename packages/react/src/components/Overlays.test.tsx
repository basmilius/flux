import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxFlyout, FluxOverlay, FluxTooltip} from './Overlays';

describe('FluxOverlay', () => {
    it('locks scrolling and closes with Escape', () => {
        const onClose = vi.fn();
        const {unmount} = render(<FluxOverlay open isCloseable label="Dialog" onClose={onClose}><button>Action</button></FluxOverlay>);
        expect(document.body.style.overflow).toBe('hidden');
        fireEvent.keyDown(document, {key: 'Escape'});
        expect(onClose).toHaveBeenCalledOnce();
        unmount();
        expect(document.body.style.overflow).toBe('');
    });

    it('closes a nested flyout before its parent dialog on Escape', async () => {
        const onClose = vi.fn();
        render(<FluxOverlay open isCloseable label="Parent" onClose={onClose}><FluxFlyout label="Nested" opener={({open}) => <button onClick={open}>Open flyout</button>}>{() => <button>Nested action</button>}</FluxFlyout></FluxOverlay>);
        fireEvent.click(screen.getByRole('button', {name: 'Open flyout'}));
        expect(screen.getByRole('dialog', {name: 'Nested'})).toBeInTheDocument();
        fireEvent.keyDown(screen.getByRole('button', {name: 'Nested action'}), {key: 'Escape'});
        expect(onClose).not.toHaveBeenCalled();
        await waitFor(() => expect(screen.queryByRole('dialog', {name: 'Nested'})).not.toBeInTheDocument());
        fireEvent.keyDown(document, {key: 'Escape'});
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('keeps the page locked until the final stacked dialog closes', () => {
        const {rerender, unmount} = render(<><FluxOverlay open label="First">First</FluxOverlay><FluxOverlay open label="Second">Second</FluxOverlay></>);
        expect(document.body.style.overflow).toBe('hidden');
        rerender(<><FluxOverlay open={false} label="First">First</FluxOverlay><FluxOverlay open label="Second">Second</FluxOverlay></>);
        expect(document.body.style.overflow).toBe('hidden');
        unmount();
        expect(document.body.style.overflow).toBe('');
    });
});

describe('FluxFlyout', () => {
    it('opens and closes through its render API', async () => {
        render(<FluxFlyout opener={({toggle}) => <button onClick={toggle}>Menu</button>}>{({close}) => <button onClick={close}>Close</button>}</FluxFlyout>);
        fireEvent.click(screen.getByRole('button', {name: 'Menu'}));
        expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: 'Close'}));
        await waitFor(() => expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument());
    });

    it('closes when the user clicks outside the opener and pane', async () => {
        render(<div><FluxFlyout opener={({toggle}) => <button onClick={toggle}>Menu</button>}>{() => <button>Inside</button>}</FluxFlyout><button>Outside</button></div>);
        fireEvent.click(screen.getByRole('button', {name: 'Menu'}));
        fireEvent.mouseDown(screen.getByRole('button', {name: 'Outside'}));
        await waitFor(() => expect(screen.queryByRole('button', {name: 'Inside'})).not.toBeInTheDocument());
    });
});

describe('tooltip layout', () => {
    it('keeps the opener in normal layout and connects its accessible description', () => {
        render(<FluxTooltip content="More detail"><button>Help</button></FluxTooltip>);
        const button = screen.getByRole('button', {name: 'Help'});
        expect(button.parentElement).toHaveStyle({display: 'contents'});
        fireEvent.focus(button);
        const tooltip = screen.getByRole('tooltip');
        expect(button).toHaveAttribute('aria-describedby', tooltip.id);
    });
});
