import type { FluxAlertSpec, FluxConfirmSpec } from './types';
import { useFluxStore } from './store';

export async function fluxAlert(spec: Omit<FluxAlertSpec, 'id' | 'onClose'>): Promise<void> {
    const fluxStore = useFluxStore();

    return new Promise(resolve => {
        const id = fluxStore.addAlert({
            ...spec,
            onClose(): void {
                resolve();
                fluxStore.removeAlert(id);
            }
        });
    });
}

export async function fluxConfirm(spec: Omit<FluxConfirmSpec, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean> {
    const fluxStore = useFluxStore();

    return new Promise(resolve => {
        const id = fluxStore.addConfirm({
            ...spec,
            onCancel(): void {
                resolve(false);
                fluxStore.removeConfirm(id);
            },
            onConfirm(): void {
                resolve(true);
                fluxStore.removeConfirm(id);
            }
        });
    });
}
