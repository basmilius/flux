<template>
    <div style="width: 100%; height: 320px; background: var(--surface); border: 1px solid var(--surface-stroke); border-radius: var(--radius)">
        <FluxVirtualScroller
            :estimated-item-height="44"
            :items="items">
            <template #default="{item, index}">
                <div style="display: flex; align-items: center; gap: 12px; height: 100%; padding: 0 15px; border-bottom: 1px solid var(--surface-stroke)">
                    <strong style="width: 56px; color: var(--foreground-secondary)">#{{ index + 1 }}</strong>
                    <span>{{ item }}</span>
                </div>
            </template>
        </FluxVirtualScroller>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxVirtualScroller } from '@flux-ui/components';

    const items = Array.from({length: 10000}, (_, index) => `Item number ${index + 1}`);
</script>
