import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {
    FluxActivityFeed, FluxActivityFeedItem, FluxDisabled, FluxDropZone, FluxQuantitySelector,
    FluxStepper, FluxStepperStep
} from './DisplayExtended';

describe('FluxDropZone', () => {
    it('accepts matching files and reports rejected files', () => {
        const onSelectMultiple = vi.fn();
        const onReject = vi.fn();
        const {container} = render(<FluxDropZone accept="image/*" isMultiple onReject={onReject} onSelectMultiple={onSelectMultiple} />);
        const input = container.querySelector('input[type="file"]')!;
        const image = new File(['image'], 'photo.png', {type: 'image/png'});
        const documentFile = new File(['text'], 'notes.txt', {type: 'text/plain'});
        fireEvent.change(input, {target: {files: Object.assign([image, documentFile], {item: (index: number) => [image, documentFile][index] ?? null})}});
        expect(onReject).toHaveBeenCalledWith([documentFile]);
        expect(Array.from(onSelectMultiple.mock.calls[0][0])).toEqual([image]);
    });
});

describe('FluxQuantitySelector', () => {
    it('clamps, increments, and respects a disabled scope', () => {
        const onValueChange = vi.fn();
        const {rerender} = render(<FluxQuantitySelector defaultValue={1} max={2} onValueChange={onValueChange} />);
        fireEvent.click(screen.getByRole('button', {name: 'Increase'}));
        expect(onValueChange).toHaveBeenLastCalledWith(2);
        expect(screen.getByRole('button', {name: 'Increase'})).toBeDisabled();

        rerender(<FluxDisabled><FluxQuantitySelector defaultValue={1} /></FluxDisabled>);
        expect(screen.getByRole('spinbutton')).toBeDisabled();
    });
});

describe('FluxStepper', () => {
    it('activates steps and renders their content', () => {
        render(<FluxStepper><FluxStepperStep>One</FluxStepperStep><FluxStepperStep>Two</FluxStepperStep></FluxStepper>);
        expect(screen.getByText('One')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', {name: '2'}));
        expect(screen.getByText('Two')).toBeInTheDocument();
    });
});

describe('FluxActivityFeed', () => {
    it('adds one separator for consecutive entries on the same day', () => {
        render(<FluxActivityFeed isGrouped><FluxActivityFeedItem day="Today">Created</FluxActivityFeedItem><FluxActivityFeedItem day="Today">Updated</FluxActivityFeedItem></FluxActivityFeed>);
        expect(screen.getAllByText('Today')).toHaveLength(1);
    });
});
