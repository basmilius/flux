<template>
    <FluxMasonry :columns="{xs: 1, sm: 2, lg: 4}">
        <FluxPane
            v-for="note of notes"
            :key="note.title">
            <FluxPaneHeader :title="note.title"/>

            <FluxPaneBody>
                {{ note.body }}
            </FluxPaneBody>
        </FluxPane>
    </FluxMasonry>
</template>

<script
    lang="ts"
    setup>
    import { FluxMasonry, FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';

    const notes = [
        {title: 'Groceries', body: 'Coffee, oat milk, sourdough, two lemons and something green.'},
        {title: 'Release 2.4', body: 'Freeze on Friday.'},
        {title: 'Reading list', body: 'Finish the chapter on fragmentation, then the one on containment. Both are shorter than they look, and the second answers most of the questions the first raises.'},
        {title: 'Studio', body: 'Reprint the north wall photo at a larger size and hang it left of the window.'},
        {title: 'Call Mara', body: 'About the lease.'},
        {title: 'Weekend', body: 'Drive out early, take the coast road back and stop at the harbor for lunch.'}
    ];
</script>
