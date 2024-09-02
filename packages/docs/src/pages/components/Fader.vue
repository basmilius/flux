<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Fader"/>

        <Preview>
            <FluxPane>
                <FluxAspectRatio :aspect-ratio="16/9">
                    <FluxFader :interval="2000">
                        <FluxFaderItem>
                            <img
                                src="/images/1.jpg"
                                alt="">
                        </FluxFaderItem>

                        <FluxFaderItem>
                            <img
                                src="/images/3.jpg"
                                alt="">
                        </FluxFaderItem>

                        <FluxFaderItem>
                            <img
                                src="/images/5.jpg"
                                alt="">
                        </FluxFaderItem>
                    </FluxFader>
                </FluxAspectRatio>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Faders are used to fade between multiple items using a particular interval. They can be used in
                headers to fade between multiple image slides.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxFader</code></td>
                    <td>The fader itself.</td>
                </tr>
                <tr>
                    <td><code>FluxFaderItem</code></td>
                    <td>A single slide within the fader.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Fader">
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
            </ApiComponent>

            <ApiComponent name="FaderItem">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the FluxFaderItem.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Simple fader that fades between three images each 9 seconds."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/fader/basic.vue';
    import basicCode from '@/code/components/fader/basic.vue?raw';
</script>
