<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Info"/>

        <preview>
            <flux-pane style="width: 360px">
                <flux-pane-body>
                    <flux-info-stack>
                        <flux-info icon="location-dot">
                            Voltastraat 20<br/>
                            7006 RV Doetinchem<br/>
                            Nederland
                        </flux-info>
                        <flux-info icon="circle-exclamation">
                            Accessible for people with the age of 16 or higher. We don't provide refunds when you're not allowed to enter.
                        </flux-info>
                    </flux-info-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                <em>Todo</em>
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Components">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>When to use</th>
                    </tr>
                </template>
                <template #body>
                    <tr>
                        <td><code>FluxInfo</code></td>
                        <td>The info component itself. Provides an icon and default slot for content.</td>
                    </tr>
                    <tr>
                        <td><code>FluxInfoStack</code></td>
                        <td>A stack for FluxInfo components.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxInfo">
                <template #body>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The prefix icon to use.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxTimelineItem">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the info item.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxInfo, FluxInfoStack, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
