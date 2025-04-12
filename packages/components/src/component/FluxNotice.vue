<template>
    <div
        :class="clsx(
            color === 'gray' && $style.noticeGray,
            color === 'primary' && $style.noticePrimary,
            color === 'danger' && $style.noticeDanger,
            color === 'info' && $style.noticeInfo,
            color === 'success' && $style.noticeSuccess,
            color === 'warning' && $style.noticeWarning,
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
            :name="icon"/>

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
            <FluxIcon name="xmark"/>
        </button>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Notice.module.scss';

    const emit = defineEmits<{
        close: [];
    }>();

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly isCenter?: boolean;
        readonly isCloseable?: boolean;
        readonly isFluid?: boolean;
        readonly isLoading?: boolean;
        readonly message?: string;
        readonly title?: string;
    }>();

    defineSlots<{
        default(): any;
        end(): any;
    }>();
</script>
