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
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly icon?: IconNames;
        readonly text?: string;
    };

    defineProps<Props>();
</script>
