<template>
    <div :class="styles.formInputAddition">
        <FluxIcon
            v-if="icon"
            :size="18"
            :variant="icon"/>

        <span v-if="text">
            {{ text }}
        </span>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Form.module.scss';

    defineProps<{
        readonly icon?: IconName;
        readonly text?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
