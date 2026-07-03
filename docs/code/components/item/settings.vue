<template>
    <FluxPane style="width: min(100%, 480px)">
        <FluxItemStack>
            <FluxItem
                v-for="setting in items"
                :key="setting.key">
                <FluxItemContent>
                    <strong>{{ setting.label }}</strong>
                    <span style="font-size: .875rem; opacity: .6">{{ setting.description }}</span>
                </FluxItemContent>

                <FluxItemActions is-center>
                    <FluxToggle v-model="settings[setting.key]"/>
                </FluxItemActions>
            </FluxItem>
        </FluxItemStack>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { reactive } from 'vue';
    import { FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxPane, FluxToggle } from '@flux-ui/components';

    const settings = reactive<Record<string, boolean>>({
        push: true,
        email: false,
        twoFactor: true
    });

    const items = [
        {key: 'push', label: 'Push notifications', description: 'Receive alerts on your devices.'},
        {key: 'email', label: 'Email digest', description: 'A weekly summary in your inbox.'},
        {key: 'twoFactor', label: 'Two-factor authentication', description: 'Add an extra layer of security.'}
    ];
</script>
