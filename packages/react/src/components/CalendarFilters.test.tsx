import { fireEvent, render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { describe, expect, it, vi } from 'vitest';
import { FluxCalendar, FluxCalendarItem, FluxDatePicker, FluxFilter, FluxFilterOption, FluxFilterOptions, FluxFilterRange } from './CalendarFilters';

describe('FluxDatePicker', () => {
    it('selects a date and respects date boundaries', () => {
        const onValueChange = vi.fn();
        render(<FluxDatePicker defaultValue={DateTime.fromISO('2025-01-15')} min={DateTime.fromISO('2025-01-10')} max={DateTime.fromISO('2025-01-25')} onValueChange={onValueChange} />);

        const day = screen.getAllByRole('button', { name: '20' }).find((button) => !button.hasAttribute('disabled'));
        fireEvent.click(day!);
        expect(onValueChange.mock.calls[0][0].toISODate()).toBe('2025-01-20');
        expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('emits an ordered range after two selections', () => {
        const onValueChange = vi.fn();
        render(<FluxDatePicker defaultValue={DateTime.fromISO('2025-01-15')} rangeMode="range" onValueChange={onValueChange} />);

        const enabledDay = (label: string) => screen.getAllByRole('button', { name: label }).find((button) => !button.hasAttribute('disabled'))!;
        fireEvent.click(enabledDay('20'));
        fireEvent.click(enabledDay('12'));
        expect(onValueChange.mock.calls[0][0].map((date: DateTime) => date.toISODate())).toEqual(['2025-01-12', '2025-01-20']);
    });

    it('previews only the range between the selected and hovered dates', () => {
        render(<FluxDatePicker defaultValue={DateTime.fromISO('2025-01-15')} rangeMode="range" />);
        const enabledDay = (label: string) => screen.getAllByRole('button', { name: label }).find((button) => !button.hasAttribute('disabled'))!;
        fireEvent.click(enabledDay('20'));
        fireEvent.mouseEnter(enabledDay('12'));
        expect(enabledDay('15').className).toMatch(/isSelectionEntry/);
        expect(enabledDay('10').className).not.toMatch(/isSelectionEntry/);
        expect(enabledDay('25').className).not.toMatch(/isSelectionEntry/);
    });

    it('uses roving focus and arrow keys for day selection', () => {
        render(<FluxDatePicker defaultValue={DateTime.fromISO('2025-01-15')} />);
        const day15 = screen.getAllByRole('button', { name: '15' }).find((button) => !button.hasAttribute('disabled'))!;
        const day16 = screen.getAllByRole('button', { name: '16' }).find((button) => !button.hasAttribute('disabled'))!;
        expect(day15).toHaveAttribute('tabindex', '0');
        day15.focus();
        fireEvent.keyDown(day15, { key: 'ArrowRight' });
        expect(day16).toHaveFocus();
        expect(day16).toHaveAttribute('tabindex', '0');
    });
});

describe('FluxCalendar', () => {
    it('renders registered items and navigates months', () => {
        const onNavigate = vi.fn();
        render(
            <FluxCalendar view="month" initialDate={DateTime.fromISO('2025-01-15')} onNavigate={onNavigate}>
                <FluxCalendarItem id="planning" date={DateTime.fromISO('2025-01-20')}>
                    Planning
                </FluxCalendarItem>
            </FluxCalendar>
        );

        expect(screen.getByRole('button', { name: 'Planning' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('button', {name: 'Select month'})).toHaveTextContent('February');
        expect(screen.getByRole('button', {name: 'Select year'})).toHaveTextContent('2025');
        expect(onNavigate).toHaveBeenLastCalledWith(expect.objectContaining({ month: 2 }), expect.any(DateTime), expect.any(DateTime));
    });
});

describe('filter controls', () => {
    it('navigates into a single filter and keeps the selection panel open', async () => {
        const onValueChange = vi.fn(), onChange = vi.fn();
        render(<FluxFilter value={{status: null}} onValueChange={onValueChange}><FluxFilterOption name="status" label="Status" options={[{label: 'Open', value: 'open'}]} onChange={onChange} /></FluxFilter>);
        expect(screen.queryByText('Open')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('menuitem', {name: 'Status'}));
        fireEvent.click(await screen.findByRole('menuitemradio', {name: 'Open'}));
        expect(onValueChange).toHaveBeenCalledWith({status: 'open'});
        expect(onChange).toHaveBeenCalledOnce();
        expect(screen.getByRole('menuitem', {name: 'Back'})).toBeInTheDocument();
    });

    it('toggles the final multiple selection to null without emitting remove', async () => {
        const onValueChange = vi.fn(), onChange = vi.fn(), onClear = vi.fn();
        render(<FluxFilter value={{status: ['open']}} onValueChange={onValueChange}><FluxFilterOptions name="status" label="Status" options={[{label: 'Open', value: 'open'}]} onChange={onChange} onClear={onClear} /></FluxFilter>);
        fireEvent.click(screen.getByRole('menuitem', {name: /Status/}));
        fireEvent.click(await screen.findByRole('menuitemradio', {name: 'Open'}));
        expect(onValueChange).toHaveBeenCalledWith({status: null});
        expect(onChange).toHaveBeenCalledWith(null);
        expect(onClear).not.toHaveBeenCalled();
    });

    it('keeps the numeric range ordered', async () => {
        const onValueChange = vi.fn();
        render(<FluxFilter value={{price: [20, 80]}} onValueChange={onValueChange}><FluxFilterRange name="price" label="Price" min={0} max={100} /></FluxFilter>);
        fireEvent.click(screen.getByRole('menuitem', {name: /Price/}));
        const sliders = await screen.findAllByRole('slider');
        fireEvent.keyDown(sliders[0], {key: 'End'});
        expect(onValueChange).toHaveBeenCalledWith({price: [100, 100]});
    });

    it('blocks disabled filters and exposes reset and removal separately', async () => {
        const onValueChange = vi.fn(), onClear = vi.fn(), onReset = vi.fn();
        const {rerender} = render(<FluxFilter value={{status: 'closed'}} onValueChange={onValueChange}><FluxFilterOption disabled name="status" label="Status" options={[]} /></FluxFilter>);
        expect(screen.getByRole('menuitem', {name: /Status/})).toBeDisabled();
        rerender(<FluxFilter value={{status: 'closed'}} onValueChange={onValueChange} onClear={onClear} onReset={onReset}><FluxFilterOption name="status" label="Status" defaultValue="open" options={[{label: 'Open', value: 'open'}]} /></FluxFilter>);
        fireEvent.click(screen.getByRole('menuitem', {name: /Status/}));
        fireEvent.click(await screen.findByRole('menuitem', {name: 'Reset filters'}));
        expect(onValueChange).toHaveBeenCalledWith({status: 'open'});
        expect(onReset).toHaveBeenCalledWith('status');
        fireEvent.click(await screen.findByRole('menuitem', {name: /Status/}));
        fireEvent.click(await screen.findByRole('menuitem', {name: 'Remove filter'}));
        expect(onValueChange).toHaveBeenLastCalledWith({});
        expect(onClear).toHaveBeenCalledWith('status');
    });
});
