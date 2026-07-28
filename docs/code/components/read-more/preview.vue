<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                subtitle="Release 4.2.0"
                title="What's new"/>

            <FluxPaneBody>
                <FluxReadMore>
                    The table now resolves a cell's column by accumulating colspans, so grouped headers line up with their data again. Sorting keeps its state when rows are replaced, and the sticky header no longer jumps while a filter is applied. The color tokens were rebuilt around light-dark(), which means every surface, intent and palette stop now resolves once instead of twice. Components that painted their own background pick up the new surface automatically, and the contrast contract runs on every build.
                </FluxReadMore>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxReadMore } from '@flux-ui/components';
</script>
