import {act, render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {FluxFadeTransition} from './Transitions';

const frame = () => act(() => vi.advanceTimersByTime(40));

afterEach(() => vi.useRealTimers());

describe('transition content', () => {
    it('retains the latest anchor position, content and classes throughout leave', () => {
        vi.useFakeTimers();
        const {rerender} = render(<FluxFadeTransition><div style={{left: 0}}>Initial</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition><div className="positioned" style={{left: 320, width: 240}}>Updated</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition show={false}><div style={{left: 0}}>Hidden</div></FluxFadeTransition>);
        const popup = screen.getByText('Updated');
        expect(popup).toHaveStyle({left: '320px', width: '240px'});
        expect(popup).toHaveClass('positioned');
        frame();
        frame();
        expect(screen.queryByText('Updated')).not.toBeInTheDocument();
    });

    it('cancels a leave when the same child reopens with fresh content', () => {
        vi.useFakeTimers();
        const afterLeave = vi.fn();
        const {rerender} = render(<FluxFadeTransition onAfterLeave={afterLeave}><div>Open</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition show={false} onAfterLeave={afterLeave}><div>Open</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition onAfterLeave={afterLeave}><div>Reopened</div></FluxFadeTransition>);
        frame();
        frame();
        expect(screen.getByText('Reopened')).toBeInTheDocument();
        expect(afterLeave).not.toHaveBeenCalled();
    });

    it('retains the latest outgoing child before starting an out-in replacement', () => {
        vi.useFakeTimers();
        const {rerender} = render(<FluxFadeTransition><div key="a">Initial</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition><div key="a">Updated</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition><div key="b">Next</div></FluxFadeTransition>);
        expect(screen.getByText('Updated')).toBeInTheDocument();
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
        frame();
        frame();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.queryByText('Updated')).not.toBeInTheDocument();
    });
});
