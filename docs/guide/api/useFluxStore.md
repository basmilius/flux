# useFluxStore

Provides access to the centralized Flux store that manages dialogs, snackbars and tooltips. This composable is primarily used internally by Flux components, but can be useful for advanced use cases.

## Usage

```ts
import { useFluxStore } from '@flux-ui/components';

const store = useFluxStore();

// Check if any dialogs are open
if (store.inertMain.value) {
    console.log('A dialog is currently blocking the main content.');
}
```

## Type declarations

```ts
import type { ComputedRef } from 'vue';

declare function useFluxStore(): FluxStore;

interface FluxStore {
    readonly alerts: FluxAlertObject[];
    readonly confirms: FluxConfirmObject[];
    readonly prompts: FluxPromptObject[];
    readonly snackbars: FluxSnackbarObject[];
    readonly tooltips: FluxTooltipObject[];

    readonly dialogCount: number;
    readonly inertMain: ComputedRef<boolean>;
    readonly tooltip: ComputedRef<FluxTooltipObject | null>;

    addAlert(spec: Omit<FluxAlertObject, 'id'>): number;
    addConfirm(spec: Omit<FluxConfirmObject, 'id'>): number;
    addPrompt(spec: Omit<FluxPromptObject, 'id'>): number;
    addSnackbar(spec: Omit<FluxSnackbarObject, 'id'>): number;
    addTooltip(spec: Omit<FluxTooltipObject, 'id'>): number;

    removeAlert(id: number): void;
    removeConfirm(id: number): void;
    removePrompt(id: number): void;
    removeSnackbar(id: number): void;
    removeTooltip(id: number): void;

    updateSnackbar(id: number, spec: Partial<FluxSnackbarObject>): void;
    updateTooltip(id: number, spec: Partial<FluxTooltipObject>): void;

    registerDialog(): [number, VoidFunction];

    showAlert(spec: Omit<FluxAlertObject, 'id' | 'onClose'>): Promise<void>;
    showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean>;
    showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false>;
    showSnackbar(spec: Omit<FluxSnackbarObject, 'id'> & { duration?: number }): Promise<void>;
    showSnackbarSync(spec: Omit<FluxSnackbarObject, 'id'> & { duration?: number }): void;
}
```

::: tip
For showing dialogs and snackbars, prefer using the dedicated functions [showAlert](../components/attention/alert), [showConfirm](../components/attention/confirm), [showPrompt](../components/attention/prompt) and [showSnackbar](../components/attention/snackbar) instead of interacting with the store directly.
:::
