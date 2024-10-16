<template>
    <Component
        :is="isSelectable ? 'button' : 'div'"
        :class="clsx(
            $style.chip,
            isSelectable && $style.isSelectable,
            isSelected && $style.isSelected
        )"
        @click="$emit('click', $event)">
        <FluxIcon
            v-if="isSelectable"
            :size="16"
            :variant="isSelected ? 'check' : (iconBefore ?? 'plus')"/>

        <FluxIcon
            v-else-if="iconBefore"
            :size="16"
            :variant="iconBefore"/>

        <span>{{ label }}</span>

        <FluxIcon
            v-if="iconAfter"
            :size="16"
            :variant="iconAfter"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Chip.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly iconAfter?: IconName;
        readonly iconBefore?: IconName;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label: string;
    }>();
</script>
