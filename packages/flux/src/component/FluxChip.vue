<template>
    <Component
        :is="isSelectable ? 'button' : 'div'"
        :class="clsx(
            $style.chip,
            isSelectable && $style.isSelectable,
            isSelected && $style.isSelected
        )"
        @click="$emit('click', $event)">
        <FluxFadeTransition v-if="isSelectable">
            <FluxIcon
                :key="isSelected ? 'check' : (iconLeading ?? 'plus')"
                :size="16"
                :variant="isSelected ? 'check' : (iconLeading ?? 'plus')"/>
        </FluxFadeTransition>

        <FluxIcon
            v-else-if="iconLeading"
            :size="16"
            :variant="iconLeading"/>

        <span>{{ label }}</span>

        <FluxIcon
            v-if="iconTrailing"
            :size="16"
            :variant="iconTrailing"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { FluxFadeTransition } from '$flux/transition';
    import type { FluxIconName } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Chip.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label: string;
    }>();
</script>
