<template>
    <div
        data-kanban-swimlane
        role="group"
        aria-roledescription="Kanban swimlane"
        :aria-label="label"
        :data-kanban-swimlane-collapsed="isCollapsed ? '' : undefined"
        :class="clsx(
            color === 'gray' && $style.kanbanSwimlaneGray,
            color === 'primary' && $style.kanbanSwimlanePrimary,
            color === 'danger' && $style.kanbanSwimlaneDanger,
            color === 'info' && $style.kanbanSwimlaneInfo,
            color === 'success' && $style.kanbanSwimlaneSuccess,
            color === 'warning' && $style.kanbanSwimlaneWarning,
            isCollapsed && $style.isCollapsed
        )">
        <header :class="$style.kanbanSwimlaneHeader">
            <div :class="$style.kanbanSwimlaneCaption">
                <button
                    :class="$style.kanbanSwimlaneToggle"
                    type="button"
                    :aria-expanded="!isCollapsed"
                    :aria-label="toggleLabel"
                    @click="isCollapsed = !isCollapsed">
                    <FluxIcon
                        :class="clsx($style.kanbanSwimlaneChevron, !isCollapsed && $style.isExpanded)"
                        name="angle-right"
                        :size="16"/>

                    <span :class="$style.kanbanSwimlaneLabel">{{ label }}</span>
                </button>

                <FluxBadge
                    v-if="count != null"
                    :color="color"
                    :label="String(count)"/>
            </div>
        </header>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, provide, toRef, useId } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxKanbanSwimlaneInjectionKey } from '~flux/components/data';
    import FluxBadge from './FluxBadge.vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Kanban.module.scss';

    const isCollapsed = defineModel<boolean>('isCollapsed', {
        default: false
    });

    const {
        color = 'gray',
        label,
        swimlaneId
    } = defineProps<{
        readonly color?: FluxColor;
        readonly count?: number;
        readonly label: string;
        readonly swimlaneId?: string | number;
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const translate = useTranslate();

    // Falling back to the label would collide as soon as two lanes share one, since the
    // label is part of the cell id every drop resolves against.
    const fallbackId = useId();

    const toggleLabel = computed(() => isCollapsed.value ? translate('flux.expandGroup') : translate('flux.collapseGroup'));

    provide(FluxKanbanSwimlaneInjectionKey, {
        swimlaneId: toRef(() => swimlaneId ?? fallbackId)
    });
</script>
