import type { FluxAlertSpec, FluxConfirmSpec } from './types';
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
