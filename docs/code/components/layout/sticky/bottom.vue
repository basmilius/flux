<template>
    <div style="height: 240px; width: 100%; overflow: auto; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <div style="padding: 18px">
            <p
                v-for="i in 18"
                :key="i">
                Content row {{ i }}.
            </p>
        </div>

        <FluxSticky position="bottom">
            <div style="padding: 12px 18px; background: var(--surface); border-top: 1px solid var(--surface-stroke)">
                Sticky footer
            </div>
        </FluxSticky>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxSticky } from '@flux-ui/components';
</script>
