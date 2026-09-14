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
        expect(onValueChange).toHaveBeenLastCalledWith('#ffffff');
    });
});
