<template>
    <div
        class="flux-placeholder"
        :class="{
            'is-button': isButton,
            'is-extended': variant === 'extended',
            'is-simple': variant === 'simple',
            'is-small': variant === 'small'
        }"
        @click="onClick">
        <FluxIcon
            v-if="icon"
            class="flux-placeholder-icon"
            :variant="icon"/>

        <div class="flux-placeholder-caption">
            <strong
                v-if="title"
                class="flux-placeholder-title">
                {{ title }}
            </strong>

            <p
                v-if="message"
                class="flux-placeholder-message">
                {{ message }}
            </p>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly icon?: IconNames;
        readonly isButton?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: 'extended' | 'simple' | 'small';
    }

    const emit = defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        variant: 'extended'
    });

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>

<style lang="scss">
    .flux-placeholder {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1 1 0;
        flex-flow: column;
        justify-content: center;
        background: rgb(var(--gray-2));
        border: 2px dashed rgb(var(--gray-4));
        border-radius: var(--radius);
        text-align: center;
        user-select: none;

        &.is-button {
            cursor: pointer;

            &:hover {
                background: rgb(var(--gray-3));
                border-color: rgb(var(--gray-5));
            }
        }

        &-icon {
            color: rgb(var(--primary-7));
            font-size: 20px;
        }

        &-caption {
            display: flex;
            align-items: stretch;
            flex-flow: column;
        }

        &-message {
            margin: 0;
            max-width: 510px;
            color: var(--foreground-secondary);
            font-size: 14px;
        }

        &.is-extended {
            padding: 27px;
            gap: 9px;
        }

        &.is-extended &-icon {
            font-size: 24px;
        }

        &.is-simple {
            padding: 18px;
        }

        &.is-small {
            padding: 12px;
            font-size: 12px;
        }

        &.is-small &-icon {
            color: var(--foreground-secondary);
        }

        &.is-small &-title {
            color: var(--foreground-secondary);
            font-weight: 400;
        }
    }
</style>
