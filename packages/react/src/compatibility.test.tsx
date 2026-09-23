import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { blue500, slate950 } from './colors';
import { FluxFadeTransition, createTranslate, defaultKeyboardGrabAnnounce, getFocusableElements, iban, isFluxFormSelectGroup, isFluxFormSelectOption, useBreakpoints, wrapFocus } from './compatibility';

describe('React compatibility APIs', () => {
    it('translates keys and interpolates parameters', () => {
        const translate = createTranslate({ greeting: 'Hello {name}' })();
        expect(translate('greeting', { name: 'Flux' })).toBe('Hello Flux');
        expect(translate('unknown')).toBe('unknown');
    });

    it('tracks responsive breakpoints', () => {
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: 800, writable: true });
        function BreakpointProbe() {
            const breakpoints = useBreakpoints();
            return <span>{breakpoints.currentBreakpoint}</span>;
        }

        render(<BreakpointProbe />);
        expect(screen.getByText('md')).toBeInTheDocument();

        act(() => {
            window.innerWidth = 1300;
            window.dispatchEvent(new Event('resize'));
        });
        expect(screen.getByText('xl')).toBeInTheDocument();
    });

    it('exposes transition, focus, form option, mask, and color helpers', () => {
        const { container, rerender } = render(
            <FluxFadeTransition>
                <button>Focusable</button>
            </FluxFadeTransition>
        );
        expect(getFocusableElements(container)).toHaveLength(1);
        rerender(
            <FluxFadeTransition show={false}>
                <button>Focusable</button>
            </FluxFadeTransition>
        );
        expect(screen.queryByText('Focusable')).not.toBeInTheDocument();

        expect(isFluxFormSelectGroup({ label: 'Group', options: [] })).toBe(true);
        expect(isFluxFormSelectOption({ label: 'One', value: 1 })).toBe(true);

        const input = document.createElement('input');
        input.value = 'nl91 abna 0417 1643 00';
        const handle = iban(input);
        expect(input.value).toBe('NL91 ABNA 0417 1643 00');
        handle.destroy();

        expect(blue500).toBe('#3b82f6');
        expect(slate950).toBe('#020617');
    });

    it('keeps keyboard announcements exposed to assistive technology', () => {
        defaultKeyboardGrabAnnounce('Moved');
        const region = document.querySelector('[aria-live="polite"]') as HTMLElement;
        expect(region).not.toHaveAttribute('hidden');
        expect(region).toHaveTextContent('Moved');
        region.remove();
    });

    it('falls back to the container when forced focus has no children', () => {
        const container = document.createElement('div');
        container.tabIndex = -1;
        document.body.append(container);
        expect(() => wrapFocus(container, container, true)).not.toThrow();
        expect(container).toHaveFocus();
        container.remove();
    });
});
