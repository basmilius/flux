<template>
    <FluxPane>
        <FluxAspectRatio :aspect-ratio="21/9">
            <FluxFader>
                <FluxFaderItem>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                        alt="">
                </FluxFaderItem>

                <FluxFaderItem>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"
                        alt="">
                </FluxFaderItem>
            </FluxFader>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxFader, FluxFaderItem, FluxPane } from '@fancee/flux';
</script>
