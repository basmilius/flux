<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="moon"
                    label="Night shift"/>

                <FluxMenuFlyout
                    icon="sun"
                    label="Brightness">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxFormSlider
                                v-model="brightness"
                                aria-label="Brightness"
                                is-ticks-visible/>
                        </FluxMenuPane>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSlider, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const brightness = ref(60);
</script>
