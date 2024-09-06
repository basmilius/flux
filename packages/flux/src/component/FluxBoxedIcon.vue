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
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Icon.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly size?: number;
        readonly variant: IconName;
    }>();
</script>
