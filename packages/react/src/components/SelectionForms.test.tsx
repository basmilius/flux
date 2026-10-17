import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {DateTime} from 'luxon';
import * as notifications from './Notifications';
import {describe, expect, it, vi} from 'vitest';
import {
    FluxFader, FluxFaderItem, FluxFormCombobox, FluxFormDateInput, FluxFormDateTimeInput,
    FluxFormFader, FluxFormRangeFader, FluxFormRepeater, FluxFormSelect, FluxFormSelectAsync
} from './SelectionForms';

describe('selection and date controls', () => {
    it('preserves typed select values', () => {
        const onValueChange = vi.fn();
        render(<FluxFormSelect aria-label="Priority" options={[{label: 'One', value: 1}, {label: 'Two', value: 2}]} value={1} onValueChange={onValueChange} />);
        fireEvent.click(screen.getByRole('combobox', {name: 'Priority'}));
        fireEvent.click(screen.getByRole('option', {name: 'Two'}));
        expect(onValueChange).toHaveBeenCalledWith(2);
    });

    it('loads externally changed async selections independently of search results', async () => {
        const fetchOptions = vi.fn(async (ids: (string | number | null)[]) => ids.map(value => ({value, label: `Selected ${value}`})));
        const fetchRelevant = vi.fn(() => new Promise<never>(() => {}));
        const fetchSearch = vi.fn(async () => []);
        const {rerender} = render(<FluxFormSelectAsync value={1} fetchOptions={fetchOptions} fetchRelevant={fetchRelevant} fetchSearch={fetchSearch}/>);
        expect(await screen.findByText('Selected 1')).toBeInTheDocument();
        rerender(<FluxFormSelectAsync value={2} fetchOptions={fetchOptions} fetchRelevant={fetchRelevant} fetchSearch={fetchSearch}/>);
        expect(await screen.findByText('Selected 2')).toBeInTheDocument();
        expect(fetchOptions).toHaveBeenLastCalledWith([2]);
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
        fireEvent.click(screen.getByRole('combobox', {name: 'Tags'}));
        const search = screen.getByRole('searchbox', {name: 'Tags search'});
        fireEvent.change(search, {target: {value: 'created'}});
        fireEvent.keyDown(search, {key: 'Enter'});
        expect(onValueChange).toHaveBeenLastCalledWith(['existing', 'created']);
        expect(screen.getByText('created')).toBeInTheDocument();
        expect(screen.queryByRole('option', {name: 'created'})).not.toBeInTheDocument();
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

    it('drags both range fader bounds on one track', () => {
        const {container} = render(<FluxFormRangeFader defaultValue={[20, 80]} minDistance={10} />);
        const root = container.firstElementChild as HTMLElement;
        root.getBoundingClientRect = () => ({left: 0, top: 0, width: 100, height: 36}) as DOMRect;
        fireEvent.pointerDown(root, {button: 0, pointerId: 1, clientX: 25});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 60});
        expect(screen.getByRole('slider', {name: 'Lower bound'})).toHaveAttribute('aria-valuenow', '60');
        fireEvent.pointerUp(document, {pointerId: 1});
        fireEvent.pointerDown(root, {button: 0, pointerId: 2, clientX: 85});
        fireEvent.pointerMove(document, {pointerId: 2, clientX: 65});
        expect(screen.getByRole('slider', {name: 'Upper bound'})).toHaveAttribute('aria-valuenow', '70');
        fireEvent.pointerUp(document, {pointerId: 2});
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

    it('adds and removes repeater rows', async () => {
        const confirm = vi.spyOn(notifications, 'showConfirm').mockResolvedValue(true);
        const onValueChange = vi.fn();
        render(<FluxFormRepeater defaultValue={['one']} newRow={() => 'two'} onValueChange={onValueChange}>{({row}) => <input aria-label={row} defaultValue={row} />}</FluxFormRepeater>);
        fireEvent.click(screen.getByRole('button', {name: 'Add Row'}));
        expect(onValueChange).toHaveBeenLastCalledWith(['one', 'two']);
        fireEvent.click(screen.getByRole('button', {name: 'Remove Row 1 of 2'}));
        await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith(['two']));
        confirm.mockRestore();
    });
});
