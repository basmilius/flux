<template>
    <div
        :class="styles.boxedIcon"
        :style="{
            fontSize: `${size}px`
        }">
        <FluxIcon
            :size="size"
            :variant="variant"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import styles from '@/css/components/Icon.module.scss';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly size?: number;
        readonly variant: IconNames;
    }

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        size: 20
    });
</script>
