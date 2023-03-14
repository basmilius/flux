<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane style="width: 75%">
                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage1"
                            arrows
                            :pages="10"
                            :visible="7"/>
                    </flux-pane-body>
                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage2"
                            arrows
                            :pages="5"/>
                    </flux-pane-body>
                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage3"
                            arrows
                            :pages="10"/>
                    </flux-pane-body>
                </flux-pane>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPipsPager, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const pipsPagerPage1 = ref(3);
    const pipsPagerPage2 = ref(3);
    const pipsPagerPage3 = ref(3);
</script>
