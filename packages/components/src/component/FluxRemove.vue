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
            :name="icon"
            :size="16"/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Remove.module.scss';

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
