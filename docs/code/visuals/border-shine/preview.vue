<template>
    <FluxVisualBorderShine
        :colors="['transparent', 'transparent', 'transparent', '#2563eb', 'transparent', 'transparent', 'transparent']"
        :duration="12"
        :width="1">
        <Preview>
            <FluxVisualBorderShine
                :colors="['transparent', 'transparent', 'transparent', '#10b981', 'transparent', 'transparent', 'transparent']"
                :duration="3"
                :width="1">
                <FluxSecondaryButton
                    icon-leading="circle-arrow-up"
                    label="Upgrade now"/>
            </FluxVisualBorderShine>
        </Preview>
    </FluxVisualBorderShine>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualBorderShine } from '@flux-ui/visuals';
</script>
