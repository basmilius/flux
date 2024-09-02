<template>
    <button
        :class="clsx(
            styles.remove,
            isHidden && styles.isHidden
        )"
        type="button"
        @click="$emit('click', $event)">
        <FluxIcon
            v-if="icon"
            :size="16"
            :variant="icon"/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Remove.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly icon?: IconNames;
        readonly isHidden?: boolean;
    };

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        icon: 'xmark'
    });
</script>
