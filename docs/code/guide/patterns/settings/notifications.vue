<template>
    <Preview>
        <FluxPane style="width: min(100%, 540px)">
            <FluxPaneHeader title="Notifications"/>

            <FluxItemStack>
                <FluxItem
                    v-for="setting in settings"
                    :key="setting.key"
                    is-control>
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :color="setting.color"
                            :name="setting.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ setting.label }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ setting.description }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxToggle v-model="enabled[setting.key]"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneHeader, FluxToggle } from '@flux-ui/components';
    import { reactive } from 'vue';

    const enabled = reactive<Record<string, boolean>>({
        mentions: true,
        comments: true,
        digest: false,
        security: true
    });

    const settings: { key: string; label: string; description: string; icon: FluxIconName; color: FluxColor }[] = [
        {key: 'mentions', label: 'Mentions', description: 'When someone @mentions you.', icon: 'bell', color: 'primary'},
        {key: 'comments', label: 'Comments', description: 'Replies on threads you follow.', icon: 'message', color: 'info'},
        {key: 'digest', label: 'Weekly digest', description: 'A summary in your inbox every Monday.', icon: 'calendar', color: 'success'},
        {key: 'security', label: 'Security alerts', description: 'Important notices about your account.', icon: 'lock', color: 'warning'}
    ];
</script>
