import type { Directive } from 'vue';

class HeightTransition {
    readonly #root: HTMLElement;
    readonly #observer: MutationObserver;

    constructor(root: HTMLElement) {
        this.#root = root;
        this.#observer = new MutationObserver(this.onMutation.bind(this));
    }

    register(): void {
        this.#observer.observe(this.#root, {
            childList: true,
            subtree: true
        });

        requestAnimationFrame(this.onMutation.bind(this));
    }

    unregister(): void {
        this.#observer.disconnect();
    }

    onMutation(): void {
        const {height: currentHeight} = getComputedStyle(this.#root);
        this.#root.style.height = 'auto';

        const {height} = getComputedStyle(this.#root);
        this.#root.style.height = currentHeight;

        if (height === currentHeight) {
            return;
        }

        getComputedStyle(this.#root);
        requestAnimationFrame(() => requestAnimationFrame(() => this.#root.style.height = height));
    }
}

export default {
    beforeUnmount(elm: HTMLElement): void {
        const heightTransition = heightTransitions.get(elm);
        heightTransition?.unregister();
        heightTransitions.delete(elm);
    },

    mounted(elm: HTMLElement): void {
        const heightTransition = new HeightTransition(elm);
        heightTransition.register();
        heightTransitions.set(elm, heightTransition);
    }
} satisfies Directive;

const heightTransitions: WeakMap<HTMLElement, HeightTransition> = new WeakMap();
