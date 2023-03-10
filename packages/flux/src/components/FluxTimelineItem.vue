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
    import { IconNames } from '../data';
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
    .flux-timeline-item {
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
            background: rgb(var(--gray-3));
            color: rgb(var(--gray-7));
        }

        &-photo {
            height: 42px;
            width: 42px;

            &-icon {
                position: absolute;
                display: flex;
                right: -6px;
                bottom: -6px;
                height: 24px;
                width: 24px;
                align-items: center;
                justify-content: center;
                background: rgb(var(--gray-0));
                border-radius: 99px;
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

        &-primary &-icon {
            background: rgb(var(--primary-2));
        }

        &-danger &-icon {
            background: rgb(var(--danger-2));
        }

        &-info &-icon {
            background: rgb(var(--info-2));
        }

        &-success &-icon {
            background: rgb(var(--success-2));
        }

        &-warning &-icon {
            background: rgb(var(--warning-2));
        }

        &-primary &-icon,
        &-primary &-photo-icon {
            color: rgb(var(--primary-7));
        }

        &-danger &-icon,
        &-danger &-photo-icon {
            color: rgb(var(--danger-7));
        }

        &-info &-icon,
        &-info &-photo-icon {
            color: rgb(var(--info-7));
        }

        &-success &-icon,
        &-success &-photo-icon {
            color: rgb(var(--success-7));
        }

        &-warning &-icon,
        &-warning &-photo-icon {
            color: rgb(var(--warning-7));
        }

        @at-root .flux-timeline &:last-of-type &-line {
            display: none;
        }
    }
</style>
