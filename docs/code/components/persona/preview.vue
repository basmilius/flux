<template>
    <Preview>
        <FluxPane style="max-width: max-content">
            <FluxPaneBody>
                <FluxStack
                    :gap="10"
                    direction="horizontal">
                    <FluxPersona
                        name="Bas Milius"
                        title="Flux engineer"
                        :avatar-size="42"
                        avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"/>

                    <FluxPersona
                        is-compact
                        name="Bas Milius"
                        title="Flux engineer"
                        :avatar-size="42"
                        avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                </FluxStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPersona, FluxStack } from '@flux-ui/components';
</script>
