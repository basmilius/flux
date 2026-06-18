<template>
    <Preview>
        <FluxFlex
            align="start"
            :gap="18">
            <FluxPane style="width: 330px; flex-shrink: 0">
                <FluxDatePicker v-model="date"/>
            </FluxPane>

            <FluxLayerPane style="flex-grow: 1">
                <FluxLayerPaneSecondary>{{ date.toFormat('cccc d LLLL') }}</FluxLayerPaneSecondary>

                <FluxPane>
                    <FluxItemStack>
                        <FluxItem
                            v-for="entry in agenda"
                            :key="entry.id">
                            <FluxItemMedia
                                is-center
                                :size="40">
                                <FluxBoxedIcon
                                    :color="entry.color"
                                    :name="entry.icon"
                                    :size="40"/>
                            </FluxItemMedia>

                            <FluxItemContent is-center>
                                <strong>{{ entry.title }}</strong>
                                <span style="font-size: .875rem; opacity: .6">{{ entry.time }}</span>
                            </FluxItemContent>
                        </FluxItem>
                    </FluxItemStack>
                </FluxPane>
            </FluxLayerPane>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon, FluxDatePicker, FluxFlex, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxLayerPaneSecondary, FluxPane } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now());

    const agenda: { id: number; title: string; time: string; icon: FluxIconName; color: FluxColor }[] = [
        {id: 1, title: 'Daily stand-up', time: '09:00 – 09:15', icon: 'users', color: 'primary'},
        {id: 2, title: 'Design review', time: '11:00 – 12:00', icon: 'palette', color: 'info'},
        {id: 3, title: 'Sprint demo', time: '15:00 – 16:00', icon: 'rocket', color: 'success'}
    ];
</script>
