<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Container"/>

        <preview>
            <flux-grid style="width: 100%">
                <flux-grid-column
                    v-for="i in [1, 2, 3]"
                    :md="i === 2 ? 6 : 3">
                    <flux-pane style="padding: 3px 6px;">
                        Col{{ i }}
                    </flux-pane>
                </flux-grid-column>
            </flux-grid>
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
    import { FluxGrid, FluxGridColumn, FluxPane, FluxStack, heightTransition } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';

    const vHeightTransition = heightTransition;
</script>
