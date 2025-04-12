<template>
    <FluxButton
        :="{type, disabled, iconTrailing, isFilled, isLoading, label, size, to}"
        :class="clsx(
            !isDone && !isLoading && $style.isIdle,
            isDone && $style.isDone,
            isLoading && $style.isLoading
        )"
        :css-class="$style.publishButton"
        :css-class-icon="$style.publishButtonIcon"
        :css-class-label="$style.publishButtonLabel"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template #iconLeading>
            <div :class="$style.publishButtonAnimation">
                <FluxIcon
                    :class="$style.publishButtonCloud"
                    name="cloud"/>

                <FluxIcon
                    :class="$style.publishButtonCloud"
                    name="cloud"/>

                <svg
                    :class="$style.publishButtonAnimation"
                    viewBox="0 0 512 512">
                    <path
                        :class="$style.publishButtonAnimationCircle"
                        d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256ZM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48Z"/>

                    <path
                        :class="$style.publishButtonAnimationArrow"
                        d="M272.9 135.7c-4.6-4.9-11-7.7-17.7-7.7-7.7.3-14.1 2.9-17.7 7.8l-87.25 96a23.86 23.86 0 0 0-4.15 25.9c3.8 8.7 12.4 14.3 21 14.3h56l.9 88a24 24 0 0 0 24 24h16c13.25 0 23.1-10.75 23.1-24v-88h56c9.53 0 18.16-5.66 22-14.38a24.03 24.03 0 0 0-4.38-25.91L272.9 135.7Z"/>

                    <path
                        :class="$style.publishButtonAnimationCheck"
                        d="M243.8 339.8a28.07 28.07 0 0 1-39.6 0l-64-64a28.07 28.07 0 0 1 0-39.6 28.07 28.07 0 0 1 39.6 0l44.2 44.2 108.2-108.2a28.07 28.07 0 0 1 39.6 0 28.07 28.07 0 0 1 0 39.6l-128 128Z"/>
                </svg>
            </div>
        </template>
    </FluxButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxButton from './FluxButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Button.module.scss';

    defineEmits<FluxButtonEmits>();

    defineProps<Omit<FluxButtonProps, 'iconLeading'> & {
        readonly isDone?: boolean;
    }>();
</script>
