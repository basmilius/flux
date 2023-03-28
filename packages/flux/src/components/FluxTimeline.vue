<template>
    <div class="flux-timeline">
        <slot/>
    </div>
</template>

<style lang="scss">
    @layer component {
        .flux-timeline {
            display: flex;
            flex-flow: column;
            gap: 15px;
        }
    }
</style>
