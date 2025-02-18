<template>
    <button
        :class="clsx(
            $style.remove,
            isHidden && $style.isHidden
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
    import type { FluxIconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Remove.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        icon = 'xmark'
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isHidden?: boolean;
    }>();
</script>
