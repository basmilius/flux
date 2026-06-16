<template>
    <Preview>
        <FluxAvatarGroup :max="4">
            <FluxAvatar avatar-src="https://i.pravatar.cc/64?img=1"/>
            <FluxAvatar avatar-src="https://i.pravatar.cc/64?img=2"/>
            <FluxAvatar avatar-src="https://i.pravatar.cc/64?img=3"/>
            <FluxAvatar avatar-src="https://i.pravatar.cc/64?img=4"/>
            <FluxAvatar fallback-initials="BM"/>
            <FluxAvatar fallback-initials="JD"/>
        </FluxAvatarGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxAvatarGroup } from '@flux-ui/components';
</script>
