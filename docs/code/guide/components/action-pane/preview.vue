<template>
    <Preview>
        <FluxActionPane>
            <p>
                <strong>Premium</strong> &mdash; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias at beatae exercitationem explicabo fugiat laborum libero magnam nulla odio, officia quaerat similique, totam ullam voluptate! Ad eaque iste voluptatibus.
            </p>

            <template #buttons>
                <FluxPrimaryButton label="Upgrade now"/>
                <FluxSecondaryButton label="Dismiss"/>
            </template>
        </FluxActionPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionPane, FluxPrimaryButton, FluxSecondaryButton } from '@basmilius/flux';
</script>
