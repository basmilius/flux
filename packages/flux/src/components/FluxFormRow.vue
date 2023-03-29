<template>
    <div class="flux-form-row">
        <slot/>
    </div>
</template>

<style lang="scss">
    @layer component {
        .flux-form-row {
            display: flex;
            flex-grow: 1;
            gap: 12px;
        }
    }
</style>
