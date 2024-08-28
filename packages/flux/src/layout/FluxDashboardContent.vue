<template>
    <main class="flux-dashboard-content">
        <slot/>
    </main>
</template>

<style lang="scss">
    .flux-dashboard-content {
        display: flex;
        padding: 0 30px;
        flex-flow: column;
        flex-grow: 1;

        > .flux-table {
            margin-left: -30px;
            margin-right: -30px;
            margin-bottom: -30px;
            max-height: calc(100dvh - 84px);
            flex-grow: 1;
            border-top: 1px solid rgb(var(--gray-3));
        }

        > .flux-table .flux-table-cell:first-child .flux-table-cell-content {
            padding-left: 30px;
        }

        > .flux-table .flux-table-cell:last-child .flux-table-cell-content {
            padding-right: 30px;
        }
    }
</style>
