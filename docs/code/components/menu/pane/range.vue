<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="arrow-down-a-z"
                    label="Sort"/>

                <FluxMenuFlyout
                    icon="money-bill"
                    label="Price range">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxFormRangeSlider
                                v-model="price"
                                is-ticks-visible
                                :max="1000"
                                :min="0"
                                :step="50"/>
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
    import { FluxFormRangeSlider, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const price = ref<[number, number]>([200, 800]);
</script>
