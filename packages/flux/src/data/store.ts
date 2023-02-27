import { defineStore } from 'pinia';
import { FluxAlertSpec, FluxConfirmSpec } from '.';

let alertId: number = 0;

export const useFluxStore = defineStore('flux', {
    state: (): FluxStore => ({
        alerts: [],
        confirms: []
    }),
    actions: {
        addAlert(spec: Omit<FluxAlertSpec, 'id'>): number {
            const id: number = ++alertId;

            this.alerts.push({
                id,
                ...spec
            });

            return id;
        },

        addConfirm(spec: Omit<FluxConfirmSpec, 'id'>): number {
            const id: number = ++alertId;

            this.confirms.push({
                id,
                ...spec
            });

            return id;
        },

        removeAlert(id: number): void {
            this.alerts = this.alerts.filter((a: FluxAlertSpec): boolean => a.id !== id);
        },

        removeConfirm(id: number): void {
            this.confirms = this.confirms.filter((c: FluxConfirmSpec): boolean => c.id !== id);
        }
    }
});

interface FluxStore {
    alerts: FluxAlertSpec[];
    confirms: FluxConfirmSpec[];
}
