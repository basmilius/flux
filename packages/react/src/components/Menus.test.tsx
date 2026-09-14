import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxMenu, FluxMenuCheckbox, FluxMenuItem} from './Menus';

describe('React menus', () => {
    it('supports roving arrow-key focus', () => {
        render(<FluxMenu><FluxMenuItem label="First" /><FluxMenuItem label="Second" /></FluxMenu>);
        const first = screen.getByRole('menuitem', {name: 'First'});
        first.focus(); fireEvent.keyDown(first, {key: 'ArrowDown'});
        expect(screen.getByRole('menuitem', {name: 'Second'})).toHaveFocus();
    });

    it('exposes controlled checkbox state', () => {
        const change = vi.fn();
        render(<FluxMenu><FluxMenuCheckbox checked={false} label="Enabled" onCheckedChange={change} /></FluxMenu>);
        fireEvent.click(screen.getByRole('menuitemcheckbox', {name: 'Enabled'}));
        expect(change).toHaveBeenCalledWith(true);
    });
});
