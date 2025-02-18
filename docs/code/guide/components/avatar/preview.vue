<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="18"
            is-centered
            is-wrapping>
            <FluxAvatar
                alt="Bas"
                :size="42"
                status="success"
                url="https://avatars.githubusercontent.com/u/978257?v=4"/>

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
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxStack } from '@basmilius/flux';
</script>
