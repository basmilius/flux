<template>
    <FluxBorderShine
        :colors="['transparent', 'transparent', 'transparent', '#2563eb', 'transparent', 'transparent', 'transparent']"
        :duration="12"
        :width="1">
        <Preview>
            <FluxBorderShine
                :colors="['transparent', 'transparent', 'transparent', '#10b981', 'transparent', 'transparent', 'transparent']"
                :duration="3"
                :width="1">
                <FluxSecondaryButton
                    icon-leading="circle-arrow-up"
                    label="Upgrade now"/>
            </FluxBorderShine>
        </Preview>
    </FluxBorderShine>
</template>

<script
    lang="ts"
    setup>
    import { FluxBorderShine, FluxSecondaryButton } from '@flux-ui/flux';
</script>
