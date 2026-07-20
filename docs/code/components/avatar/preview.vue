<template>
    <Preview>
        <FluxFlex
            align="center"
            :gap="18"
            justify="center"
            wrap="wrap">
            <FluxAvatar
                alt="Bas"
                :size="42"
                src="https://avatars.githubusercontent.com/u/978257?v=4"
                status="success"/>

            <FluxAvatar
                alt="Bas"
                :size="42"
                src="https://avatars.githubusercontent.com/u/978257?v=4"
                status="success"
                status-icon="circle-check"/>

            <FluxAvatar
                alt="Bas"
                fallback-initials="BM"
                :size="42"
                status="danger"/>

            <FluxAvatar
                alt="Bas"
                fallback="neutral"
                fallback-initials="BM"
                :size="42"/>

            <FluxAvatar
                alt="Bas"
                :size="42"/>

            <FluxAvatar
                alt="Bas"
                fallback="neutral"
                :size="42"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxFlex } from '@flux-ui/components';
</script>
