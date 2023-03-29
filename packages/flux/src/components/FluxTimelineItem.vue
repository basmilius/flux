<template>
    <div
        class="flux-timeline-item"
        :class="{
            [`flux-timeline-item-${color}`]: !!color
        }">
        <div class="flux-timeline-item-line"/>

        <div
            v-if="photo"
            class="flux-timeline-item-photo">
            <img
                class="flux-timeline-item-photo-image"
                :src="photo"
                alt="">

            <div
                v-if="icon"
                class="flux-timeline-item-photo-icon">
                <flux-icon
                    :size="16"
                    :variant="icon"/>
            </div>
        </div>

        <div
            v-else-if="icon"
            class="flux-timeline-item-icon">
            <flux-icon
                :size="20"
                :variant="icon"/>
        </div>

        <div class="flux-timeline-item-body">
            <div
                v-if="title || when"
                class="flux-timeline-item-header">
                <strong v-if="title">{{ title }}</strong>
                <span v-if="when">{{ when }}</span>
            </div>

            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Props {
        readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon?: IconNames;
        readonly photo?: string;
        readonly title?: string;
        readonly when?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    @layer component {
        .flux-timeline-item {
            --timeline-item-icon-background: rgb(var(--gray-3));
            --timeline-item-icon-foreground: var(--foreground-secondary);

            position: relative;
            display: grid;
            gap: 21px;
            grid-template-columns: 42px minmax(0, 1fr);

            &-icon,
            &-photo {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 99px;
                outline: 6px solid rgb(var(--gray-0));
            }

            &-icon {
                margin: 3px;
                height: 36px;
                width: 36px;
                background: var(--timeline-item-icon-background);
                color: var(--timeline-item-icon-foreground);
            }

            &-photo {
                height: 42px;
                width: 42px;

                &-icon {
                    position: absolute;
                    display: flex;
                    right: -9px;
                    bottom: -9px;
                    height: 30px;
                    width: 30px;
                    align-items: center;
                    justify-content: center;
                    background: rgb(var(--gray-0));
                    border-radius: 99px;
                    color: var(--timeline-item-icon-foreground);
                }

                &-image {
                    position: absolute;
                    inset: 0;
                    height: 100%;
                    width: 100%;
                    border-radius: inherit;
                    object-fit: cover;
                    object-position: center;
                }
            }

            &-body {
                position: relative;
                align-self: center;
                padding-top: 9px;
                padding-bottom: 9px;
            }

            &-header {
                display: flex;
                margin-bottom: 9px;
                flex-flow: column;

                strong {
                    color: var(--foreground-prominent);
                }

                span {
                    color: var(--foreground-secondary);
                    font-size: 14px;
                }
            }

            &-line {
                position: absolute;
                top: 20px;
                left: 20px;
                height: 100%;
                width: 2px;
                background: rgb(var(--gray-3));
            }

            &-primary {
                --timeline-item-icon-background: rgb(var(--primary-2));
                --timeline-item-icon-foreground: rgb(var(--primary-7));
            }

            &-danger {
                --timeline-item-icon-background: rgb(var(--danger-2));
                --timeline-item-icon-foreground: rgb(var(--danger-7));
            }

            &-info {
                --timeline-item-icon-background: rgb(var(--info-2));
                --timeline-item-icon-foreground: rgb(var(--info-7));
            }

            &-success {
                --timeline-item-icon-background: rgb(var(--success-2));
                --timeline-item-icon-foreground: rgb(var(--success-7));
            }

            &-warning {
                --timeline-item-icon-background: rgb(var(--warning-2));
                --timeline-item-icon-foreground: rgb(var(--warning-7));
            }

            @at-root .flux-timeline &:last-of-type &-line {
                display: none;
            }
        }

        @include flux.dark-mode {
            .flux-timeline-item {
                --timeline-item-icon-background: rgb(var(--gray-2));
            }
        }
    }
</style>
