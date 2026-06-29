<template>
    <FluxAvatarGroup
        :max="3"
        :size="40"
        aria-label="Project members">
        <FluxAvatar
            alt="Mary Berry"
            fallback-initials="MB"/>
        <FluxAvatar
            alt="Paul Hollywood"
            fallback-initials="PH"/>
        <FluxAvatar
            alt="Prue Leith"
            fallback-initials="PL"/>
        <FluxAvatar
            alt="Noel Fielding"
            fallback-initials="NF"/>
        <FluxAvatar
            alt="Sandi Toksvig"
            fallback-initials="ST"/>
        <FluxAvatar
            alt="Matt Lucas"
            fallback-initials="ML"/>
    </FluxAvatarGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxAvatarGroup } from '@flux-ui/components';
</script>
