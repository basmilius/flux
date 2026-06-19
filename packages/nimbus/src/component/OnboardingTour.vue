<template>
    <FluxTour
        v-model:active="tourActive"
        @finish="finishTour"
        @skip="finishTour">
        <FluxTourItem
            position="right"
            target="[data-tour=menu]"
            title="Find your way around">
            Browse projects, clients, invoices, the sales pipeline and more from the sidebar.
        </FluxTourItem>

        <FluxTourItem
            position="bottom"
            target="[data-tour=search]"
            title="Command palette">
            Press ⌘K anywhere to jump to a page, project, client or run a quick action.
        </FluxTourItem>

        <FluxTourItem
            position="bottom"
            target="[data-tour=notifications]"
            title="Stay in the loop">
            Mentions, task assignments and invoice updates land here in your inbox.
        </FluxTourItem>

        <FluxTourItem
            position="bottom-left"
            target="[data-tour=profile]"
            title="Make it yours">
            Toggle dark mode or reset the demo data from your profile. Everything lives in memory — a reload starts fresh.
        </FluxTourItem>
    </FluxTour>
</template>

<script
    lang="ts"
    setup>
    import { FluxTour, FluxTourItem } from '@flux-ui/components';
    import { useUiStore } from '@/store';

    const {tourActive, finishTour} = useUiStore();
</script>
