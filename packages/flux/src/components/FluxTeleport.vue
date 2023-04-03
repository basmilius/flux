<template>
    <div class="flux-teleport">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { getCurrentInstance, onBeforeUnmount, onMounted, ref, toRefs, unref, watch } from 'vue-demi';

    export interface Props {
        readonly disabled: boolean;
        readonly placement: 'before' | 'after';
        readonly to: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        disabled: false,
        placement: 'after'
    });
    const {disabled, placement, to} = toRefs(props);

    const instance = getCurrentInstance()!;

    const nodes = ref<Node[]>([]);
    const observer = ref<MutationObserver | null>(null);
    const parent = ref<HTMLElement | null>(null);
    const waiting = ref(false);

    onMounted(() => {
        nodes.value = Array.from(instance.proxy!.$el.childNodes);

        if (!disabled.value) {
            startObserver();
        }

        maybeMove();
    });

    onBeforeUnmount(() => {
        disable();
        stopObserver();
    });

    function disable(): void {
        instance.proxy!.$el.appendChild(getFragment());
        parent.value = null;
    }

    function getFragment(): DocumentFragment {
        const fragment = document.createDocumentFragment();
        nodes.value.forEach(node => fragment.appendChild(node));
        return fragment;
    }

    function maybeMove(): void {
        !disabled.value && move();
    }

    function move(): void {
        waiting.value = false;
        parent.value = document.querySelector(unref(to));

        if (!parent.value) {
            disable();
            waiting.value = true;
            return;
        }

        if (unref(placement) === 'before') {
            parent.value!.prepend(getFragment());
        } else {
            parent.value!.appendChild(getFragment());
        }
    }

    function startObserver(): void {
        if (observer.value) {
            return;
        }

        observer.value = new MutationObserver(onMutations);
        observer.value!.observe(document.body, {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true
        });
    }

    function stopObserver(): void {
        observer.value?.disconnect();
        observer.value = null;
    }

    function onMutations(mutations: MutationRecord[]): void {
        let shouldMove = false;

        for (const mutation of mutations) {
            const addedNodes = Array.from(mutation.addedNodes).filter(node => !nodes.value.includes(node));

            if (parent.value && Array.from(mutation.removedNodes).includes(parent.value)) {
                disable();
                waiting.value = !disabled.value;
            } else if (waiting.value && addedNodes.length > 0) {
                shouldMove = true;
            }
        }

        shouldMove && move();
    }

    watch(disabled, disabled => {
        if (disabled) {
            disable();
            stopObserver();
        } else {
            startObserver();
            move();
        }
    });

    watch([placement, to], () => maybeMove());
</script>
