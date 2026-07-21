<template>
    <div style="padding: 15px; background: var(--gray-100); border-radius: var(--radius)">
        <FluxAvatarGroup :max="4">
            <FluxAvatar src="https://i.pravatar.cc/64?img=11"/>
            <FluxAvatar src="https://i.pravatar.cc/64?img=12"/>
            <FluxAvatar fallback-initials="BM"/>
            <FluxAvatar fallback-initials="JD"/>
            <FluxAvatar fallback-initials="AS"/>
            <FluxAvatar fallback-initials="KL"/>
        </FluxAvatarGroup>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxAvatarGroup } from '@flux-ui/components';
</script>
