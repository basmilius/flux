import type { FluxAlertObject, FluxConfirmObject, FluxPromptObject, FluxSnackbarObject, FluxTooltipObject } from '@flux-ui/types';
import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';

export type FluxState = {
    dialogCount: number;
    readonly alerts: FluxAlertObject[];
    readonly confirms: FluxConfirmObject[];
    readonly prompts: FluxPromptObject[];
    readonly snackbars: FluxSnackbarObject[];
    readonly tooltips: FluxTooltipObject[];
};

export type FluxStore = FluxState & {
    readonly inertMain: ComputedRef<boolean>;
    readonly tooltip: ComputedRef<FluxTooltipObject | null>;

    addAlert(spec: Omit<FluxAlertObject, 'id'>): number;
    addConfirm(spec: Omit<FluxConfirmObject, 'id'>): number;
    addPrompt(spec: Omit<FluxPromptObject, 'id'>): number;
    addSnackbar(spec: Omit<FluxSnackbarObject, 'id'>): number;
    addTooltip(spec: Omit<FluxTooltipObject, 'id'>): number;
    registerDialog(): [number, VoidFunction];
    removeAlert(id: number): void;
    removeConfirm(id: number): void;
    removePrompt(id: number): void;
    removeSnackbar(id: number): void;
    removeTooltip(id: number): void;
    showAlert(spec: Omit<FluxAlertObject, 'id' | 'onClose'>): Promise<void>;
    showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean>;
    showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false>;
    showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): Promise<void> | void;
    updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarObject, 'id'>>): void;
    updateTooltip(id: number, spec: Partial<Omit<FluxTooltipObject, 'id'>>): void;
    showSnackbarSync({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): void;
};

const DEFAULT_SNACKBAR_DURATION = 6000;

const state = reactive<FluxState>({
    dialogCount: 0,
    alerts: [],
    confirms: [],
    prompts: [],
    snackbars: [],
    tooltips: []
});

let nextId: number = 0;

export function addAlert(spec: Omit<FluxAlertObject, 'id'>): number {
    const id = ++nextId;

    state.alerts.push({
        id,
        ...spec
    });

    return id;
}

export function addConfirm(spec: Omit<FluxConfirmObject, 'id'>): number {
    const id = ++nextId;

    state.confirms.push({
        id,
        ...spec
    });

    return id;
}

export function addPrompt(spec: Omit<FluxPromptObject, 'id'>): number {
    const id = ++nextId;

    state.prompts.push({
        id,
        ...spec
    });

    return id;
}

export function addSnackbar(spec: Omit<FluxSnackbarObject, 'id'>): number {
    const id = ++nextId;

    state.snackbars.unshift({
        id,
        ...spec
    });

    return id;
}

export function addTooltip(spec: Omit<FluxTooltipObject, 'id'>): number {
    const id = ++nextId;

    state.tooltips.push({
        id,
        ...spec
    });

    return id;
}

export function registerDialog(): [number, VoidFunction] {
    return [
        ++state.dialogCount,
        () => --state.dialogCount
    ];
}

export function removeAlert(id: number): void {
    const index = state.alerts.findIndex(a => a.id === id);

    if (index < 0) {
        return;
    }

    state.alerts.splice(index, 1);
}

export function removeConfirm(id: number): void {
    const index = state.confirms.findIndex(c => c.id === id);

    if (index < 0) {
        return;
    }

    state.confirms.splice(index, 1);
}

export function removePrompt(id: number): void {
    const index = state.prompts.findIndex(c => c.id === id);

    if (index < 0) {
        return;
    }

    state.prompts.splice(index, 1);
}

export function removeSnackbar(id: number): void {
    const index = state.snackbars.findIndex(s => s.id === id);

    if (index < 0) {
        return;
    }

    state.snackbars.splice(index, 1);
}

export function removeTooltip(id: number): void {
    const index = state.tooltips.findIndex(t => t.id === id);

    if (index < 0) {
        return;
    }

    state.tooltips.splice(index, 1);
}

export function updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarObject, 'id'>>): void {
    const index = state.snackbars.findIndex(s => s.id === id);

    if (index < 0) {
        return;
    }

    Object.assign(state.snackbars[index], spec);
}

export function updateTooltip(id: number, spec: Partial<Omit<FluxTooltipObject, 'id'>>): void {
    const index = state.tooltips.findIndex(s => s.id === id);

    if (index < 0) {
        return;
    }

    Object.assign(state.tooltips[index], spec);
}

export async function showAlert(spec: Omit<FluxAlertObject, 'id' | 'onClose'>): Promise<void> {
    return new Promise(resolve => {
        const id = addAlert({
            ...spec,
            onClose(): void {
                resolve();
                removeAlert(id);
            }
        });
    });
}

export async function showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean> {
    return new Promise(resolve => {
        const id = addConfirm({
            ...spec,
            onCancel(): void {
                resolve(false);
                removeConfirm(id);
            },
            onConfirm(): void {
                resolve(true);
                removeConfirm(id);
            }
        });
    });
}

export async function showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false> {
    return new Promise(resolve => {
        const id = addPrompt({
            ...spec,
            onCancel(): void {
                resolve(false);
                removePrompt(id);
            },
            onConfirm(text: string): void {
                resolve(text);
                removePrompt(id);
            }
        });
    });
}

export function showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): void;

export async function showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): Promise<void> {
    const id = addSnackbar(spec);
    await new Promise(resolve => setTimeout(() => requestAnimationFrame(resolve), duration ?? DEFAULT_SNACKBAR_DURATION));
    removeSnackbar(id);
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
        addPrompt,
        addSnackbar,
        addTooltip,
        registerDialog,
        removeAlert,
        removeConfirm,
        removePrompt,
        removeSnackbar,
        removeTooltip,
        showAlert,
        showConfirm,
        showPrompt,
        showSnackbar,
        updateSnackbar,
        updateTooltip,
        showSnackbarSync: promiseToVoidFunction(showSnackbar)
    };
}

type Fn = (...args: never[]) => unknown;

function promiseToVoidFunction<T extends Fn>(fn: T): (...args: Parameters<T>) => void {
    return (...args) => {
        fn(...args);
    };
}
