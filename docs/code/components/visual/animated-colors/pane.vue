<template>
    <FluxPane
        tag="New"
        style="max-width: 360px; contain: paint">
        <FluxAspectRatio :aspect-ratio="21 / 9">
            <FluxAnimatedColors
                :colors="['#d37709', '#d32475', '#6615de']"
                :incrementor=".5"
                :opacity="1"
                :seed="130496"/>
        </FluxAspectRatio>

        <FluxPaneHeader title="Manage even more"/>

        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet assumenda beatae commodi culpa fugit laboriosam nihil quasi quibusdam veniam! Cumque et fuga iste maxime officiis quas ratione repudiandae suscipit!
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxSecondaryButton
                icon-leading="gear"
                label="Manage"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAnimatedColors, FluxAspectRatio, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
</script>
