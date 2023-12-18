<template>
    <td
        class="flux-table-cell"
        :class="{
            'is-bordered': isBordered,
            'is-hoverable': isHoverable,
            'is-separated': isSeparated,
            'is-striped': isStriped
        }">
        <slot name="content">
            <div
                class="flux-table-cell-content"
                :style="{
                    flexFlow: contentDirection
                }">
                <slot/>
            </div>
        </slot>
    </td>
</template>

<script
    lang="ts"
    setup>
    import { useTableInjection } from '@/composables';

    export interface Props {
        readonly contentDirection?: 'column' | 'row';
    }

    withDefaults(defineProps<Props>(), {
        contentDirection: 'row'
    });

    const {
        isBordered,
        isHoverable,
        isSeparated,
        isStriped
    } = useTableInjection();
</script>

<style lang="scss">
    .flux-table {
        &-cell {
            height: 0;
            padding: 0;
            border: 0 solid rgb(var(--gray-3));

            &-content {
                display: flex;
                height: 100%;
                padding: 12px 15px;
                align-items: flex-start;
            }

            @-moz-document url-prefix() {
                height: 100%;
            }
        }

        tbody &-row:nth-child(even) &-cell.is-striped {
            background: rgb(var(--gray-2));
        }

        tbody &-row:hover &-cell.is-hoverable {
            background: rgb(var(--gray-2));
        }

        tfoot &-cell {
            border-top: 2px solid rgb(var(--gray-3));
        }

        &-cell + &-cell.is-bordered {
            border-left-width: 1px;
        }

        &-row + &-row &-cell.is-separated {
            border-top-width: 1px;
        }

        @at-root .flux-pane > & &-cell:first-child &-cell-content {
            padding-left: 21px;
        }

        @at-root .flux-pane > & &-cell:last-child &-cell-content {
            padding-right: 21px;
        }

        @at-root :not(.flux-pane) > & &-cell:not(.is-bordered):first-child &-cell-content {
            padding-left: 0;
        }

        @at-root :not(.flux-pane) > & &-cell:not(.is-bordered):last-child &-cell-content {
            padding-right: 0;
        }
    }
</style>
