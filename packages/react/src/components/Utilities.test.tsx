import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxColorPicker, FluxColorSelect} from './Color';
import {FluxExpandablePane, FluxWindow} from './Utilities';

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

    it('exposes navigation to a render child', () => {
        render(<FluxWindow>{state => <button onClick={() => state.navigate('edit')}>{state.view}</button>}</FluxWindow>);
        fireEvent.click(screen.getByRole('button', {name: 'default'}));
        expect(screen.getByRole('button', {name: 'edit'})).toBeInTheDocument();
    });
});

describe('color controls', () => {
    it('emits the selected native color', () => {
        const onValueChange = vi.fn();
        render(<FluxColorPicker value="#ff0000" onValueChange={onValueChange} />);
        fireEvent.change(screen.getByLabelText('Color'), {target: {value: '#00ff00'}});
        expect(onValueChange).toHaveBeenCalledWith('#00ff00');
    });

    it('supports roving swatch selection', () => {
        const onValueChange = vi.fn();
        render(<FluxColorSelect colors={['#ff0000', '#00ff00']} value="#ff0000" onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('radio', {name: '#ff0000'}), {key: 'ArrowRight'});
        fireEvent.click(screen.getByRole('radio', {name: '#00ff00'}));
        expect(onValueChange).toHaveBeenCalledWith('#00ff00');
    });
});
