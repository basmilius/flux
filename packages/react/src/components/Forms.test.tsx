import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxFormCheckbox, FluxFormField, FluxFormInput, FluxFormTextArea, FluxToggle} from './Forms';
import {FluxDisabled} from './DisplayExtended';

describe('React form components', () => {
    it('connects a field label and error to its input', () => {
        render(<FluxFormField label="Email" error="Required"><FluxFormInput /></FluxFormField>);
        const input = screen.getByLabelText('Email');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('Required');
    });

    it('uses the Vue hint class and structure for field additions', () => {
        render(<FluxFormField label="Email" hint="Helpful"><FluxFormInput /></FluxFormField>);
        const addition = screen.getByText('Helpful').parentElement;
        expect(addition?.tagName).toBe('DIV');
        expect(addition?.className).toMatch(/formFieldAdditionHint|form-field-addition-hint/);
    });

    it('reports toggle changes', () => {
        const onCheckedChange = vi.fn();
        render(<FluxToggle aria-label="Enabled" onCheckedChange={onCheckedChange} />);
        fireEvent.click(screen.getByRole('switch', {name: 'Enabled'}));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('disables core controls through FluxDisabled context', () => {
        render(<FluxDisabled>
            <FluxFormInput aria-label="Input" />
            <FluxFormTextArea aria-label="Textarea" />
            <FluxFormCheckbox aria-label="Checkbox" />
            <FluxToggle aria-label="Toggle" />
        </FluxDisabled>);
        expect(screen.getByLabelText('Input')).toBeDisabled();
        expect(screen.getByLabelText('Textarea')).toBeDisabled();
        expect(screen.getByLabelText('Checkbox')).toBeDisabled();
        expect(screen.getByLabelText('Toggle')).toBeDisabled();
    });
});
