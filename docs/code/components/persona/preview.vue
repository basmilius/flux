<template>
    <Preview>
        <FluxPane style="max-width: max-content">
            <FluxPaneBody>
                <FluxFlex :gap="10">
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
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneBody, FluxPersona } from '@flux-ui/components';
</script>
