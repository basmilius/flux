<template>
    <div :class="$style.componentGrid">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
</script>

<style
    lang="scss"
    module>
    .componentGrid {
        display: grid;
        gap: 30px 18px;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    }

    :global(:is(h1, h2, p)) + .componentGrid {
        margin-top: 30px;
    }
</style>
