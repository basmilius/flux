<template>
    <flux-pane>
        <flux-aspect-ratio :aspect-ratio="21/9">
            <flux-fader>
                <flux-fader-item>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"
                        alt="">
                </flux-fader-item>
                <flux-fader-item>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                        alt="">
                </flux-fader-item>
                <flux-fader-item>
                    <img
                        src="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"
                        alt="">
                </flux-fader-item>
            </flux-fader>
        </flux-aspect-ratio>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxAspectRatio,
        FluxFader,
        FluxFaderItem,
        FluxPane
    } from '@fancee/flux';
</script>
