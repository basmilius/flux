<template>
    <Preview>
        <FluxAspectRatio
            :aspect-ratio="16 / 9"
            style="width: 100%;">
            <FluxFader :interval="3000">
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

                <FluxFaderItem>
                    <img
                        src="/assets/demo/image-4.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="/assets/demo/image-5.jpg"
                        alt="">
                </FluxFaderItem>
            </FluxFader>
        </FluxAspectRatio>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem } from '@basmilius/flux';
</script>
