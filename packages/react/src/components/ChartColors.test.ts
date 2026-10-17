import {afterEach, describe, expect, it} from 'vitest';
import {deepResolveCssVars} from './ChartColors';

afterEach(() => {document.documentElement.style.cssText = '';});

describe('chart color resolution', () => {
    it('resolves nested variable fallbacks and light-dark pairs against the chart element', () => {
        const element = document.createElement('div');
        document.body.append(element);
        element.style.colorScheme = 'dark';
        element.style.setProperty('--series', 'light-dark(#112233, #aabbcc)');
        const resolved = deepResolveCssVars({color: ['var(--series)', 'var(--missing, rgb(1, 2, 3))']}, element);
        expect(resolved.color).toEqual(['#aabbcc', 'rgb(1, 2, 3)']);
        element.remove();
    });

    it('preserves non-plain chart values and unchanged object identity', () => {
        const date = new Date();
        const formatter = () => 'Value';
        const options = {date, formatter, color: '#123456'};
        expect(deepResolveCssVars(options)).toBe(options);
    });
});
