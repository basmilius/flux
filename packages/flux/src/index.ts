import './scss/index.scss';

export type { FluxAlertSpec, FluxConfirmSpec, FluxFormSelectOption, FluxFormSelectGroup, FluxRoutingLocation, IconNames } from './data';

export * from './components';
export * from './composables';
export { fluxAlert, fluxConfirm, fluxRegisterIcons, iconRegistry, isFluxFormSelectGroup, isFluxFormSelectOption, useFluxStore } from './data';
export * from './directives';
export * from './layout';
export * from './transition';
