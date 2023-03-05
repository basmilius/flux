<template>
    <h3>{{ title }}</h3>

    <flux-pane class="flux-typography-aware">
        <table class="api-table">
            <thead>
            <slot name="head">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </slot>
            </thead>
            <tbody>
            <slot name="body"/>
            </tbody>
        </table>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane } from '@fancee/flux';

    export interface Props {
        readonly title: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .api-table {
        margin: -1px;
        width: calc(100% + 2px);
        border-collapse: collapse;
        border-radius: calc(var(--radius) + 2px);
        font-size: 14px;
        overflow: hidden;

        td, th {
            padding: 9px 15px;
            border: 1px solid rgb(var(--gray-3));
            vertical-align: top;
            text-align: left;
        }

        th {
            background: rgb(var(--gray-1));

            &:first-child {
                width: 240px;
            }
        }

        td code {
            display: block;

            &:first-child {
                color: var(--foreground-prominent);
                font-weight: 500;
            }

            &:last-child {
                margin-top: 1px;
                font-size: 11px;
            }
        }
    }
</style>
