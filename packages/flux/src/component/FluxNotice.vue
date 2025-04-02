<template>
    <div
        :class="clsx(
            variant === 'gray' && $style.noticeGray,
            variant === 'primary' && $style.noticePrimary,
            variant === 'danger' && $style.noticeDanger,
            variant === 'info' && $style.noticeInfo,
            variant === 'success' && $style.noticeSuccess,
            variant === 'warning' && $style.noticeWarning,
            isCenter && $style.isCenter,
            isFluid && $style.isFluid
        )"
        role="alert">
        <FluxSpinner
            v-if="isLoading"
            :class="$style.noticePrefix"/>

        <FluxIcon
            v-if="icon && !isLoading"
            :class="$style.noticePrefix"
            :variant="icon"/>

        <div :class="$style.noticeBody">
            <p
                v-if="title"
                :class="$style.noticeTitle">
                {{ title }}
            </p>
            <p
                v-if="message"
                :class="$style.noticeMessage">
                {{ message }}
            </p>
            <slot/>
        </div>

        <slot name="end"/>

        <button
            v-if="isCloseable"
            :class="$style.noticeClose"
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
    import type { FluxColorVariant, FluxIconName } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Notice.module.scss';

    const emit = defineEmits<{
        close: [];
    }>();

    const {
        variant = 'gray'
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isCenter?: boolean;
        readonly isCloseable?: boolean;
        readonly isFluid?: boolean;
        readonly isLoading?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: FluxColorVariant;
    }>();

    defineSlots<{
        default(): any;
        end(): any;
    }>();
</script>
