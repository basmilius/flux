import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxPressable, FluxPrimaryButton} from './Actions';

describe('FluxPressable', () => {
    it('blocks dangerous URLs', () => {
        render(<FluxPressable componentType="link" href="javascript:alert(1)">Unsafe</FluxPressable>);
        const link = screen.getByText('Unsafe');
        expect(link).not.toHaveAttribute('href');
        expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('adds safe defaults to links opening a new tab', () => {
        render(<FluxPressable componentType="link" href="https://example.com" target="_blank">Safe</FluxPressable>);
        expect(screen.getByRole('link', {name: 'Safe'})).toHaveAttribute('rel', 'noopener noreferrer');
    });
});

describe('FluxPrimaryButton', () => {
    it('uses the same default medium sizing class as Vue', () => {
        render(<FluxPrimaryButton label="Save" />);
        expect(screen.getByRole('button', {name: 'Save'}).className).toMatch(/isMedium|is-medium/);
    });

    it('does not fire while loading', () => {
        const onClick = vi.fn();
        render(<FluxPrimaryButton label="Save" isLoading onClick={onClick} />);
        fireEvent.click(screen.getByRole('button', {name: 'Save'}));
        expect(onClick).not.toHaveBeenCalled();
        expect(screen.getByRole('button', {name: 'Save'}).querySelector('svg')?.className.baseVal).not.toMatch(/buttonIcon|button-icon/);
    });
});
