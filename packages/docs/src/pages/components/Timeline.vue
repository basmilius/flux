<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Timeline"/>

        <Preview>
            <FluxPane style="width: 480px">
                <FluxPaneBody>
                    <FluxTimeline>
                        <FluxTimelineItem
                            icon="star"
                            title="Timeline component"
                            when="13 maart 2023 13:00">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci commodi debitis dolor dolores, ducimus facere, fugit id impedit ipsam mollitia nam nobis reiciendis temporibus vero. Accusamus in repellat voluptatibus.</p>
                        </FluxTimelineItem>

                        <FluxTimelineItem
                            color="danger"
                            icon="trash"
                            photo="/images/bas.jpg">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid illum quaerat ratione voluptates? Atque consequatur cupiditate ducimus enim nam necessitatibus quibusdam quos! Amet cupiditate dicta maiores natus quae sint?</p>
                        </FluxTimelineItem>
                    </FluxTimeline>
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
                    <td><code>FluxTimeline</code></td>
                    <td>The timeline itself. Should always be used as a parent of FluxTimelineItem.</td>
                </tr>
                <tr>
                    <td><code>FluxTimelineItem</code></td>
                    <td>A single item of the FluxTimeline.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Timeline">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the timeline.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="TimelineItem">
                <template #props>
                    <tr>
                        <td><code>color</code><code>'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color of the timeline item. Gray is used when this prop is omitted.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon used for the timeline item.</td>
                    </tr>
                    <tr>
                        <td><code>photo</code><code>string</code></td>
                        <td>A photo url to be used within the timeline item.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>A title for the timeline item.</td>
                    </tr>
                    <tr>
                        <td><code>when</code><code>string</code></td>
                        <td>When the timeline item happened.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the timeline item.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxStack, FluxTimeline, FluxTimelineItem } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
