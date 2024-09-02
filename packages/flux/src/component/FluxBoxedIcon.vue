<template>
    <div
        data-typography-aware
        :class="styles.iconBoxed"
        :style="{
            fontSize: size && `${size}px`
        }">
        <FluxIcon :variant="variant"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Icon.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly size?: number;
        readonly variant: IconNames;
    };

    defineEmits<Emits>();
    defineProps<Props>();
</script>
