import type { FluxAlertSpec, FluxConfirmSpec, FluxPromptSpec } from './types';
import { useFluxStore } from './store';

export async function fluxAlert(spec: Omit<FluxAlertSpec, 'id' | 'onClose'>): Promise<void> {
    const {addAlert, removeAlert} = useFluxStore();

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

export async function fluxConfirm(spec: Omit<FluxConfirmSpec, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean> {
    const {addConfirm, removeConfirm} = useFluxStore();

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

export async function fluxPrompt(spec: Omit<FluxPromptSpec, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false> {
    const {addPrompt, removePrompt} = useFluxStore();

    return new Promise(resolve => {
        const id = addPrompt({
            ...spec,
            onCancel() {
                resolve(false);
                removePrompt(id);
            },
            onConfirm(text: string) {
                resolve(text);
                removePrompt(id);
            }
        });
    });
}
