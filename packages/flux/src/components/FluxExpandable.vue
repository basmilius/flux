<template>
    <div
        class="flux-expandable"
        :class="{'is-open': isOpen}">
        <slot
            name="header"
            v-bind="{label, isOpen, close, open, toggle}">
            <button
                class="flux-expandable-header"
                @click="toggle">
                <span>{{ label }}</span>
                <flux-icon
                    :size="16"
                    :variant="isOpen ? 'minus' : 'plus'"/>
            </button>
        </slot>

        <flux-auto-height-transition>
            <div
                v-if="isOpen"
                class="flux-expandable-body">
                <slot
                    name="body"
                    v-bind="{label, close}">
                    <div class="flux-expandable-content">
                        <slot v-bind="{label, close}"/>
                    </div>
                </slot>
            </div>
        </flux-auto-height-transition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { getCurrentInstance, inject, onMounted, onUnmounted, ref, unref } from 'vue-demi';
    import { useComponentId } from '../composables';
    import { FluxAutoHeightTransition } from '../transition';
    import { FluxIcon } from '.';

    export interface Emits {
        (e: 'toggle', isOpen: boolean): void;
    }

    export interface Props {
        readonly label?: string;
    }

    const emit = defineEmits<Emits>();
    defineProps<Props>();

    const id = useComponentId();
    const instance = getCurrentInstance();
    const isOpen = ref(false);

    const {closeAll, register, unregister} = inject<any>('flux-expandable-group', {});

    onMounted(() => register?.(unref(id), instance));
    onUnmounted(() => unregister?.(unref(id)));

    function close(): void {
        isOpen.value = false;
        emit('toggle', isOpen.value);
    }

    function open(): void {
        closeAll?.();
        isOpen.value = true;
        emit('toggle', isOpen.value);
    }

    function toggle(): void {
        if (isOpen.value) {
            close();
        } else {
            open();
        }
    }

    defineExpose({
        isOpen,
        close,
        open,
        toggle
    });
</script>

<style lang="scss">
    .flux-expandable {
        display: flex;
        flex-flow: column;

        &-header {
            display: flex;
            height: 60px;
            padding-left: 21px;
            padding-right: 21px;
            align-items: center;
            background: unset;
            border: 0;
            color: var(--foreground-prominent);
            cursor: pointer;
            outline: 0;
            text-align: left;
            z-index: 1;

            &:focus-visible {
                box-shadow: 0 0 0 2px var(--primary-7);
            }

            &:hover {
                background: var(--secondary-button-background-hover);
            }

            span {
                flex-grow: 1;
                font-weight: 600;
            }
        }

        &-body {
            transition: height 390ms var(--swift-out), translate 300ms var(--swift-out) 120ms, opacity 300ms var(--swift-out) 120ms;

            &.v-enter,
            &.v-enter-from,
            &.v-leave-to {
                opacity: 0;
                translate: 0 -15px;
            }

            &.v-enter-to,
            &.v-leave,
            &.v-leave-from {
                opacity: 1;
            }

            &.v-leave-active {
                transition-delay: 0s;
            }

            &.v-enter-active,
            &.v-leave-active {
                overflow: hidden;
            }
        }

        &-content {
            padding: 0 21px 21px;
        }
    }
</style>
