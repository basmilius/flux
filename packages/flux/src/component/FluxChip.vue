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
                :key="selectableIcon"
                :name="selectableIcon"
                :size="16"/>
        </FluxFadeTransition>

        <FluxIcon
            v-else-if="iconLeading"
            :name="iconLeading"
            :size="16"/>

        <span>{{ label }}</span>

        <FluxIcon
            v-if="iconTrailing"
            :name="iconTrailing"
            :size="16"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Chip.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        iconLeading,
        isSelected
    } = defineProps<{
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label: string;
    }>();

    const selectableIcon = computed<FluxIconName>(() => isSelected ? 'check' : (iconLeading ?? 'plus'));
</script>
