import {fireEvent, render, screen} from '@testing-library/react';
import {DateTime} from 'luxon';
import {describe, expect, it, vi} from 'vitest';
import {
    FluxFader, FluxFaderItem, FluxFormCombobox, FluxFormDateInput, FluxFormDateTimeInput,
    FluxFormFader, FluxFormRepeater, FluxFormSelect
} from './SelectionForms';

describe('selection and date controls', () => {
    it('preserves typed select values', () => {
        const onValueChange = vi.fn();
        render(<FluxFormSelect aria-label="Priority" options={[{label: 'One', value: 1}, {label: 'Two', value: 2}]} value={1} onValueChange={onValueChange} />);
        fireEvent.change(screen.getByRole('combobox', {name: 'Priority'}), {target: {value: 'number:2'}});
        expect(onValueChange).toHaveBeenCalledWith(2);
    });

    it('emits Luxon dates from the native date input', () => {
        const onValueChange = vi.fn();
        render(<FluxFormDateInput aria-label="Date" value={DateTime.fromISO('2026-09-11')} onValueChange={onValueChange} />);
        fireEvent.change(screen.getByLabelText('Date'), {target: {value: '2026-09-12'}});
        expect(onValueChange.mock.calls[0][0].toISODate()).toBe('2026-09-12');
    });

    it('keeps created options selected in an uncontrolled multiple combobox', () => {
        const onValueChange = vi.fn();
        render(<FluxFormCombobox aria-label="Tags" isCreatable isMultiple defaultValue={['existing']} options={[{label: 'Existing', value: 'existing'}]} onValueChange={onValueChange} />);
        const search = screen.getByRole('searchbox', {name: 'Tags search'});
        fireEvent.change(search, {target: {value: 'created'}});
        fireEvent.keyDown(search, {key: 'Enter'});
        expect(onValueChange).toHaveBeenLastCalledWith(['existing', 'created']);
        expect(screen.getByRole('option', {name: 'created'})).toHaveProperty('selected', true);
    });

    it('names both native date-time fields for form submission', () => {
        const {container} = render(<FluxFormDateTimeInput name="startsAt" />);
        expect(container.querySelector('input[type="date"]')).toHaveAttribute('name', 'startsAt');
        expect(container.querySelector('input[type="time"]')).toHaveAttribute('name', 'startsAt-time');
    });
});

describe('faders and repeaters', () => {
    it('supports fader keyboard stepping', () => {
        const onValueChange = vi.fn();
        render(<FluxFormFader ariaLabel="Volume" value={5} max={10} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Volume'}), {key: 'ArrowRight'});
        expect(onValueChange).toHaveBeenCalledWith(6);
    });

    it('does not change a read-only fader from the keyboard', () => {
        const onValueChange = vi.fn();
        render(<FluxFormFader ariaLabel="Volume" isReadonly value={5} max={10} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Volume'}), {key: 'ArrowRight'});
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('only exposes the current carousel item', () => {
        render(<FluxFader autoplay={false}><FluxFaderItem>First</FluxFaderItem><FluxFaderItem>Second</FluxFaderItem></FluxFader>);
        expect(screen.getByText('First').closest('[aria-hidden]')).toBeNull();
        expect(screen.getByText('Second').closest('[aria-hidden="true"]')).not.toBeNull();
    });

    it('adds and removes repeater rows', () => {
        const onValueChange = vi.fn();
        render(<FluxFormRepeater defaultValue={['one']} newRow={() => 'two'} onValueChange={onValueChange}>{({row}) => <input aria-label={row} defaultValue={row} />}</FluxFormRepeater>);
        fireEvent.click(screen.getByRole('button', {name: 'Add'}));
        expect(onValueChange).toHaveBeenLastCalledWith(['one', 'two']);
        fireEvent.click(screen.getByRole('button', {name: 'Remove Row 1'}));
        expect(onValueChange).toHaveBeenLastCalledWith(['two']);
    });
});
