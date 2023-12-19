<template>
    <div class="flux-pane-header">
        <div
            v-if="icon"
            class="flux-pane-header-icon"
            :class="{
                'is-extended': title && subTitle
            }">
            <FluxIcon
                :size="20"
                :variant="icon"/>
        </div>

        <div
            v-if="title || subTitle"
            class="flux-pane-header-caption">
            <span
                v-if="title"
                class="flux-pane-header-title">
                {{ title }}
            </span>

            <span
                v-if="subTitle"
                class="flux-pane-header-sub-title">
                {{ subTitle }}
            </span>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';

    export interface Props {
        readonly icon?: IconNames;
        readonly subTitle?: string;
        readonly title?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-pane-header {
        display: flex;
        padding: 21px 21px 0;
        align-items: center;
        gap: 15px;

        &-caption {
            display: flex;
            flex-flow: column;
            flex-grow: 1;
        }

        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary-7));

            &.is-extended {
                height: 45px;
                width: 45px;
                background: rgb(var(--primary-2));
                border-radius: var(--radius);
            }
        }

        &-title {
            color: var(--foreground-prominent);
            font-weight: 700;
        }

        &-sub-title {
            color: var(--foreground);
            font-size: 14px;
        }

        &:first-child {
            border-radius: var(--radius) var(--radius) 0 0;
        }
    }

    @include flux.dark-mode {
        .flux-pane-header-icon.is-extended {
            background: rgb(var(--gray-2));
        }
    }
</style>
