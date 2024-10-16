<template>
    <FluxButton
        :="{disabled, isLoading, label, href, rel, target, to, type}"
        :css-class="styles.action"
        :css-class-icon="styles.actionIcon"
        :css-class-label="styles.actionLabel"
        :class="isDestructive && styles.isDestructive"
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
    import styles from '@/css/component/Action.module.scss';

    defineEmits<ButtonEmits>();

    defineProps<Omit<ButtonProps, 'iconBefore' | 'iconAfter' | 'size'> & {
        readonly icon?: IconName;
        readonly isDestructive?: boolean;
    }>();
</script>
