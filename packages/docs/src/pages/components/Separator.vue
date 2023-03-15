<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Separator"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                </flux-pane-body>

                <flux-separator/>

                <flux-pane-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere minus perspiciatis quae quisquam. Consequuntur corporis dicta, dolorum maiores, molestiae nemo officia quae quaerat quibusdam quo ratione vel veritatis voluptas voluptatibus.</p>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                The separator component is a visual divider used to separate content on a page. It has the ability to be
                oriented along the x-axis or y-axis, depending on the value of its axis property.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>The direction of the separator.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
