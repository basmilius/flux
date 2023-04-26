<template>
    <td class="flux-table-cell">
        <div class="flux-table-cell-content">
            <slot/>
        </div>
    </td>
</template>

<script
    lang="ts"
    setup>
</script>

<style lang="scss">
    .flux-table-cell {
        height: 0;

        &-content {
            display: flex;
            height: 100%;
            padding: 12px 15px;
            align-items: flex-start;
        }
    }

    .flux-table {
        &.is-hoverable tbody &-row:hover &-cell {
            background: rgb(var(--gray-1));
        }

        tfoot &-cell {
            border-top: 2px solid rgb(var(--gray-3));
        }

        &-cell + &-cell {
            border-left: 1px solid rgb(var(--gray-3));
        }

        &-row + &-row &-cell {
            border-top: 1px solid rgb(var(--gray-3));
        }
    }

    .flux-pane > .flux-table .flux-table-cel-contentl {
        &:first-child {
            padding-left: 21px;
        }

        &:last-child {
            padding-right: 21px;
        }
    }

    :not(.flux-pane) > .flux-table .flux-table-cell-content {
        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }
    }
</style>
