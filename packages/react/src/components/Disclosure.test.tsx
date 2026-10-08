import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxExpandable, FluxExpandableGroup, FluxExpandablePane} from './Disclosure';
import {FluxFadeTransition} from './Transitions';

describe('disclosure parity', () => {
    it('opens the first group member and emits changes for both members when switching', () => {
        const first = vi.fn();
        const second = vi.fn();
        render(<FluxExpandableGroup><FluxExpandable label="First" onToggle={first}>One</FluxExpandable><FluxExpandablePane title="Second" onToggle={second}>Two</FluxExpandablePane></FluxExpandableGroup>);
        expect(screen.getByRole('button', {name: 'First'})).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(screen.getByRole('button', {name: 'Second'}));
        expect(first).toHaveBeenLastCalledWith(false);
        expect(second).toHaveBeenLastCalledWith(true);
        expect(screen.getByRole('button', {name: 'First'})).toHaveAttribute('aria-expanded', 'false');
    });

    it('lets controlled groups start closed and exposes close to custom bodies', () => {
        render(<FluxExpandableGroup isControlled><FluxExpandable label="Details" body={({close}) => <button onClick={close}>Close body</button>} /></FluxExpandableGroup>);
        const header = screen.getByRole('button', {name: 'Details'});
        expect(header).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(header);
        fireEvent.click(screen.getByRole('button', {name: 'Close body'}));
        expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('retains a leaving child and cancels its removal when reopened', async () => {
        const child = <div style={{transitionDuration: '0.1s'}}>Content</div>;
        const {rerender} = render(<FluxFadeTransition>{child}</FluxFadeTransition>);
        rerender(<FluxFadeTransition show={false}>{child}</FluxFadeTransition>);
        expect(screen.getByText('Content')).toBeInTheDocument();
        rerender(<FluxFadeTransition>{child}</FluxFadeTransition>);
        await waitFor(() => expect(screen.getByText('Content').className).not.toContain('EnterActive'));
        expect(screen.getByText('Content')).toBeInTheDocument();
        rerender(<FluxFadeTransition show={false}>{child}</FluxFadeTransition>);
        await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('finishes an outgoing keyed panel before mounting its replacement', async () => {
        const {rerender} = render(<FluxFadeTransition><div key="one">One</div></FluxFadeTransition>);
        rerender(<FluxFadeTransition><div key="two">Two</div></FluxFadeTransition>);
        expect(screen.getByText('One')).toBeInTheDocument();
        expect(screen.queryByText('Two')).not.toBeInTheDocument();
        await screen.findByText('Two');
        expect(screen.queryByText('One')).not.toBeInTheDocument();
    });
});
