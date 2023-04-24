<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Divider"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                    <flux-divider/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere minus perspiciatis quae quisquam. Consequuntur corporis dicta, dolorum maiores, molestiae nemo officia quae quaerat quibusdam quo ratione vel veritatis voluptas voluptatibus.</p>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A horizontal line.
            </p>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDivider, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiSection, PageTitle, Preview } from '@/components';
</script>
