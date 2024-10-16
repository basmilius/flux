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
    import type { ButtonEmits, ButtonProps, IconName } from '@/types';
    import FluxButton from './FluxButton.vue';
    import $style from '@/css/component/Action.module.scss';

    defineEmits<ButtonEmits>();

    defineProps<Omit<ButtonProps, 'iconBefore' | 'iconAfter' | 'size'> & {
        readonly icon?: IconName;
        readonly isDestructive?: boolean;
    }>();
</script>
