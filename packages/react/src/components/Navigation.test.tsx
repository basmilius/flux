import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxPagination, FluxSegmentedControl, FluxSegmentedControlItem, FluxTabBar, FluxTabBarItem} from './Navigation';

describe('FluxPagination', () => {
    it('navigates and disables unavailable directions', () => {
        const onNavigate = vi.fn();
        render(<FluxPagination arrows page={1} perPage={10} total={42} onNavigate={onNavigate} />);
        expect(screen.getByRole('button', {name: 'Previous'})).toBeDisabled();
        fireEvent.click(screen.getByRole('button', {name: 'Next'}));
        expect(onNavigate).toHaveBeenCalledWith(2);
    });
});

describe('keyboard navigation', () => {
    it('moves and selects segmented controls with arrow keys', () => {
        const onValueChange = vi.fn();
        render(<FluxSegmentedControl value="list" onValueChange={onValueChange}><FluxSegmentedControlItem value="list" label="List" /><FluxSegmentedControlItem value="grid" label="Grid" /></FluxSegmentedControl>);
        const list = screen.getByRole('radio', {name: 'List'});
        list.focus();
        fireEvent.keyDown(list, {key: 'ArrowRight'});
        expect(onValueChange).toHaveBeenCalledWith('grid');
    });

    it('positions the active highlight behind the selected item', () => {
        const {rerender, container} = render(<FluxSegmentedControl value="list" onValueChange={() => undefined}><FluxSegmentedControlItem value="list" label="List" /><FluxSegmentedControlItem value="grid" label="Grid" /></FluxSegmentedControl>);
        const list = screen.getByRole('radio', {name: 'List'});
        Object.defineProperties(list, {offsetLeft: {configurable: true, value: 7}, offsetWidth: {configurable: true, value: 64}});
        rerender(<FluxSegmentedControl value="grid" onValueChange={() => undefined}><FluxSegmentedControlItem value="list" label="List" /><FluxSegmentedControlItem value="grid" label="Grid" /></FluxSegmentedControl>);
        rerender(<FluxSegmentedControl value="list" onValueChange={() => undefined}><FluxSegmentedControlItem value="list" label="List" /><FluxSegmentedControlItem value="grid" label="Grid" /></FluxSegmentedControl>);
        expect(container.querySelector('[style="left: 7px; width: 64px;"]')).toBeInTheDocument();
    });

    it('wraps tab focus', () => {
        const second = vi.fn();
        render(<FluxTabBar><FluxTabBarItem label="First" isActive /><FluxTabBarItem label="Second" onClick={second} /></FluxTabBar>);
        const first = screen.getByRole('tab', {name: 'First'});
        first.focus();
        fireEvent.keyDown(first, {key: 'ArrowLeft'});
        expect(second).toHaveBeenCalledOnce();
    });
});
