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
    import { getCurrentInstance, onBeforeMount, onUnmounted, ref, toRefs, unref, watch } from 'vue-demi';
    import { useComponentId, useExpandableGroupInjection } from '../composables';
    import { FluxAutoHeightTransition } from '../transition';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'toggle', isOpen: boolean): void;
    }

    export interface Props {
        readonly isOpened?: boolean;
        readonly label?: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isOpened} = toRefs(props);

    const id = useComponentId();
    const instance = getCurrentInstance()!;
    const isOpen = ref(false);

    const {closeAll, register, unregister} = useExpandableGroupInjection();

    onBeforeMount(() => register?.(unref(id), instance));
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

    watch(isOpened, isOpened => {
        if (isOpened) {
            open();
        } else {
            close();
        }
    }, {immediate: true});

    defineExpose({
        isOpen,
        close,
        open,
        toggle
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

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
            text-align: left;
            z-index: 1;

            @include flux.focus-ring-transition;

            &:hover {
                background: rgb(var(--gray-1));
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

    .flux-pane > .flux-expandable {
        border-radius: inherit;

        .flux-expandable-header {
            border-radius: inherit;
        }

        &.is-open .flux-expandable-header {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
</style>
