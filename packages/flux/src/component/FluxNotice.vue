<template>
    <div
        :class="clsx(
            variant === 'gray' && styles.noticeGray,
            variant === 'primary' && styles.noticePrimary,
            variant === 'danger' && styles.noticeDanger,
            variant === 'info' && styles.noticeInfo,
            variant === 'success' && styles.noticeSuccess,
            variant === 'warning' && styles.noticeWarning,
            isCenter && styles.isCenter,
            isFluid && styles.isFluid,
            isSmall && styles.isSmall
        )"
        role="alert">
        <FluxSpinner
            v-if="isLoading"
            :class="styles.noticePrefix"
            :size="isSmall ? 16 : 20"/>

        <FluxIcon
            v-if="icon && !isLoading"
            :class="styles.noticePrefix"
            :size="isSmall ? 16 : 20"
            :variant="icon"/>

        <div :class="styles.noticeBody">
            <p
                v-if="title"
                :class="styles.noticeTitle">
                {{ title }}
            </p>
            <p
                v-if="message"
                :class="styles.noticeMessage">
                {{ message }}
            </p>
            <slot/>
        </div>

        <slot name="end"/>

        <button
            v-if="isCloseable"
            :class="styles.noticeClose"
            type="button"
            @click="emit('close')">
            <FluxIcon variant="xmark"/>
        </button>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Notice.module.scss';

    export type Emits = {
        close: [];
    }

    export type Props = {
        readonly icon?: IconNames;
        readonly isCenter?: boolean;
        readonly isCloseable?: boolean;
        readonly isFluid?: boolean;
        readonly isLoading?: boolean;
        readonly isSmall?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
    }

    const emit = defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        variant: 'gray'
    });
</script>
