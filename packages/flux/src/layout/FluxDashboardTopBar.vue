<template>
    <header class="flux-dashboard-top-bar">
        <slot/>
    </header>
</template>

<style lang="scss">
    .flux-dashboard-top-bar {
        position: sticky;
        display: flex;
        top: 0;
        height: 84px;
        padding-left: 30px;
        padding-right: 30px;
        align-items: center;
        flex-flow: row;
        gap: 15px;
        background: rgb(var(--gray-0) / .9);
        backdrop-filter: blur(10px) saturate(180%);
        z-index: 1000;

        > h1 {
            font-size: 18px;
        }

        > .flux-icon {
            color: var(--foreground-prominent);
        }
    }
</style>
