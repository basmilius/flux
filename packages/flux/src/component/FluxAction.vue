<template>
    <FluxButton
        :="{disabled, isLoading, label, href, rel, target, to, type}"
        :css-class="$style.action"
        :css-class-icon="$style.actionIcon"
        :css-class-label="$style.actionLabel"
        :class="isDestructive && $style.isDestructive"
        :icon-before="icon"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxIconName } from '@/types';
    import FluxButton from './FluxButton.vue';
    import $style from '@/css/component/Action.module.scss';

    defineEmits<FluxButtonEmits>();

    defineProps<Omit<FluxButtonProps, 'iconBefore' | 'iconAfter' | 'size'> & {
        readonly icon?: FluxIconName;
        readonly isDestructive?: boolean;
    }>();
</script>
