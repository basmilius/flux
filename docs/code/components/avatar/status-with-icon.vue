<template>
    <FluxFlex
        align="center"
        :gap="18"
        justify="center"
        wrap="wrap">
        <FluxAvatar
            alt="Bas"
            :size="48"
            src="https://avatars.githubusercontent.com/u/978257?v=4"
            status="success"
            status-icon="circle-check"/>

        <FluxAvatar
            alt="Julian"
            fallback-initials="JS"
            :size="48"
            status="warning"
            status-icon="moon"/>

        <FluxAvatar
            alt="Lotte"
            fallback-initials="LV"
            :size="48"
            status="danger"
            status-icon="circle-minus"/>

        <FluxAvatar
            alt="Sara"
            fallback-initials="SD"
            :size="48"
            status="info"
            status-icon="phone"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxFlex } from '@flux-ui/components';
</script>
