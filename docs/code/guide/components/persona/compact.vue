<template>
    <FluxPane style="max-width: max-content">
        <FluxPaneBody>
            <FluxPersona
                is-compact
                name="Bas Milius"
                title="Flux engineer"
                :avatar-size="42"
                avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPersona } from '@flux-ui/components';
</script>
