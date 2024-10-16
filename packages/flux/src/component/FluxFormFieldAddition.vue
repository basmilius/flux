<template>
    <div
        :class="clsx(
            mode === 'error' && $style.formFieldAdditionError,
            mode === 'hint' && $style.formFieldAdditionHint
        )"
        role="alert">
        <FluxIcon
            v-if="icon"
            :size="16"
            :class="$style.formFieldAdditionIcon"
            :variant="icon"/>

        <span v-if="message">
            {{ message }}
        </span>

        <slot/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { clsx } from 'clsx';
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Form.module.scss';

    const {
        mode = 'hint'
    } = defineProps<{
        readonly icon?: IconName;
        readonly message?: string;
        readonly mode?: 'error' | 'hint';
    }>();
</script>
