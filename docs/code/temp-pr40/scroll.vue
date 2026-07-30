<template>
    <FluxFlex direction="vertical">
        <FluxInfo color="warning">
            <strong>What to look for.</strong>
            <code>useScrollPosition</code> reads on mount now instead of during setup, which is the fix for the hydration mismatch. The cost is one tick: scroll the container, then remount it with the button. The badge must appear <em>after</em> the remount, not during it.
        </FluxInfo>

        <FluxPane>
            <FluxPaneHeader title="Scroll container">
                <template #end>
                    <FluxSecondaryButton
                        label="Remount"
                        @click="key++"/>
                </template>
            </FluxPaneHeader>

            <FluxPaneBody>
                <FluxFlex
                        direction="vertical"
                        :gap="9">
                    <div
                        :key="key"
                        ref="scroller"
                        class="scroller">
                        <div class="tall">
                            <span>Scroll me, then press Remount.</span>
                        </div>
                    </div>

                    <span>Offset: <strong>{{ Math.round(y) }}</strong> - starts at 0 on every remount and catches up one tick later</span>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>

        <FluxInfo>
            <strong>Back to top.</strong>
            Scroll this page past 300 pixels. The button in the corner fades in, where it used to be there immediately. Reload while scrolled down: the button must not flash in and out.
        </FluxInfo>

        <FluxBackToTop/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBackToTop, FluxFlex, FluxInfo, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { useScrollPosition } from '@basmilius/common';
    import { ref, useTemplateRef } from 'vue';

    const key = ref(0);
    const scrollerRef = useTemplateRef<HTMLElement>('scroller');

    const {y} = useScrollPosition(scrollerRef);
</script>

<style scoped>
    .scroller {
        overflow-y: auto;
        height: 150px;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .tall {
        display: flex;
        height: 900px;
        padding: 21px;
        align-items: flex-start;
    }
</style>
