import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import * as notifications from './Notifications';
import {FluxFormRepeater} from './Repeater';

describe('repeater parity', () => {
    it('preserves an input when the controlled form replaces its row object', () => {
        const view = render(<FluxFormRepeater value={[{name: 'Ada'}]}>{({row}) => <input aria-label="Name" value={row.name} readOnly />}</FluxFormRepeater>);
        const input = screen.getByRole('textbox');
        input.focus();
        view.rerender(<FluxFormRepeater value={[{name: 'Adaline'}]}>{({row}) => <input aria-label="Name" value={row.name} readOnly />}</FluxFormRepeater>);
        expect(screen.getByRole('textbox')).toBe(input);
        expect(input).toHaveFocus();
        expect(input).toHaveValue('Adaline');
    });

    it('keeps the grabbed input identity and restores its position on Escape', () => {
        const rows = [{name: 'Ada'}, {name: 'Grace'}, {name: 'Timo'}];
        render(<FluxFormRepeater isReorderable defaultValue={rows}>{({row}) => <input defaultValue={row.name} />}</FluxFormRepeater>);
        const ada = screen.getAllByRole('textbox')[0];
        const handle = screen.getByRole('button', {name: 'Reorder Row 1 of 3'});
        handle.focus();
        fireEvent.keyDown(handle, {key: ' '});
        fireEvent.keyDown(handle, {key: 'ArrowDown'});
        expect(screen.getAllByRole('textbox')[1]).toBe(ada);
        expect(document.activeElement).toBe(handle);
        fireEvent.keyDown(handle, {key: 'Escape'});
        expect(screen.getAllByRole('textbox')[0]).toBe(ada);
        expect(handle).toHaveAttribute('aria-pressed', 'false');
    });

    it('shows a drop indicator and moves a dragged row after the target', () => {
        const onMove = vi.fn();
        render(<FluxFormRepeater isReorderable defaultValue={['Ada', 'Grace', 'Timo']} onMove={onMove}>{({row}) => <input defaultValue={row} />}</FluxFormRepeater>);
        const transfer = {setData: vi.fn(), setDragImage: vi.fn(), effectAllowed: ''};
        fireEvent.dragStart(screen.getByRole('button', {name: 'Reorder Row 1 of 3'}), {dataTransfer: transfer});
        const target = screen.getByRole('group', {name: 'Row 3 of 3'});
        target.getBoundingClientRect = () => ({top: 100, height: 50}) as DOMRect;
        fireEvent.dragOver(target, {clientY: 140});
        expect(target.className).toContain('isDropAfter');
        fireEvent.drop(target);
        expect(screen.getAllByRole('textbox').map(input => (input as HTMLInputElement).value)).toEqual(['Grace', 'Timo', 'Ada']);
        expect(onMove).toHaveBeenCalledWith(0, 2);
        expect(target.className).not.toContain('isDropAfter');
    });

    it('confirms removal of populated rows and restores focus after removal', async () => {
        const confirm = vi.spyOn(notifications, 'showConfirm').mockResolvedValueOnce(false).mockResolvedValueOnce(true);
        render(<FluxFormRepeater defaultValue={['Ada', 'Grace']}>{({row}) => <input defaultValue={row} />}</FluxFormRepeater>);
        fireEvent.click(screen.getByRole('button', {name: 'Remove Row 1 of 2'}));
        await waitFor(() => expect(confirm).toHaveBeenCalledTimes(1));
        expect(screen.getAllByRole('textbox')).toHaveLength(2);
        fireEvent.click(screen.getByRole('button', {name: 'Remove Row 1 of 2'}));
        await waitFor(() => expect(screen.getAllByRole('textbox')).toHaveLength(1));
        expect(screen.getByRole('textbox')).toHaveValue('Grace');
        expect(screen.getByRole('button', {name: 'Remove Row 1 of 1'})).toHaveFocus();
        confirm.mockRestore();
    });
});
