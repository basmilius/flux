<template>
    <FluxPane>
        <FluxAspectRatio :aspect-ratio="21/9">
            <FluxFader>
                <FluxFaderItem>
                    <img
                        src="/images/1.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="/images/2.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="/images/3.jpg"
                        alt="">
                </FluxFaderItem>
            </FluxFader>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxPane } from '@basmilius/flux';
</script>
