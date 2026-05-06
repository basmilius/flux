<template>
    <Preview>
        <FluxPane style="width: 100%">
            <FluxPaneBody>
                <FluxFlex :gap="9">
                    <PreviewColumn>Fixed</PreviewColumn>

                    <FluxFlexItem :grow="1">
                        <PreviewColumn>Grows</PreviewColumn>
                    </FluxFlexItem>

                    <PreviewColumn>Fixed</PreviewColumn>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxFlexItem, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
