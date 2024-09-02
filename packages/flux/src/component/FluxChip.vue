<template>
    <Component
        :is="isSelectable ? 'button' : 'div'"
        :class="clsx(
            styles.chip,
            isSelectable && styles.isSelectable,
            isSelected && styles.isSelected
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
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Chip.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly iconAfter?: IconNames;
        readonly iconBefore?: IconNames;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label: string;
    };

    defineEmits<Emits>();
    defineProps<Props>();
</script>
