import type { Directive } from 'vue';
import { getKeyboardFocusableElements } from '@/util';

class FocusTrap {
    readonly #root: HTMLElement;
    #elements: HTMLElement[];

    constructor(root: HTMLElement) {
        this.#elements = [];
        this.#root = root;

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    focusElement(index: number, focus: boolean = true): void {
        if (!this.#elements[index]) {
            return;
        }

        for (let i = 0; i < this.#elements.length; ++i) {
            this.#elements[i].tabIndex = i === index ? 0 : -1;
        }

        if (focus) {
            this.#elements[index]?.focus();
        }
    }

    register(): void {
        this.#elements = getKeyboardFocusableElements(this.#root);
        this.#root.addEventListener('keydown', this.onKeyDown);
        this.focusElement(0, false);
    }

    unregister(): void {
        this.#root.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(evt: KeyboardEvent): void {
        const currentElement = this.#root.querySelector('[tabindex="0"]');
        const currentIndex = this.#elements.findIndex(elm => elm === currentElement) ?? 0;

        switch (evt.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                this.focusElement(currentIndex - 1);
                break;

            case 'ArrowDown':
            case 'ArrowRight':
                this.focusElement(currentIndex + 1);
                break;

            default:
                return;
        }

        evt.preventDefault();
        evt.stopPropagation();
    }
}

export const focusTrap: Directive = {
    beforeUnmount(elm: HTMLElement): void {
        const focusTrap = focusTraps.get(elm);
        focusTrap?.unregister();
        focusTraps.delete(elm);
    },

    mounted(elm: HTMLElement): void {
        const focusTrap = new FocusTrap(elm);
        focusTrap.register();
        focusTraps.set(elm, focusTrap);
    }
};

const focusTraps: WeakMap<HTMLElement, FocusTrap> = new WeakMap();
