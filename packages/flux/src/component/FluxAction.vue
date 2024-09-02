<template>
    <BaseButton
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
    import type { IconNames } from '@/data';
    import BaseButton, { Emits, Props as BaseProps } from './primitive/BaseButton.vue';
    import styles from '@/css/component/Action.module.scss';

    export type Props = Omit<BaseProps, 'cssClass' | 'cssClassIcon' | 'cssClassLabel' | 'iconBefore' | 'iconAfter' | 'size'> & {
        readonly isDestructive?: boolean;
        readonly icon?: IconNames;
    };

    defineEmits<Emits>();
    defineProps<Props>();
</script>
