import type { FluxAlertSpec, FluxConfirmSpec, FluxSnackbarSpec, FluxTooltipSpec } from '.';
import { defineStore } from 'pinia';

let alertId: number = 0;
let tooltipId: number = 0;

export const useFluxStore = defineStore('flux', {
    state: (): FluxStore => ({
        alerts: [],
        confirms: [],
        snackbars: [],
        tooltips: []
    }),
    getters: {
        tooltip: (state): FluxTooltipSpec | null => state.tooltips[state.tooltips.length - 1] || null
    },
    actions: {
        addAlert(spec: Omit<FluxAlertSpec, 'id'>): number {
            const id = ++alertId;

            this.alerts.push({
                id,
                ...spec
            });

            return id;
        },

        addConfirm(spec: Omit<FluxConfirmSpec, 'id'>): number {
            const id = ++alertId;

            this.confirms.push({
                id,
                ...spec
            });

            return id;
        },

        addSnackbar(spec: Omit<FluxSnackbarSpec, 'id'>): number {
            const id = ++alertId;

            this.snackbars.unshift({
                id,
                ...spec
            });

            return id;
        },

        addTooltip(spec: Omit<FluxTooltipSpec, 'id'>): number {
            const id = ++tooltipId;

            this.tooltips.push({
                id,
                ...spec
            });

            return id;
        },

        removeAlert(id: number): void {
            this.alerts = this.alerts.filter(a => a.id !== id);
        },

        removeConfirm(id: number): void {
            this.confirms = this.confirms.filter(c => c.id !== id);
        },

        removeSnackbar(id: number): void {
            this.snackbars = this.snackbars.filter(s => s.id !== id);
        },

        removeTooltip(id: number): void {
            this.tooltips = this.tooltips.filter(s => s.id !== id);
        },

        async showSnackbar(duration: number, spec: Omit<FluxSnackbarSpec, 'id'>): Promise<void> {
            const id = this.addSnackbar(spec);
            await new Promise(resolve => setTimeout(() => requestAnimationFrame(resolve), duration));
            this.removeSnackbar(id);
        },

        updateSnackbar(id: number, spec: Partial<Omit<FluxSnackbarSpec, 'id'>>): void {
            const index = this.snackbars.findIndex(s => s.id === id);
            Object.assign(this.snackbars[index], spec);
        }
    }
});

interface FluxStore {
    alerts: FluxAlertSpec[];
    confirms: FluxConfirmSpec[];
    snackbars: FluxSnackbarSpec[];
    tooltips: FluxTooltipSpec[];
}
