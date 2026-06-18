<template>
    <Preview>
        <FluxPane style="width: min(100%, 520px)">
            <FluxItemStack>
                <FluxItem
                    v-for="app in apps"
                    :key="app.key">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            :color="app.color"
                            :name="app.icon"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ app.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ app.description }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxBadge
                            :color="connected[app.key] ? 'success' : 'gray'"
                            :label="connected[app.key] ? 'Connected' : 'Disconnected'"/>

                        <FluxToggle v-model="connected[app.key]"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { reactive } from 'vue';
    import { FluxBadge, FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxToggle } from '@flux-ui/components';

    const connected = reactive<Record<string, boolean>>({
        github: true,
        slack: true,
        drive: false
    });

    const apps: { key: string; name: string; description: string; icon: FluxIconName; color: FluxColor }[] = [
        {key: 'github', name: 'GitHub', description: 'Sync issues and pull requests.', icon: 'code-branch', color: 'gray'},
        {key: 'slack', name: 'Slack', description: 'Send updates to your channels.', icon: 'message', color: 'primary'},
        {key: 'drive', name: 'Cloud Storage', description: 'Attach files from the cloud.', icon: 'cloud', color: 'info'}
    ];
</script>
