class FocusTrapLockStack {
    get active(): boolean {
        return this.current?.isEnabled ?? false;
    }

    get current(): FocusTrap | null {
        return this.#traps[this.#traps.length - 1] ?? null;
    }

    #listeners: FocusTrapListener[] = [];
    #traps: FocusTrap[] = [];

    add(id: FocusTrap['id'], setEnabled: FocusTrap['setEnabled'], autoFocus: boolean = true): void {
        const trap: FocusTrap = {id, setEnabled, isEnabled: true};
        this.current && this.toggle(this.current, false);
        this.#traps.push(trap);

        if (autoFocus) {
            this.toggle(trap, true);
            this.emit();
        }
    }

    remove(id: FocusTrap['id']): void {
        const trap = this.#traps.find(t => t.id === id);
        trap && this.toggle(trap, false);

        const current = this.current;
        const wasCurrent = current?.id === id;
        this.#traps = this.#traps.filter(t => t.id !== id);

        wasCurrent && this.current && this.toggle(this.current, true);
        this.emit();
    }

    emit(): void {
        this.#listeners.forEach(listener => listener(this.active, this.#traps));
    }

    subscribe(listener: FocusTrapListener): () => void {
        this.#listeners.push(listener);
        listener(this.active, this.#traps);

        return () => this.#listeners = this.#listeners.filter(l => l !== listener);
    }

    toggle(trap: FocusTrap, isEnabled: boolean): void {
        trap.setEnabled(isEnabled);
        trap.isEnabled = isEnabled;
    }
}

interface FocusTrap {
    id: string;
    isEnabled: boolean;

    setEnabled(isEnabled: boolean): void;
}

export type FocusTrapListener = (isEnabled: boolean, focusTraps: FocusTrap[]) => void;

const _default: FocusTrapLockStack = new FocusTrapLockStack();
export default _default;
