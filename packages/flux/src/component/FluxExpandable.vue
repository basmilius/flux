<template>
    <div
        :class="isOpen ? $style.expandableOpened : $style.expandable"
        :id="headerId"
        :aria-controls="contentId"
        :aria-expanded="isOpen">
        <slot
            v-bind="{label, isOpen, close, open, toggle}"
            name="header">
            <button
                :class="$style.expandableHeader"
                type="button"
                @click="toggle">
                <FluxFadeTransition>
                    <FluxIcon
                        v-if="icon"
                        :key="icon"
                        :variant="icon"/>
                </FluxFadeTransition>

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
                :class="$style.expandableBody"
                :id="contentId"
                :aria-labelledby="headerId">
                <slot
                    v-bind="{label, close}"
                    name="body">
                    <div :class="$style.expandableContent">
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
    import { useComponentId } from '@basmilius/flux-internals';
    import { getCurrentInstance, onBeforeMount, onUnmounted, ref, unref, useId, watch } from 'vue';
    import { useExpandableGroupInjection } from '$flux/composable';
    import { FluxAutoHeightTransition, FluxFadeTransition } from '$flux/transition';
    import { FluxIconName } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Expandable.module.scss';

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

    watch(() => isOpened, () => {
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
