<template>
    <Preview>
        <FluxDropZone style="display: inline-flex; --dz-radius: calc(96px * 0.3)">
            <FluxAvatar
                :size="96"
                fallback-initials="JD"/>
        </FluxDropZone>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxDropZone } from '@flux-ui/components';
</script>
