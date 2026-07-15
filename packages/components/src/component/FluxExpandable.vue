<template>
    <div :class="isOpen ? $style.expandableOpened : $style.expandable">
        <slot
            v-bind="{contentId, headerId, label, isOpen, close, open, toggle}"
            name="header">
            <button
                :class="$style.expandableHeader"
                :id="headerId"
                type="button"
                :aria-controls="contentId"
                :aria-expanded="isOpen"
                @click="toggle">
                <FluxFadeTransition>
                    <FluxIcon
                        v-if="icon"
                        :key="icon"
                        :name="icon"/>
                </FluxFadeTransition>

                <span>{{ label }}</span>

                <FluxFadeTransition>
                    <FluxIcon
                        :key="expandIcon"
                        :name="expandIcon"
                        :size="16"/>
                </FluxFadeTransition>
            </button>
        </slot>

        <FluxAutoHeightTransition>
            <div
                v-if="isOpen"
                :class="$style.expandableBody"
                :id="contentId"
                role="region"
                :aria-labelledby="headerId">
                <slot
                    v-bind="{contentId, headerId, label, close}"
                    name="body">
                    <div :class="$style.expandableContent">
                        <slot v-bind="{contentId, headerId, label, close}"/>
                    </div>
                </slot>
            </div>
        </FluxAutoHeightTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useComponentId } from '@basmilius/common';
    import type { FluxIconName } from '@flux-ui/types';
    import { computed, getCurrentInstance, onBeforeMount, onUnmounted, ref, unref, useId, type VNode, watch } from 'vue';
    import { useExpandableGroupInjection } from '~flux/components/composable';
    import { FluxAutoHeightTransition, FluxFadeTransition } from '~flux/components/transition';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Expandable.module.scss';

    const emit = defineEmits<{
        toggle: [boolean];
    }>();

    const {
        isOpened
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isOpened?: boolean;
        readonly label?: string;
    }>();

    defineSlots<{
        body(props: {
            readonly contentId: string;
            readonly headerId: string;
            readonly label?: string;
            close(): void; }): VNode[];

        default(props: {
            readonly label?: string;
            close(): void; }): VNode[];

        header(props: {
            readonly contentId: string;
            readonly headerId: string;
            readonly label?: string;
            readonly isOpen: boolean;
            close(): void;
            open(): void;
            toggle(): void;
        }): VNode[];
    }>();

    const componentId = useComponentId();
    const contentId = useId();
    const headerId = useId();
    const instance = getCurrentInstance()!;
    const isOpen = ref(false);

    const {closeAll, register, unregister} = useExpandableGroupInjection();

    const expandIcon = computed<FluxIconName>(() => unref(isOpen) ? 'minus' : 'plus');

    watch(() => isOpened, () => {
        if (isOpened) {
            open();
        } else {
            close();
        }
    }, {immediate: true});

    onBeforeMount(() => register?.(componentId.value, instance));
    onUnmounted(() => unregister?.(componentId.value));

    function close(): void {
        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        emit('toggle', isOpen.value);
    }

    function open(): void {
        if (isOpen.value) {
            return;
        }

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
        contentId,
        headerId,
        isOpen,
        close,
        open,
        toggle
    });
</script>
