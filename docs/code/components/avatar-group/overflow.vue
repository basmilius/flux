<template>
    <FluxAvatarGroup
        :max="3"
        :size="40">
        <FluxAvatar fallback-initials="BM"/>
        <FluxAvatar fallback-initials="JD"/>
        <FluxAvatar fallback-initials="AS"/>
        <FluxAvatar fallback-initials="KL"/>
        <FluxAvatar fallback-initials="MN"/>
        <FluxAvatar fallback-initials="PQ"/>
    </FluxAvatarGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxAvatarGroup } from '@flux-ui/components';
</script>
