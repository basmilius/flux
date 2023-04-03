<template>
    <dialog
        ref="overlayRef"
        class="flux-overlay"
        @cancel="cancel"
        @close="close">
        <slot/>
        <flux-secondary-button
            v-if="isCloseable"
            class="flux-overlay-close"
            icon-before="xmark"
            @click="close"/>
    </dialog>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, onUpdated, ref, toRefs, useSlots } from 'vue-demi';
    import { FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'close'): void;
    }

    export interface Props {
        readonly isCloseable?: boolean;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isCloseable} = toRefs(props);

    const overlayRef = ref<HTMLDialogElement>();

    onMounted(() => checkState());
    onUpdated(() => checkState());

    function checkState(): void {
        const slots = useSlots();
        let hasContent = false;

        if ('default' in slots && typeof slots.default === 'function') {
            const content = slots.default();
            hasContent = content.length > 0 && typeof content[0].type !== 'symbol';
        }

        if (hasContent) {
            !overlayRef.value!.open && overlayRef.value!.showModal();
        } else {
            overlayRef.value!.close();
        }
    }

    function cancel(evt: Event): void {
        if (!isCloseable || !isCloseable.value) {
            evt.preventDefault();
        }
    }

    function close(): void {
        emit('close');
    }
</script>

<style lang="scss">
    .flux-overlay {
        background: transparent;
        border: 0;
        overflow: visible;
        pointer-events: none;
        z-index: 10000;

        &::backdrop {
            position: fixed;
            inset: 0;
            background: rgb(255 255 255 / .75);
            animation: overlay-content 300ms ease both;
        }

        &[open] {
            pointer-events: all;
        }

        > .flux-pane {
            margin: auto;
            animation: overlay-content 420ms var(--deceleration-curve) both;
        }

        &-close {
            position: absolute;
            top: 0;
            right: 0;
            box-shadow: var(--shadow-md);
            animation: overlay-content 420ms var(--deceleration-curve) 270ms both;
        }

        .flux-pane {
            display: flex;
            max-height: min(720px, calc(100dvh - 180px));
            flex-flow: column;

            &-footer {
                position: sticky;
                bottom: 0;
                margin-top: auto;
            }
        }
    }

    @keyframes overlay-content {
        from {
            opacity: 0;
            scale: 1.25;
        }
    }
</style>
