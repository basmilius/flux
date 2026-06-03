<template>
    <div
        :class="clsx(
            mode === 'error' && $style.formFieldAdditionError,
            mode === 'hint' && $style.formFieldAdditionHint
        )"
        role="alert">
        <FluxIcon
            v-if="icon"
            :class="$style.formFieldAdditionIcon"
            :name="icon"
            :size="16"/>

        <span v-if="message">
            {{ message }}
        </span>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        mode = 'hint'
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly message?: string;
        readonly mode?: 'error' | 'hint';
    }>();
</script>
