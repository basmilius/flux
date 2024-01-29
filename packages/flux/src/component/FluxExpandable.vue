<template>
    <div
        class="flux-expandable"
        :class="{'is-open': isOpen}"
        :id="headerId"
        :aria-controls="contentId"
        :aria-expanded="isOpen">
        <slot
            v-bind="{label, isOpen, close, open, toggle}"
            name="header">
            <button
                class="flux-expandable-header"
                type="button"
                @click="toggle">
                <span>{{ label }}</span>
                <FluxFadeTransition>
                    <FluxIcon
                        :key="isOpen ? 'minus' : 'plus'"
                        :size="16"
                        :variant="isOpen ? 'minus' : 'plus'"/>
                </FluxFadeTransition>
            </button>
        </slot>

        <FluxAutoHeightTransition>
            <div
                v-if="isOpen"
                class="flux-expandable-body"
                :id="contentId"
                :aria-labelledby="headerId">
                <slot
                    v-bind="{label, close}"
                    name="body">
                    <div class="flux-expandable-content">
                        <slot v-bind="{label, close}"/>
                    </div>
                </slot>
            </div>
        </FluxAutoHeightTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { getCurrentInstance, onBeforeMount, onUnmounted, ref, toRefs, unref, watch } from 'vue';
    import { useComponentId, useId } from '@/composable';
    import { useExpandableGroupInjection } from '@/composable/private';
    import { FluxAutoHeightTransition, FluxFadeTransition } from '@/transition';
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

    const componentId = useComponentId();
    const contentId = useId();
    const headerId = useId();
    const instance = getCurrentInstance()!;
    const isOpen = ref(false);

    const {closeAll, register, unregister} = useExpandableGroupInjection();

    onBeforeMount(() => register?.(unref(componentId), instance));
    onUnmounted(() => unregister?.(unref(componentId)));

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
    @use '../css/mixin' as flux;

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
