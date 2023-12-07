<template>
    <BaseButton
        v-bind="{disabled, isLoading, label, href, rel, target, to, type}"
        :css-class="destructive ? styles.actionDestructive : styles.action"
        :css-class-icon="styles.actionIcon"
        :css-class-label="styles.actionLabel"
        :icon-before="icon"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import styles from '@/css/components/Action.module.scss';
    import { BaseButton } from './primitive';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly destructive?: boolean;
        readonly disabled?: boolean;
        readonly icon?: IconNames;
        readonly isLoading?: boolean;
        readonly label?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
        readonly type?: 'button' | 'link' | 'route';
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>
