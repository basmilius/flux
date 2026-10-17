import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxColorPicker} from './Color';

describe('FluxColorPicker', () => {
    it('keeps an incomplete hexadecimal draft while editing', () => {
        const onValueChange = vi.fn();
        render(<FluxColorPicker defaultValue="#3b82f6" onValueChange={onValueChange} />);
        const input = screen.getByLabelText('Hex');
        fireEvent.change(input, {target: {value: '#'}});
        expect(input).toHaveValue('#');
        expect(onValueChange).not.toHaveBeenCalled();
        fireEvent.change(input, {target: {value: '#ffffff'}});
        expect(onValueChange).not.toHaveBeenCalled();
        fireEvent.blur(input);
        expect(onValueChange).toHaveBeenLastCalledWith('#ffffff');
    });
    it('preserves hue while editing an achromatic color', () => {
        const onValueChange = vi.fn();
        render(<FluxColorPicker defaultValue="#ffffff" onValueChange={onValueChange} />);
        const hue = screen.getByRole('slider', {name: 'Hue'});
        fireEvent.keyDown(hue, {key: 'ArrowRight'});
        expect(hue).toHaveAttribute('aria-valuenow', '0.1');
        fireEvent.keyDown(hue, {key: 'ArrowRight'});
        expect(hue).toHaveAttribute('aria-valuenow', '0.2');
    });

    it('includes opacity in hexadecimal output', () => {
        const onValueChange = vi.fn(), onAlphaChange = vi.fn();
        render(<FluxColorPicker defaultValue="#ff0000ff" isAlphaEnabled onValueChange={onValueChange} onAlphaChange={onAlphaChange} />);
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Opacity'}), {key: 'Home'});
        expect(onAlphaChange).toHaveBeenCalledWith(0);
        expect(onValueChange).toHaveBeenCalledWith('#ff000000');
    });
});
