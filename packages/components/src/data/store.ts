import type { FluxAlertObject, FluxConfirmObject, FluxPromptObject, FluxSnackbarObject, FluxTooltipObject } from '@flux-ui/types';
import { computed, type ComputedRef, reactive } from 'vue';

export type FluxState = {
    readonly dialogs: number[];
    readonly alerts: FluxAlertObject[];
    readonly confirms: FluxConfirmObject[];
    readonly prompts: FluxPromptObject[];
    readonly snackbars: FluxSnackbarObject[];
    readonly tooltips: FluxTooltipObject[];
};

export type FluxDialogRegistration = {
    readonly id: number;

    getPosition(): number;
    isCurrent(): boolean;
    unregister(): void;
};

export type FluxStore = FluxState & {
    readonly dialogCount: number;
    readonly inertMain: ComputedRef<boolean>;
    readonly tooltip: ComputedRef<FluxTooltipObject | null>;

    addAlert(spec: Omit<FluxAlertObject, 'id'>): number;
    addConfirm(spec: Omit<FluxConfirmObject, 'id'>): number;
    addPrompt(spec: Omit<FluxPromptObject, 'id'>): number;
    addSnackbar(spec: Omit<FluxSnackbarObject, 'id'>): number;
    addTooltip(spec: Omit<FluxTooltipObject, 'id'>): number;
    pauseSnackbar(id: number): void;
    registerDialog(): FluxDialogRegistration;
    removeAlert(id: number): void;
    removeConfirm(id: number): void;
    removePrompt(id: number): void;
    removeSnackbar(id: number): void;
    removeTooltip(id: number): void;
    resumeSnackbar(id: number): void;
    showAlert(spec: Omit<FluxAlertObject, 'id' | 'onClose'>): Promise<void>;
    showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean>;
    showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false>;
    showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): Promise<void> | void;
    updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarObject, 'id'>>): void;
    updateTooltip(id: number, spec: Partial<Omit<FluxTooltipObject, 'id'>>): void;
    showSnackbarSync({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): void;
};

const DEFAULT_SNACKBAR_DURATION = 6000;

type SnackbarTimer = {
    finish(): void;
    remaining: number;
    startedAt: number;
    timeout: ReturnType<typeof setTimeout> | null;
};

const snackbarTimers = new Map<number, SnackbarTimer>();

const state = reactive<FluxState>({
    dialogs: [],
    alerts: [],
    confirms: [],
    prompts: [],
    snackbars: [],
    tooltips: []
});

let nextDialogId: number = 0;
let nextId: number = 0;

const inertMain = computed(() => state.dialogs.length > 0);
const tooltip = computed(() => state.tooltips[state.tooltips.length - 1] || null);

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

export function registerDialog(): FluxDialogRegistration {
    const id = ++nextDialogId;

    state.dialogs.push(id);

    return {
        id,

        getPosition(): number {
            return state.dialogs.indexOf(id);
        },

        isCurrent(): boolean {
            return state.dialogs[state.dialogs.length - 1] === id;
        },

        unregister(): void {
            const index = state.dialogs.indexOf(id);

            if (index >= 0) {
                state.dialogs.splice(index, 1);
            }
        }
    };
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
    const timer = snackbarTimers.get(id);

    if (timer?.timeout != null) {
        clearTimeout(timer.timeout);
    }

    snackbarTimers.delete(id);

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

export function pauseSnackbar(id: number): void {
    const timer = snackbarTimers.get(id);

    if (!timer || timer.timeout === null) {
        return;
    }

    clearTimeout(timer.timeout);
    timer.timeout = null;
    timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt));
}

export function resumeSnackbar(id: number): void {
    const timer = snackbarTimers.get(id);

    if (!timer || timer.timeout !== null) {
        return;
    }

    timer.startedAt = Date.now();
    timer.timeout = setTimeout(timer.finish, timer.remaining);
}

export function showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): void;

export async function showSnackbar({duration, ...spec}: Omit<FluxSnackbarObject, 'id'> & { readonly duration?: number; }): Promise<void> {
    await new Promise<void>(resolve => {
        let isResolved = false;

        const finish = (): void => {
            if (isResolved) {
                return;
            }

            isResolved = true;
            snackbarTimers.delete(id);
            removeSnackbar(id);
            resolve();
        };

        const id = addSnackbar({
            ...spec,
            onClose(): void {
                spec.onClose?.();
                finish();
            }
        });

        const totalDuration = duration ?? DEFAULT_SNACKBAR_DURATION;

        const timer: SnackbarTimer = {
            finish,
            remaining: totalDuration,
            startedAt: Date.now(),
            timeout: null
        };

        snackbarTimers.set(id, timer);
        timer.timeout = setTimeout(finish, totalDuration);
    });
}

export function useFluxStore(): FluxStore {
    return {
        get dialogs() {
            return state.dialogs;
        },
        get dialogCount() {
            return state.dialogs.length;
        },
        get alerts() {
            return state.alerts;
        },
        get confirms() {
            return state.confirms;
        },
        get prompts() {
            return state.prompts;
        },
        get snackbars() {
            return state.snackbars;
        },
        get tooltips() {
            return state.tooltips;
        },
        inertMain,
        tooltip,
        addAlert,
        addConfirm,
        addPrompt,
        addSnackbar,
        addTooltip,
        pauseSnackbar,
        registerDialog,
        removeAlert,
        removeConfirm,
        removePrompt,
        removeSnackbar,
        removeTooltip,
        resumeSnackbar,
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
