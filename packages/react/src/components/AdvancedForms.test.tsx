import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {
    FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormNumberInput, FluxFormPinInput,
    FluxFormRadio, FluxFormRadioGroup, FluxFormRating, FluxFormTagsInput
} from './AdvancedForms';

describe('advanced form controls', () => {
    it('coordinates radio group values', () => {
        const onValueChange = vi.fn();
        render(<FluxFormRadioGroup defaultValue="a" onValueChange={onValueChange}><FluxFormRadio label="A" value="a" /><FluxFormRadio label="B" value="b" /></FluxFormRadioGroup>);
        fireEvent.click(screen.getByRole('radio', {name: 'B'}));
        expect(onValueChange).toHaveBeenCalledWith('b');
        expect(screen.getByRole('radio', {name: 'B'})).toBeChecked();
    });

    it('toggles checkbox tile group values', () => {
        const onValueChange = vi.fn();
        render(<FluxFormCheckboxGroup defaultValue={['one']} onValueChange={onValueChange}><FluxFormCheckboxTile label="Two" value="two" /></FluxFormCheckboxGroup>);
        fireEvent.click(screen.getByRole('checkbox', {name: 'Two'}));
        expect(onValueChange).toHaveBeenCalledWith(['one', 'two']);
    });

    it('steps and clamps a number input', () => {
        const onValueChange = vi.fn();
        render(<FluxFormNumberInput aria-label="Count" defaultValue={2} max={3} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('spinbutton', {name: 'Count'}), {key: 'ArrowUp'});
        expect(onValueChange).toHaveBeenCalledWith(3);
    });

    it('accepts a pasted pin and exposes each digit', () => {
        const onValueChange = vi.fn();
        render(<FluxFormPinInput aria-label="PIN" maxLength={4} onValueChange={onValueChange} />);
        fireEvent.paste(screen.getByRole('textbox', {name: 'Digit 1 of 4'}), {clipboardData: {getData: () => '12-34'}});
        expect(onValueChange).toHaveBeenCalledWith('1234');
    });

    it('preserves later pin positions while editing an earlier digit', () => {
        const onValueChange = vi.fn();
        render(<FluxFormPinInput aria-label="PIN" defaultValue="1234" maxLength={4} onValueChange={onValueChange} />);
        const second = screen.getByRole('textbox', {name: 'Digit 2 of 4'});
        fireEvent.change(second, {target: {value: ''}});
        fireEvent.change(second, {target: {value: '9'}});
        expect(onValueChange).toHaveBeenLastCalledWith('1934');
        expect(screen.getByRole('textbox', {name: 'Digit 3 of 4'})).toHaveValue('3');
        expect(screen.getByRole('textbox', {name: 'Digit 4 of 4'})).toHaveValue('4');
    });

    it('supports rating keyboard changes', () => {
        const onValueChange = vi.fn();
        render(<FluxFormRating defaultValue={2} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider'), {key: 'ArrowRight'});
        expect(onValueChange).toHaveBeenCalledWith(3);
    });

    it('adds and removes tags from the keyboard', () => {
        const onValueChange = vi.fn();
        render(<FluxFormTagsInput placeholder="Tags" onValueChange={onValueChange} />);
        const input = screen.getByRole('combobox');
        fireEvent.change(input, {target: {value: 'react'}});
        fireEvent.keyDown(input, {key: 'Enter'});
        expect(onValueChange).toHaveBeenCalledWith(['react']);
        expect(screen.getByText('react')).toBeInTheDocument();
    });
});
