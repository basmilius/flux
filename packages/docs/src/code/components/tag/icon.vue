<template>
    <FluxTagStack>
        <FluxTag
            color="success"
            icon="circle-check"
            label="Complete"/>

        <FluxTag
            color="warning"
            icon="circle-exclamation"
            label="Missing payment details"/>
    </FluxTagStack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxTag,
        FluxTagStack
    } from '@basmilius/flux';
</script>
