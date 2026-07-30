<template>
    <FluxFlex direction="vertical">
        <FluxInfo color="warning">
            <strong>What to look for.</strong>
            The expandable group registers its children by <code>useId()</code> now, where it used the instance uid before. Opening one item must close the other, which only works when registration and unregistration agree on the key.
        </FluxInfo>

        <FluxGrid :columns="2">
            <FluxPane>
                <FluxPaneHeader title="Expandable group"/>
                <FluxPaneBody>
                    <FluxExpandableGroup>
                        <FluxExpandable
                            v-for="index of 3"
                            :key="index"
                            :title="`Item ${index}`">
                            Opening this one must collapse the other two.
                        </FluxExpandable>
                    </FluxExpandableGroup>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader title="Animated colors (seeded from the id)"/>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="9">
                        <div class="canvas-host">
                            <FluxVisualAnimatedColors :colors="['#6366f1', '#ec4899', '#14b8a6']"/>
                        </div>
                        <span>Must paint and animate. The pattern differs from v3 because the seed is a hash of the id now.</span>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxGrid>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxExpandableGroup, FluxFlex, FluxGrid, FluxInfo, FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';
    import { FluxVisualAnimatedColors } from '@flux-ui/visuals';
</script>

<style scoped>
    .canvas-host {
        position: relative;
        overflow: hidden;
        height: 150px;
        border-radius: var(--radius);
    }
</style>
