<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane style="width: 420px">
                    <flux-pane-body>
                        <flux-stack :gap="15">
                            <flux-progress-bar
                                :min="0"
                                :max="100"
                                :value="50"/>
                            <flux-progress-bar is-indeterminate/>
                        </flux-stack>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <flux-pane style="width: 360px">
                    <flux-pane-illustration
                        :animated-colors="['#6071b5', '#f07db7', '#ffa600']"
                        :animated-seed="130496"
                        is-masked/>

                    <flux-pane-header title="Pane"/>

                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque dignissimos esse ex illo ipsam ipsum minima molestias nesciunt perferendis. Commodi debitis deserunt dicta laudantium reiciendis saepe ut vel voluptatum.
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <flux-pane style="width: 510px">
                    <flux-pane-illustration
                        :animated-colors="['#6071b5', '#f07db7', '#ffa600']"
                        :animated-seed="130496"/>
                </flux-pane>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneIllustration, FluxProgressBar, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
