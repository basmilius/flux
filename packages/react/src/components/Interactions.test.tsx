import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {createRef} from 'react';
import {describe, expect, it, vi} from 'vitest';
import {
    FluxCommandPalette, type FluxCommandPaletteHandle, FluxContextMenu, FluxFocalPointEditor,
    FluxInlineEdit, FluxSpeedDial, FluxSpeedDialAction, FluxSplitView, FluxSplitViewPane, FluxSwipeAction, FluxSwipeActions
} from './Interactions';

describe('FluxCommandPalette', () => {
    it('opens imperatively and activates the highlighted command', () => {
        const activate = vi.fn();
        const ref = createRef<FluxCommandPaletteHandle>();
        render(<FluxCommandPalette ref={ref} sources={[{key: 'main', label: 'Commands', items: [{id: 1, label: 'Create item', onActivate: activate}]}]} />);
        act(() => ref.current?.open());
        fireEvent.keyDown(screen.getByRole('dialog'), {key: 'Enter'});
        expect(activate).toHaveBeenCalledOnce();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});

describe('context and editing interactions', () => {
    it('opens a context menu at the pointer', async () => {
        render(<FluxContextMenu menu={({close}) => <button onClick={close}>Action</button>}><span>Target</span></FluxContextMenu>);
        fireEvent.contextMenu(screen.getByText('Target'), {clientX: 20, clientY: 30});
        expect(screen.getByRole('menu')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: 'Action'}));
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });

    it('edits and saves inline values', () => {
        const onSave = vi.fn();
        render(<FluxInlineEdit defaultValue="Old" onSave={onSave} />);
        fireEvent.click(screen.getByRole('button', {name: 'Old'}));
        fireEvent.change(screen.getByDisplayValue('Old'), {target: {value: 'New'}});
        fireEvent.keyDown(screen.getByDisplayValue('New'), {key: 'Enter'});
        expect(onSave).toHaveBeenCalledWith('New');
        expect(screen.getByText('New')).toBeInTheDocument();
    });
});

describe('compound interactions', () => {
    it('opens and closes a speed dial after an action', () => {
        render(<FluxSpeedDial label="Create"><FluxSpeedDialAction icon="plus" label="Document" /></FluxSpeedDial>);
        fireEvent.click(screen.getByRole('button', {name: 'Create'}));
        expect(screen.getByRole('button', {name: 'Create'})).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(screen.getByRole('menuitem', {name: 'Document'}));
        expect(screen.getByRole('button', {name: 'Create'})).toHaveAttribute('aria-expanded', 'false');
    });

    it('resizes split panes from the keyboard', () => {
        render(<FluxSplitView><FluxSplitViewPane defaultSize={500}>One</FluxSplitViewPane><FluxSplitViewPane defaultSize={500}>Two</FluxSplitViewPane></FluxSplitView>);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveAttribute('aria-valuenow', '50');
        fireEvent.keyDown(separator, {key: 'ArrowRight'});
        expect(separator).toHaveAttribute('aria-valuenow', '52');
    });

    it('applies pointer drag displacement from the starting sizes', () => {
        const {container} = render(<FluxSplitView><FluxSplitViewPane defaultSize={500}>One</FluxSplitViewPane><FluxSplitViewPane defaultSize={500}>Two</FluxSplitViewPane></FluxSplitView>);
        const root = container.firstElementChild as HTMLElement;
        Object.defineProperty(root, 'clientWidth', {configurable: true, value: 1000});
        const separator = screen.getByRole('separator');
        fireEvent.pointerDown(separator, {button: 0, pointerId: 1, clientX: 0});
        fireEvent.pointerMove(separator, {pointerId: 1, clientX: 100});
        fireEvent.pointerMove(separator, {pointerId: 1, clientX: 200});
        expect(separator).toHaveAttribute('aria-valuenow', '70');
        fireEvent.pointerUp(separator, {pointerId: 1});
    });

    it('keeps successful remote results when another source fails', async () => {
        render(<FluxCommandPalette defaultOpen sources={[
            {key: 'failed', label: 'Failed', items: [], fetchSearch: async () => { throw new Error('Offline'); }},
            {key: 'working', label: 'Working', items: [], fetchSearch: async () => [{id: 1, label: 'Available', onActivate() {}}]}
        ]} />);
        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'query'}});
        expect(await screen.findByRole('option', {name: 'Available'})).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    });

    it('disables actions inside a disabled swipe row', () => {
        render(<FluxSwipeActions disabled end={<FluxSwipeAction icon="trash" label="Delete"/>}>Message</FluxSwipeActions>);
        expect(screen.getByRole('button', {name: 'Delete'})).toBeDisabled();
    });

    it('moves the focal point with arrow keys', () => {
        const onValueChange = vi.fn();
        render(<FluxFocalPointEditor src="image.jpg" value={[50, 50]} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Focal point'}), {key: 'ArrowRight'});
        expect(onValueChange).toHaveBeenCalledWith([51, 50]);
    });
});
