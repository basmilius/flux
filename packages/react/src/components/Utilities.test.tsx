import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxColorPicker, FluxColorSelect} from './Color';
import {FluxMasonry, FluxWindow} from './Utilities';
import {FluxExpandablePane} from './Disclosure';

describe('FluxMasonry', () => {
    it('keeps measurements across parent renders and measures inserted items', async () => {
        const view = render(<FluxMasonry><div>First</div></FluxMasonry>);
        const first = screen.getByText('First');
        const measure = vi.spyOn(first, 'getBoundingClientRect');
        view.rerender(<FluxMasonry><div>First</div></FluxMasonry>);
        expect(measure).not.toHaveBeenCalled();
        view.rerender(<FluxMasonry><div>First</div><div>Second</div></FluxMasonry>);
        await waitFor(() => expect(screen.getByText('Second').style.gridRowEnd).toBe('span 15'));
        expect(measure).toHaveBeenCalled();
    });
});

describe('FluxExpandablePane', () => {
    it('toggles an accessible region', () => {
        const onToggle = vi.fn();
        render(<FluxExpandablePane title="Details" onToggle={onToggle}>Body</FluxExpandablePane>);
        fireEvent.click(screen.getByRole('button', {name: 'Details'}));
        expect(screen.getByRole('region')).toHaveTextContent('Body');
        expect(onToggle).toHaveBeenCalledWith(true);
    });
});

describe('FluxWindow', () => {
    it('navigates between named views', () => {
        render(<FluxWindow views={{default: <span>Home</span>, edit: <span>Edit</span>}}>{undefined}</FluxWindow>);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('exposes navigation to a render child', async () => {
        render(<FluxWindow>{state => <button onClick={() => state.navigate('edit')}>{state.view}</button>}</FluxWindow>);
        fireEvent.click(screen.getByRole('button', {name: 'default'}));
        expect(await screen.findByRole('button', {name: 'edit'})).toBeInTheDocument();
    });
});

describe('color controls', () => {
    it('changes hue with the keyboard', () => {
        const onValueChange = vi.fn();
        render(<FluxColorPicker value="#ff0000" onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Hue'}), {key: 'ArrowRight'});
        expect(onValueChange).toHaveBeenCalledWith('#ff0000');
    });

    it('supports roving swatch selection', () => {
        const onValueChange = vi.fn();
        render(<FluxColorSelect colors={['#ff0000', '#00ff00']} value="#ff0000" onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('radio', {name: '#ff0000'}), {key: 'ArrowRight'});
        fireEvent.click(screen.getByRole('radio', {name: '#00ff00'}));
        expect(onValueChange).toHaveBeenCalledWith('#00ff00');
    });
});
