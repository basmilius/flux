<template>
    <FluxAspectRatio
        :aspect-ratio="16 / 9"
        style="width: 100%; position: relative;">
        <FluxFader :interval="9999999">
            <template #default="{next, previous}">
                <FluxFaderItem>
                    <img
                        src="/assets/demo/image-1.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="/assets/demo/image-2.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="/assets/demo/image-3.jpg"
                        alt="">
                </FluxFaderItem>

                <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 9px">
                    <FluxSecondaryButton
                        icon-leading="angle-left"
                        @click="previous"/>

                    <FluxSecondaryButton
                        icon-leading="angle-right"
                        @click="next"/>
                </div>
            </template>
        </FluxFader>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxSecondaryButton } from '@flux-ui/components';
</script>
