import {renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {english as vueEnglish} from '../../components/src/data/i18n';
import {english} from './english';
import {FluxLocaleProvider, createTranslate} from './i18n';

describe('locale parity', () => {
    it('keeps the Vue fallback dictionary', () => expect(english).toEqual(vueEnglish));
    it('resolves app translations before English and interpolates fallback keys', () => {
        const useTranslate = createTranslate({greeting: 'Hello {name}', other: 'Other {name}'});
        const {result} = renderHook(useTranslate, {wrapper: ({children}) => <FluxLocaleProvider locale="nl-NL" messages={{nl: {greeting: 'Hallo {name}'}}}>{children}</FluxLocaleProvider>});
        expect(result.current('greeting', {name: 'Bas'})).toBe('Hallo Bas');
        expect(result.current('other', {name: 'Bas'})).toBe('Other Bas');
    });
});
