<template>
    <FluxLayerPane
        :class="isOpen ? $style.expandablePaneOpened : $style.expandablePane"
        :color="color">
        <slot
            v-bind="{contentId, headerId, subtitle, title, isOpen, close, open, toggle}"
            name="header">
            <FluxPressable
                :class="$style.expandablePaneHeader"
                :id="headerId"
                component-type="button"
                type="button"
                :aria-controls="contentId"
                :aria-expanded="isOpen"
                @click="toggle">
                <slot name="before"/>

                <FluxIcon
                    v-if="icon"
                    :class="$style.expandablePaneHeaderIcon"
                    :size="20"
                    :name="icon"/>

                <div
                    v-if="title || subtitle"
                    :class="$style.expandablePaneHeaderCaption">
                    <strong v-if="title">
                        {{ title }}
                    </strong>

                    <span v-if="subtitle">
                        {{ subtitle }}
                    </span>
                </div>

                <FluxIcon
                    :class="$style.expandablePaneHeaderChevron"
                    :size="20"
                    name="angle-right"/>
            </FluxPressable>
        </slot>

        <FluxAutoHeightTransition>
            <FluxPane
                v-if="isOpen"
                :class="$style.expandablePaneBody"
                :id="contentId"
                role="region"
                :aria-labelledby="headerId">
                <slot
                    v-bind="{contentId, headerId, subtitle, title, close}"
                    name="body">
                    <FluxPaneBody>
                        <slot v-bind="{subtitle, title, close}"/>
                    </FluxPaneBody>
                </slot>
            </FluxPane>
        </FluxAutoHeightTransition>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { useComponentId } from '@basmilius/common';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { getCurrentInstance, onBeforeMount, onUnmounted, ref, useId, type VNode, watch } from 'vue';
    import { useExpandableGroupInjection } from '~flux/components/composable';
    import { FluxAutoHeightTransition } from '~flux/components/transition';
    import FluxIcon from './FluxIcon.vue';
    import FluxLayerPane from './FluxLayerPane.vue';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Expandable.module.scss';

    const emit = defineEmits<{
        toggle: [boolean];
    }>();

    const {
        isOpened
    } = defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly isOpened?: boolean;
        readonly subtitle?: string;
        readonly title?: string;
    }>();

    defineSlots<{
        before(): VNode[];

        body(props: {
            readonly contentId: string;
            readonly headerId: string;
            readonly subtitle?: string;
            readonly title?: string;
            close(): void;
        }): VNode[];

        default(props: {
            readonly subtitle?: string;
            readonly title?: string;
            close(): void;
        }): VNode[];

        header(props: {
            readonly contentId: string;
            readonly headerId: string;
            readonly subtitle?: string;
            readonly title?: string;
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
