<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxBoxedIcon
                color="info"
                :size="48"
                name="rocket"/>
        </FluxPaneBody>

        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium blanditiis id omnis placeat saepe soluta! Accusantium dolor facilis veritatis! Ab ad autem eaque earum error facere inventore quod sint soluta?
        </FluxPaneBody>

        <FluxSeparator/>

        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium blanditiis id omnis placeat saepe soluta! Accusantium dolor facilis veritatis! Ab ad autem eaque earum error facere inventore quod sint soluta?
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBoxedIcon, FluxPane, FluxPaneBody, FluxSeparator } from '@flux-ui/components';
</script>
