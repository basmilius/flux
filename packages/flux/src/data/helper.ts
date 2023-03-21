import type { FluxAlertSpec, FluxConfirmSpec } from '.';
import { useFluxStore } from '.';

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

export async function fluxConfirm(spec: Omit<FluxConfirmSpec, 'id' | 'onCancel' | 'onClose' | 'onConfirm'>): Promise<boolean> {
    const fluxStore = useFluxStore();

    return new Promise((resolve, reject) => {
        const id = fluxStore.addConfirm({
            ...spec,
            onClose(): void {
                reject();
                fluxStore.removeConfirm(id);
            },
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
