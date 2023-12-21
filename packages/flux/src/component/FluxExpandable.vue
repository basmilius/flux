<template>
    <div
        :class="{
            [styles.expandable]: true,
            [styles.expandableOpen]: isOpen
        }">
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
                :class="styles.expandableBody">
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
    import { useComponentId, useExpandableGroupInjection } from '@/composable';
    import { FluxAutoHeightTransition, FluxFadeTransition } from '@/transition';
    import styles from '@/css/components/Expandable.module.scss';
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
