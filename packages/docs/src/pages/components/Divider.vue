<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Divider"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                    <FluxDivider/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere minus perspiciatis quae quisquam. Consequuntur corporis dicta, dolorum maiores, molestiae nemo officia quae quaerat quibusdam quo ratione vel veritatis voluptas voluptatibus.</p>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A horizontal line.
            </p>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDivider, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiSection, PageTitle, Preview } from '@/components';
</script>
