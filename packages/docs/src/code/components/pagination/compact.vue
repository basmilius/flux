<template>
    <FluxPane>
        <FluxPaneBody>
            <p>Currently displaying page <strong>{{ page }}</strong>.</p>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSpacer/>

            <FluxPagination
                arrows
                is-compact
                :page="page"
                :per-page="10"
                :total="200"
                @navigate="page = $event"/>

            <FluxSpacer/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPagination, FluxPane, FluxPaneBody, FluxPaneFooter, FluxSpacer } from '@fancee/flux';
    import { ref } from 'vue';

    const page = ref(1);
</script>
