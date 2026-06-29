<template>
    <div style="display: flex; flex-direction: column; gap: 12px">
        <FluxButtonGroup>
            <FluxSecondaryButton
                label="Scroll to top"
                @click="scroller?.scrollToIndex(0, 'smooth')"/>
            <FluxSecondaryButton
                label="Scroll to #5000"
                @click="scroller?.scrollToIndex(4999, 'smooth')"/>
            <FluxSecondaryButton
                label="Scroll to end"
                @click="scroller?.scrollToIndex(items.length - 1, 'smooth')"/>
        </FluxButtonGroup>

        <div style="width: 100%; height: 320px; background: var(--surface); border: 1px solid var(--surface-stroke); border-radius: var(--radius)">
            <FluxVirtualScroller
                ref="scroller"
                :item-size="44"
                :items="items">
                <template #default="{item, index}">
                    <div style="display: flex; align-items: center; gap: 12px; height: 100%; padding: 0 15px; border-bottom: 1px solid var(--surface-stroke)">
                        <strong style="width: 56px; color: var(--foreground-secondary)">#{{ index + 1 }}</strong>
                        <span>{{ item }}</span>
                    </div>
                </template>
            </FluxVirtualScroller>
        </div>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonGroup, FluxSecondaryButton, FluxVirtualScroller } from '@flux-ui/components';
    import { useTemplateRef } from 'vue';

    const scroller = useTemplateRef<InstanceType<typeof FluxVirtualScroller>>('scroller');

    const items = Array.from({length: 10000}, (_, index) => `Item number ${index + 1}`);
</script>
