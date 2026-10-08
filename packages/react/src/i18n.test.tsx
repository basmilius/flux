import {renderHook} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import ts from 'typescript';
import {describe, expect, it} from 'vitest';
import {english} from './english';
import {FluxLocaleProvider, createTranslate} from './i18n';

describe('locale parity', () => {
    it('keeps the Vue fallback dictionary', () => {
        // Read the reference without loading the Vue package's build configuration.
        const source = ts.createSourceFile('i18n.ts', readFileSync(resolve(import.meta.dirname, '../../components/src/data/i18n.ts'), 'utf8'), ts.ScriptTarget.Latest);
        const declaration = source.statements.filter(ts.isVariableStatement).flatMap(statement => statement.declarationList.declarations).find(item => ts.isIdentifier(item.name) && item.name.text === 'english');
        const initializer = declaration?.initializer;
        const dictionary = initializer && ts.isAsExpression(initializer) ? initializer.expression : initializer;
        if (!dictionary || !ts.isObjectLiteralExpression(dictionary)) throw new Error('Expected the Vue English dictionary to be an object literal.');
        const vueEnglish = Object.fromEntries(dictionary.properties.map(property => {
            if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.name) || !ts.isStringLiteral(property.initializer)) throw new Error('Expected literal translation keys and values.');
            return [property.name.text, property.initializer.text];
        }));
        expect(english).toEqual(vueEnglish);
    });
    it('resolves app translations before English and interpolates fallback keys', () => {
        const useTranslate = createTranslate({greeting: 'Hello {name}', other: 'Other {name}'});
        const {result} = renderHook(useTranslate, {wrapper: ({children}) => <FluxLocaleProvider locale="nl-NL" messages={{nl: {greeting: 'Hallo {name}'}}}>{children}</FluxLocaleProvider>});
        expect(result.current('greeting', {name: 'Bas'})).toBe('Hallo Bas');
        expect(result.current('other', {name: 'Bas'})).toBe('Other Bas');
    });
});
