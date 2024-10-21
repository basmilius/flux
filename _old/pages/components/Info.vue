<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Info"/>

        <Preview>
            <FluxPane style="width: 360px">
                <FluxPaneBody>
                    <FluxInfoStack>
                        <FluxInfo icon="location-dot">
                            Voltastraat 20<br/>
                            7006 RV Doetinchem<br/>
                            Nederland
                        </FluxInfo>

                        <FluxInfo icon="circle-exclamation">
                            Accessible for people with the age of 16 or higher. We don't provide refunds when you're not allowed to enter.
                        </FluxInfo>
                    </FluxInfoStack>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                <em>Todo</em>
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxInfo</code></td>
                    <td>The info component itself. Provides an icon and default slot for content.</td>
                </tr>
                <tr>
                    <td><code>FluxInfoStack</code></td>
                    <td>A stack for FluxInfo components.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Info">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The prefix icon to use.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the info item.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxInfo, FluxInfoStack, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
