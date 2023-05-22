import type { FluxAlertSpec, FluxConfirmSpec, FluxSnackbarSpec, FluxTooltipSpec } from './types';
import { computed, ComputedRef } from 'vue-demi';
import { reactive } from 'vue';

export interface FluxState {
    dialogCount: number;
    readonly alerts: FluxAlertSpec[];
    readonly confirms: FluxConfirmSpec[];
    readonly snackbars: FluxSnackbarSpec[];
    readonly tooltips: FluxTooltipSpec[];
}

export interface FluxStore extends FluxState {
    readonly inertMain: ComputedRef<boolean>;
    readonly tooltip: ComputedRef<FluxTooltipSpec | null>;

    addAlert(spec: Omit<FluxAlertSpec, 'id'>): number;

    addConfirm(spec: Omit<FluxConfirmSpec, 'id'>): number;

    addSnackbar(spec: Omit<FluxSnackbarSpec, 'id'>): number;

    addTooltip(spec: Omit<FluxTooltipSpec, 'id'>): number;

    registerDialog(): VoidFunction;

    removeAlert(id: number): void;

    removeConfirm(id: number): void;

    removeSnackbar(id: number): void;

    removeTooltip(id: number): void;

    showSnackbar({duration, ...spec}: Omit<FluxSnackbarSpec, 'id'> & { readonly duration?: number; }): Promise<void>;

    updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarSpec, 'id'>>): void;

    updateTooltip(id: number, spec: Partial<Omit<FluxTooltipSpec, 'id'>>): void;
}

const DEFAULT_SNACKBAR_DURATION = 3000;

const state = reactive<FluxState>({
    dialogCount: 0,
    alerts: [],
    confirms: [],
    snackbars: [],
    tooltips: []
});

let alertId: number = 0;
let tooltipId: number = 0;

export function addAlert(spec: Omit<FluxAlertSpec, 'id'>): number {
    const id = ++alertId;

    state.alerts.push({
        id,
        ...spec
    });

    return id;
}

export function addConfirm(spec: Omit<FluxConfirmSpec, 'id'>): number {
    const id = ++alertId;

    state.confirms.push({
        id,
        ...spec
    });

    return id;
}

export function addSnackbar(spec: Omit<FluxSnackbarSpec, 'id'>): number {
    const id = ++alertId;

    state.snackbars.unshift({
        id,
        ...spec
    });

    return id;
}

export function addTooltip(spec: Omit<FluxTooltipSpec, 'id'>): number {
    const id = ++tooltipId;

    state.tooltips.push({
        id,
        ...spec
    });

    return id;
}

export function registerDialog(): VoidFunction {
    ++state.dialogCount;
    return () => --state.dialogCount;
}

export function removeAlert(id: number): void {
    const index = state.alerts.findIndex(a => a.id === id);
    state.alerts.splice(index, 1);
}

export function removeConfirm(id: number): void {
    const index = state.confirms.findIndex(c => c.id === id);
    state.confirms.splice(index, 1);
}

export function removeSnackbar(id: number): void {
    const index = state.snackbars.findIndex(s => s.id === id);
    state.snackbars.splice(index, 1);
}

export function removeTooltip(id: number): void {
    const index = state.tooltips.findIndex(t => t.id === id);
    state.tooltips.splice(index, 1);
}

export async function showSnackbar({duration, ...spec}: Omit<FluxSnackbarSpec, 'id'> & { readonly duration?: number; }): Promise<void> {
    const id = addSnackbar(spec);
    await new Promise(resolve => setTimeout(() => requestAnimationFrame(resolve), duration ?? DEFAULT_SNACKBAR_DURATION));
    removeSnackbar(id);
}

export function updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarSpec, 'id'>>): void {
    const index = state.snackbars.findIndex(s => s.id === id);
    Object.assign(state.snackbars[index], spec);
}

export function updateTooltip(id: number, spec: Partial<Omit<FluxTooltipSpec, 'id'>>): void {
    const index = state.tooltips.findIndex(s => s.id === id);
    Object.assign(state.tooltips[index], spec);
}

export function useFluxStore(): FluxStore {
    const inertMain = computed(() => state.dialogCount > 0);
    const tooltip = computed(() => state.tooltips[state.tooltips.length - 1] || null);

    return {
        ...state,
        inertMain,
        tooltip,
        addAlert,
        addConfirm,
        addSnackbar,
        addTooltip,
        registerDialog,
        removeAlert,
        removeConfirm,
        removeSnackbar,
        removeTooltip,
        showSnackbar,
        updateSnackbar,
        updateTooltip
    };
}
