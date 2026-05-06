<template>
    <Preview>
        <FluxAspectRatio
            :aspect-ratio="16 / 9"
            style="width: 100%; max-width: 480px; background: var(--surface-active); border-radius: var(--radius); overflow: hidden">
            <FluxFlex
                align="center"
                justify="center"
                style="height: 100%">
                <FluxIcon
                    name="play"
                    :size="48"/>
            </FluxFlex>
        </FluxAspectRatio>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAspectRatio, FluxFlex, FluxIcon } from '@flux-ui/components';
</script>
