import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FluxRouterProvider} from './routing';
import {FluxPressable} from './components/Actions';
import {FluxMenuCollapsible, FluxMenuItem} from './components/Menus';

describe('router integration', () => {
    it('resolves named routes and preserves modified link clicks', () => {
        const navigate = vi.fn();
        const to = {name: 'project', params: {id: 42}};
        render(<FluxRouterProvider router={{back() {}, navigate, resolve: () => '/projects/42'}}><FluxPressable componentType="route" to={to}>Project</FluxPressable></FluxRouterProvider>);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/projects/42');
        fireEvent.click(link);
        expect(navigate).toHaveBeenCalledWith(to);
        fireEvent.click(link, {ctrlKey: true});
        expect(navigate).toHaveBeenCalledOnce();
    });
    it('opens matching path and named-route groups without closing manually opened groups', () => {
        const content = <><FluxMenuCollapsible label="Projects"><FluxMenuItem to="/projects" label="Overview" /></FluxMenuCollapsible><FluxMenuCollapsible label="Settings"><FluxMenuItem to={{name: 'settings'}} label="Profile" /></FluxMenuCollapsible></>;
        const {rerender} = render(<FluxRouterProvider route={{path: '/projects/42'}}>{content}</FluxRouterProvider>);
        expect(screen.getByRole('menuitem', {name: 'Projects'})).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('menuitem', {name: 'Settings'})).toHaveAttribute('aria-expanded', 'false');
        rerender(<FluxRouterProvider route={{path: '/profile', matched: [{path: '/profile', name: 'settings'}]}}>{content}</FluxRouterProvider>);
        expect(screen.getByRole('menuitem', {name: 'Projects'})).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('menuitem', {name: 'Settings'})).toHaveAttribute('aria-expanded', 'true');
    });
});
