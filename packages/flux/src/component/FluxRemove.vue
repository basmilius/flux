<template>
    <button
        :class="clsx(
            styles.remove,
            isHidden && styles.isHidden
        )"
        type="button"
        @click="emit('click', $event)">
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
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Remove.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        icon = 'xmark'
    } = defineProps<{
        readonly icon?: IconName;
        readonly isHidden?: boolean;
    }>();
</script>
