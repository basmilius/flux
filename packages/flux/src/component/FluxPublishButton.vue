<template>
    <BaseButton
        :="{type, disabled, iconAfter, isLoading, label, size, to}"
        :class="{
            [styles.publishButtonIdle]: !isDone && !isLoading,
            [styles.publishButtonDone]: isDone,
            [styles.publishButtonLoading]: isLoading
        }"
        :css-class="styles.publishButton"
        :css-class-icon="styles.primaryButtonIcon"
        :css-class-label="styles.primaryButtonLabel"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template #icon-before>
            <div :class="styles.publishButtonIcon">
                <FluxIcon
                    :class="styles.publishButtonCloud"
                    variant="cloud"/>

                <FluxIcon
                    :class="styles.publishButtonCloud"
                    variant="cloud"/>

                <svg
                    :class="styles.publishButtonIcon"
                    viewBox="0 0 512 512">
                    <!-- circle -->
                    <path
                        :class="styles.publishButtonIconCircle"
                        d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256ZM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48Z"/>

                    <!-- arrow -->
                    <path
                        :class="styles.publishButtonIconArrow"
                        d="M272.9 135.7c-4.6-4.9-11-7.7-17.7-7.7-7.7.3-14.1 2.9-17.7 7.8l-87.25 96a23.86 23.86 0 0 0-4.15 25.9c3.8 8.7 12.4 14.3 21 14.3h56l.9 88a24 24 0 0 0 24 24h16c13.25 0 23.1-10.75 23.1-24v-88h56c9.53 0 18.16-5.66 22-14.38a24.03 24.03 0 0 0-4.38-25.91L272.9 135.7Z"/>

                    <!-- check -->
                    <path
                        :class="styles.publishButtonIconCheck"
                        d="M243.8 339.8a28.07 28.07 0 0 1-39.6 0l-64-64a28.07 28.07 0 0 1 0-39.6 28.07 28.07 0 0 1 39.6 0l44.2 44.2 108.2-108.2a28.07 28.07 0 0 1 39.6 0 28.07 28.07 0 0 1 0 39.6l-128 128Z"/>
                </svg>
            </div>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { BaseButton } from './primitive';
    import styles from '@/css/components/Button.module.scss';
    import FluxIcon from './FluxIcon.vue';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames;
        readonly isDone?: boolean;
        readonly isLoading?: boolean;
        readonly label?: string;
        readonly size?: 'small' | 'medium' | 'large';
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'button'
    });
</script>
