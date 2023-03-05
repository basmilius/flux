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

        <section>
            <p>
                Faders are used to fade between multiple items using a particular interval. They can be used in
                headers to fade between multiple image slides.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>interval</code><code>number</code></td>
                        <td>The interval between each fade.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>update</code><code>(index: number): void;</code></td>
                        <td>Triggered when the Fader fades to another item.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                Simple fader that fades between three images each 9 seconds.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/fader/basic.vue';
    import basicCode from '@/code/components/fader/basic.vue?raw';
</script>
