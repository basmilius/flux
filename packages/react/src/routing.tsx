import {createContext, useContext, type ReactNode} from 'react';
import type {FluxTo} from './types';

export interface FluxRoute {
    path?: string;
    fullPath?: string;
    matched?: readonly {name?: string | symbol; path: string}[];
}
export interface FluxRouter {
    back(): void;
    navigate?(to: FluxTo): void;
    resolve?(to: FluxTo): string;
}
const RoutingContext = createContext<{route: FluxRoute | null; router: FluxRouter | null}>({route: null, router: null});

/** Adapts an application's router without coupling Flux to a routing library. */
export function FluxRouterProvider({children, route, router}: {children?: ReactNode; route?: FluxRoute | null; router?: FluxRouter | null}) {
    const parent = useContext(RoutingContext);
    return <RoutingContext.Provider value={{route: route ?? parent.route, router: router ?? parent.router}}>{children}</RoutingContext.Provider>;
}
export function useFluxRouting() {
    return useContext(RoutingContext);
}
export function routeMatches(route: FluxRoute | null, target?: FluxTo): boolean {
    if (!route || !target) return false;
    if (typeof target !== 'string' && target.name) return Boolean(route.matched?.some(record => record.name === target.name));
    const path = typeof target === 'string' ? target : target.path ?? target.pathname;
    const current = route.path ?? route.fullPath?.split(/[?#]/)[0];
    return Boolean(path && current && (current === path || current.startsWith(`${path}/`)));
}
