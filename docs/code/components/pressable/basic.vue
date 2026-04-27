<template>
    <FluxStack direction="horizontal">
        <FluxPressable
            component-type="button"
            @click="clicks++">
            <FluxPane>
                <FluxPaneBody>
                    Button ({{ clicks }} clicks)
                </FluxPaneBody>
            </FluxPane>
        </FluxPressable>

        <FluxPressable
            component-type="link"
            href="https://flux-ui.dev"
            target="_blank">
            <FluxPane>
                <FluxPaneBody>
                    External link
                </FluxPaneBody>
            </FluxPane>
        </FluxPressable>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPressable, FluxStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const clicks = ref(0);
</script>
