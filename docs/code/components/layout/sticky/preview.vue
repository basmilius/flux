<template>
    <Preview>
        <div style="height: 220px; width: 100%; overflow: auto; border: 1px solid var(--surface-stroke); border-radius: 6px">
            <FluxSticky has-shadow-on-stick>
                <div style="padding: 12px 18px; background: var(--surface)">
                    Sticky header
                </div>
            </FluxSticky>

            <div style="padding: 18px">
                <p
                    v-for="i in 12"
                    :key="i">
                    Scroll content row {{ i }}.
                </p>
            </div>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxSticky } from '@flux-ui/components';
</script>
