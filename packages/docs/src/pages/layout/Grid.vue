<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-grid :gap="21">
                        <flux-grid-column
                            v-for="i in [1, 2, 3]"
                            :md="i === 2 ? 6 : 3">
                            <div class="column-example"/>
                        </flux-grid-column>
                    </flux-grid>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                Grid description.
            </p>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
