<template>
    <div
        :class="clsx(
            mode === 'error' && styles.formFieldAdditionError,
            mode === 'hint' && styles.formFieldAdditionHint
        )"
        role="alert">
        <FluxIcon
            v-if="icon"
            :size="16"
            :class="styles.formFieldAdditionIcon"
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
    import styles from '@/css/component/Form.module.scss';

    const {
        mode = 'hint'
    } = defineProps<{
        readonly icon?: IconName;
        readonly message?: string;
        readonly mode?: 'error' | 'hint';
    }>();
</script>
