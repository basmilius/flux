import type { FluxAlertSpec, FluxConfirmSpec, FluxFormSelectGroup, FluxFormSelectOption, FluxPromptSpec } from './types';
import { addAlert, addConfirm, addPrompt, removeAlert, removeConfirm, removePrompt } from './store';

export async function fluxAlert(spec: Omit<FluxAlertSpec, 'id' | 'onClose'>): Promise<void> {
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

export function isFluxFormSelectGroup(item: unknown): item is FluxFormSelectGroup {
    return item !== null && typeof item === 'object' && !('id' in item);
}

export function isFluxFormSelectOption(item: unknown): item is FluxFormSelectOption {
    return item !== null && typeof item === 'object' && 'id' in item;
}
