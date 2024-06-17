<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Feature card"/>

        <Preview>
            <FluxFeatureCard
                style="width: 360px"
                button-icon="circle-arrow-right"
                button-label="Let's go"
                button-to="#"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                icon="circle"
                title="Feature">
                <img
                    src="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                    alt="">
            </FluxFeatureCard>
        </Preview>

        <ApiSection>
            <p>
                A pane that displays a caption and an illustration of a feature.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FeatureCard">
                <template #props>
                    <tr>
                        <td><code>button-icon</code><code>IconNames</code></td>
                        <td>The icon of the button.</td>
                    </tr>
                    <tr>
                        <td><code>button-label</code><code>string</code></td>
                        <td>The label of the button.</td>
                    </tr>
                    <tr>
                        <td><code>button-to</code><code>Location</code></td>
                        <td>The route the button should link to.</td>
                    </tr>
                    <tr>
                        <td><code>description</code><code>string</code></td>
                        <td>The description of the feature.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>Which icon to use in the feature pane.</td>
                    </tr>
                    <tr>
                        <td><code>is-coming-soon</code><code>boolean</code></td>
                        <td>If a coming soon banned should be shown.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>The name of the feature.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Slot used for an illustration.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFeatureCard, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
