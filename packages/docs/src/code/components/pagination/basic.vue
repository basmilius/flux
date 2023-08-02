<template>
    <flux-pane>
        <flux-pane-body>
            <p>Currently displaying page <strong>{{ page }}</strong>.</p>
        </flux-pane-body>
        <flux-pane-footer>
            <flux-spacer/>

            <flux-pagination
                arrows
                :page="page"
                :per-page="10"
                :total="200"
                @navigate="page = $event"/>

            <flux-spacer/>
        </flux-pane-footer>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxPagination,
        FluxPane,
        FluxPaneBody,
        FluxPaneFooter,
        FluxSpacer
    } from '@fancee/flux';
    import { ref } from 'vue';

    const page = ref(1);
</script>
