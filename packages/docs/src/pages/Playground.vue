<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview v-if="false">
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
                    <flux-aspect-ratio :aspect-ratio="16 / 9">
                        <flux-animated-colors
                            :colors="['#6071b5', '#f07db7', '#0284c7']"
                            :incrementor=".5"
                            :opacity="1"
                            :seed="130496"/>
                    </flux-aspect-ratio>
                </flux-pane>
            </preview>

            <preview>
                <flux-pane style="width: 360px">
                    <flux-gridlines :size="30">
                        <flux-aspect-ratio :aspect-ratio="21 / 9"/>
                    </flux-gridlines>
                </flux-pane>
            </preview>

            <preview>
                <flux-pane style="width: 360px">
                    <flux-pane-illustration
                        :animated-colors="['#6071b5', '#f07db7', '#0284c7']"
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
                        :animated-colors="['#6071b5', '#f07db7', '#0284c7']"
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
    import { FluxAnimatedColors, FluxAspectRatio, FluxGridlines, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPaneIllustration, FluxProgressBar, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
