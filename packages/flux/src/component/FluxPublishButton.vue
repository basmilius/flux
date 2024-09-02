<template>
    <BaseButton
        :="{type, disabled, iconAfter, isLoading, label, size, to}"
        :class="clsx(
            !isDone && !isLoading && styles.isIdle,
            isDone && styles.isDone,
            isLoading && styles.isLoading
        )"
        :css-class="styles.publishButton"
        :css-class-icon="styles.publishButtonIcon"
        :css-class-label="styles.publishButtonLabel"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template #icon-before>
            <div :class="styles.publishButtonAnimation">
                <FluxIcon
                    :class="styles.publishButtonCloud"
                    variant="cloud"/>

                <FluxIcon
                    :class="styles.publishButtonCloud"
                    variant="cloud"/>

                <svg
                    :class="styles.publishButtonAnimation"
                    viewBox="0 0 512 512">
                    <path
                        :class="styles.publishButtonAnimationCircle"
                        d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256ZM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48Z"/>

                    <path
                        :class="styles.publishButtonAnimationArrow"
                        d="M272.9 135.7c-4.6-4.9-11-7.7-17.7-7.7-7.7.3-14.1 2.9-17.7 7.8l-87.25 96a23.86 23.86 0 0 0-4.15 25.9c3.8 8.7 12.4 14.3 21 14.3h56l.9 88a24 24 0 0 0 24 24h16c13.25 0 23.1-10.75 23.1-24v-88h56c9.53 0 18.16-5.66 22-14.38a24.03 24.03 0 0 0-4.38-25.91L272.9 135.7Z"/>

                    <path
                        :class="styles.publishButtonAnimationCheck"
                        d="M243.8 339.8a28.07 28.07 0 0 1-39.6 0l-64-64a28.07 28.07 0 0 1 0-39.6 28.07 28.07 0 0 1 39.6 0l44.2 44.2 108.2-108.2a28.07 28.07 0 0 1 39.6 0 28.07 28.07 0 0 1 0 39.6l-128 128Z"/>
                </svg>
            </div>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import BaseButton, { Emits, Props as BaseProps } from './primitive/BaseButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Button.module.scss';

    export type Props = Omit<BaseProps, 'cssClass' | 'cssClassIcon' | 'cssClassLabel' | 'iconBefore'> & {
        readonly isDone?: boolean;
    };

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'button'
    });
</script>
