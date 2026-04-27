<template>
    <FluxPane>
        <FluxPaneBody>
            <p>Currently displaying page <strong>{{ page }}</strong>.</p>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxPagination
                arrows
                is-compact
                :total="200"
                :page="page"
                :per-page="10"
                @navigate="page = $event"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPagination, FluxPane, FluxPaneBody, FluxPaneFooter } from '@flux-ui/components';
    import { ref } from 'vue';

    const page = ref(1);
</script>
