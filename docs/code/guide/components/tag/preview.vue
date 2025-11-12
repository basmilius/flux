<template>
    <Preview>
        <FluxTagStack>
            <FluxTag
                label="Tag"/>

            <FluxTag
                dot
                color="danger"
                label="Tag"/>

            <FluxTag
                icon="check-circle"
                color="success"
                label="Tag"/>

            <FluxTag
                is-loading
                label="Tag"/>

            <FluxTag
                is-deletable
                label="Tag"/>
        </FluxTagStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxTag, FluxTagStack } from '@flux-ui/components';
</script>
