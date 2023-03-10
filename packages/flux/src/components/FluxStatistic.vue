<template>
    <flux-pane
        class="flux-statistic"
        :class="{
            [`flux-statistic-${color}`]: !!color,
            'flux-statistic-vertical': axis === 'vertical'
        }">
        <div class="flux-statistic-icon">
            <flux-icon
                :size="24"
                :variant="icon"/>
        </div>

        <div class="flux-statistic-data">
            <span>{{ label }}</span>
            <strong>{{ value }}</strong>
        </div>

        <div
            v-if="changeIcon || changeValue"
            class="flux-statistic-change"
            :class="{
                [`flux-statistic-change-${changeColor}`]: !!changeColor
            }">
            <span v-if="changeValue">{{ changeValue }}</span>

            <flux-icon
                v-if="changeIcon"
                :size="14"
                :variant="changeIcon"/>
        </div>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon, FluxPane } from '.';

    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
        readonly changeColor?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly changeIcon?: IconNames;
        readonly changeValue?: string;
        readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon: IconNames;
        readonly label: string;
        readonly value: string;
    }

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal'
    });
</script>

<style lang="scss">
    .flux-statistic {
        display: flex;
        padding: 21px;
        gap: 21px;

        &-change {
            display: flex;
            align-items: center;
            align-self: flex-end;
            gap: 6px;
            font-size: 12px;
            font-weight: 600;
            line-height: 1;

            &-primary {
                color: rgb(var(--primary-7));
            }

            &-danger {
                color: rgb(var(--danger-7));
            }

            &-info {
                color: rgb(var(--info-7));
            }

            &-success {
                color: rgb(var(--success-7));
            }

            &-warning {
                color: rgb(var(--warning-7));
            }
        }

        &-data {
            display: flex;
            flex-flow: column;
            flex-grow: 1;
            gap: 9px;
            line-height: 1;

            span {
                color: var(--foreground-secondary);
            }

            strong {
                color: var(--foreground-prominent);
                font-size: 24px;
                font-weight: 700;
            }
        }

        &-icon {
            display: flex;
            height: 48px;
            width: 48px;
            align-items: center;
            justify-content: center;
            background: rgb(var(--gray-3));
            border-radius: var(--radius);
            color: rgb(var(--gray-7));
        }

        &-primary &-icon {
            background: rgb(var(--primary-1));
            color: rgb(var(--primary-7));
        }

        &-danger &-icon {
            background: rgb(var(--danger-1));
            color: rgb(var(--danger-7));
        }

        &-info &-icon {
            background: rgb(var(--info-1));
            color: rgb(var(--info-7));
        }

        &-success &-icon {
            background: rgb(var(--success-1));
            color: rgb(var(--success-7));
        }

        &-warning &-icon {
            background: rgb(var(--warning-1));
            color: rgb(var(--warning-7));
        }

        &-vertical {
            display: grid;
            grid-template-columns: 1fr auto;
        }

        &-vertical &-icon {
            grid-column: 1 / span 2;
        }
    }
</style>
