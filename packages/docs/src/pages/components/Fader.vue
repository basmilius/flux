<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Fader"/>

        <preview>
            <flux-pane>
                <flux-aspect-ratio :aspect-ratio="16/9">
                    <flux-fader :interval="2000">
                        <flux-fader-item>
                            <img
                                src="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"
                                alt="">
                        </flux-fader-item>
                        <flux-fader-item>
                            <img
                                src="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                                alt="">
                        </flux-fader-item>
                        <flux-fader-item>
                            <img
                                src="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"
                                alt="">
                        </flux-fader-item>
                    </flux-fader>
                </flux-aspect-ratio>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Faders are used to fade between multiple items using a particular interval. They can be used in
                headers to fade between multiple image slides.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxFader</code></td>
                    <td>The fader itself.</td>
                </tr>
                <tr>
                    <td><code>FluxFaderItem</code></td>
                    <td>A single slide within the fader.</td>
                </tr>
            </api-components>

            <api-component name="Fader">
                <template #props>
                    <tr>
                        <td><code>interval</code><code>number</code></td>
                        <td>The interval between each fade.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update</code><code>(index: number): void;</code></td>
                        <td>Triggered when the Fader fades to another item.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The items within the FluxFader.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="FaderItem">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the FluxFaderItem.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Simple fader that fades between three images each 9 seconds."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/fader/basic.vue';
    import basicCode from '@/code/components/fader/basic.vue?raw';
</script>
