<template>
    <div style="height: 240px; width: 100%; overflow: auto; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <FluxSticky has-shadow-on-stick>
            <div style="padding: 12px 18px; background: var(--surface); font-weight: 600">
                Header
            </div>
        </FluxSticky>

        <div style="padding: 18px">
            <p
                v-for="i in 18"
                :key="i">
                Body content {{ i }}.
            </p>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxSticky } from '@flux-ui/components';
</script>
