<script
    lang="ts"
    setup>
    import type { DateTime } from 'luxon';
    import { computed, getCurrentInstance, onBeforeUnmount, onMounted, type VNode, watch } from 'vue';
    import { useCalendarInjection } from '~flux/components/composable';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const props = defineProps<{
        readonly date: DateTime;
        readonly id?: string | number;
        readonly duration?: number;
        readonly allDay?: boolean;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    const dragContext = useCalendarInjection();
    const instance = getCurrentInstance();
    const isClickable = computed(() => !!instance?.vnode?.props?.onClick);

    function buildData() {
        return {
            id: props.id as string | number,
            date: props.date,
            duration: props.duration,
            allDay: props.allDay ?? false,
            isClickable: isClickable.value,
            renderContent: () => slots.default?.() ?? [],
            handleClick: (evt: MouseEvent) => emit('click', evt)
        };
    }

    onMounted(() => {
        if (dragContext && props.id != null) {
            dragContext.registerItem(props.id, buildData());
        }
    });

    onBeforeUnmount(() => {
        if (dragContext && props.id != null) {
            dragContext.unregisterItem(props.id);
        }
    });

    watch(() => props.id, (newId, oldId) => {
        if (!dragContext) {
            return;
        }

        if (oldId != null) {
            dragContext.unregisterItem(oldId);
        }

        if (newId != null) {
            dragContext.registerItem(newId, buildData());
        }
    });

    watch(
        () => [props.date, props.duration, props.allDay, isClickable.value],
        () => {
            if (dragContext && props.id != null) {
                dragContext.registerItem(props.id, buildData());
            }
        }
    );
</script>

<template>
    <span
        aria-hidden="true"
        style="display: none"/>
</template>
