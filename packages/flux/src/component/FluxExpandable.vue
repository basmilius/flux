<template>
    <div
        :class="isOpen ? styles.expandableOpened : styles.expandable"
        :id="headerId"
        :aria-controls="contentId"
        :aria-expanded="isOpen">
        <slot
            v-bind="{label, isOpen, close, open, toggle}"
            name="header">
            <button
                :class="styles.expandableHeader"
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
                :class="styles.expandableBody"
                :id="contentId"
                :aria-labelledby="headerId">
                <slot
                    v-bind="{label, close}"
                    name="body">
                    <div :class="styles.expandableContent">
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
    import { useComponentId, useExpandableGroupInjection, useId } from '@/composable';
    import { FluxAutoHeightTransition, FluxFadeTransition } from '@/transition';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Expandable.module.scss';

    export type Emits = {
        toggle: [boolean];
    };

    export type Props = {
        readonly isOpened?: boolean;
        readonly label?: string;
    };

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
