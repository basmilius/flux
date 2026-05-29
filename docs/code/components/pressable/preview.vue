<template>
    <Preview>
        <FluxFlex :gap="18">
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
                target="_blank"
                rel="noopener noreferrer">
                <FluxPane>
                    <FluxPaneBody>
                        External link
                    </FluxPaneBody>
                </FluxPane>
            </FluxPressable>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxPaneBody, FluxPressable } from '@flux-ui/components';
    import { ref } from 'vue';

    const clicks = ref(0);
</script>
