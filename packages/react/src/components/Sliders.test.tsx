import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxFormRangeSlider, FluxFormSlider} from './Sliders';

describe('slider interaction', () => {
    it('only notifies when dragging changes the snapped value', () => {
        const change = vi.fn();
        const {container} = render(<FluxFormSlider defaultValue={50} step={10} onValueChange={change} />);
        const root = container.firstElementChild as HTMLElement;
        root.getBoundingClientRect = () => ({left: 0, top: 0, width: 100, height: 6}) as DOMRect;
        fireEvent.pointerDown(root, {button: 0, pointerId: 1, clientX: 51});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 54});
        expect(change).not.toHaveBeenCalled();
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 61});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 64});
        expect(change).toHaveBeenCalledTimes(1);
        expect(change).toHaveBeenLastCalledWith(60);
        fireEvent.pointerUp(document, {pointerId: 1});
    });

    it('uses the full track for a continuous drag and stops on release', () => {
        const onValueChange = vi.fn();
        const {container} = render(<FluxFormSlider defaultValue={25} onValueChange={onValueChange} />);
        const root = container.firstElementChild as HTMLElement;
        root.getBoundingClientRect = () => ({left: 100, top: 20, width: 200, height: 6}) as DOMRect;
        fireEvent.pointerDown(root, {button: 0, pointerId: 1, clientX: 150, clientY: 23});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 250, clientY: 23});
        expect(onValueChange).toHaveBeenLastCalledWith(75);
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
        fireEvent.pointerUp(document, {pointerId: 1});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 100});
        expect(onValueChange).toHaveBeenLastCalledWith(75);
    });

    it('inverts vertical dragging and clamps to its bounds', () => {
        const {container} = render(<FluxFormSlider direction="vertical" min={10} max={20} step={.5} />);
        const root = container.firstElementChild as HTMLElement;
        root.getBoundingClientRect = () => ({left: 0, top: 100, width: 6, height: 200}) as DOMRect;
        fireEvent.pointerDown(root, {button: 0, pointerId: 1, clientX: 3, clientY: 150});
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '17.5');
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 3, clientY: 0});
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '20');
        fireEvent.pointerUp(document, {pointerId: 1});
    });

    it('selects the nearest range thumb and maintains minimum distance', () => {
        const {container} = render(<FluxFormRangeSlider defaultValue={[20, 80]} minDistance={10} />);
        const root = container.firstElementChild as HTMLElement;
        root.getBoundingClientRect = () => ({left: 0, top: 0, width: 100, height: 6}) as DOMRect;
        fireEvent.pointerDown(root, {button: 0, pointerId: 1, clientX: 25});
        fireEvent.pointerMove(document, {pointerId: 1, clientX: 95});
        expect(screen.getByRole('slider', {name: 'Lower bound'})).toHaveAttribute('aria-valuenow', '70');
        expect(screen.getByRole('slider', {name: 'Upper bound'})).toHaveAttribute('aria-valuenow', '80');
        fireEvent.pointerUp(document, {pointerId: 1});
        fireEvent.keyDown(screen.getByRole('slider', {name: 'Upper bound'}), {key: 'ArrowLeft'});
        expect(screen.getByRole('slider', {name: 'Upper bound'})).toHaveAttribute('aria-valuenow', '80');
    });

    it('keeps readonly controls unchanged', () => {
        const change = vi.fn();
        render(<FluxFormSlider isReadonly value={50} onValueChange={change} />);
        fireEvent.keyDown(screen.getByRole('slider'), {key: 'End'});
        fireEvent.pointerDown(screen.getByRole('slider'), {button: 0, pointerId: 1, clientX: 90});
        expect(change).not.toHaveBeenCalled();
    });
});
