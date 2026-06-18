<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItemStack>
                <FluxItem
                    v-for="option in options"
                    :key="option.key"
                    is-control>
                    <FluxItemContent is-center>
                        <strong>{{ option.label }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ option.description }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxToggle v-model="enabled[option.key]"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { reactive } from 'vue';
    import { FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxPane, FluxToggle } from '@flux-ui/components';

    const enabled = reactive<Record<string, boolean>>({
        marketing: true,
        product: false,
        security: true
    });

    const options = [
        {key: 'marketing', label: 'Marketing emails', description: 'News, offers and product announcements.'},
        {key: 'product', label: 'Product updates', description: 'Release notes and changelogs.'},
        {key: 'security', label: 'Security alerts', description: 'Important notices about your account.'}
    ];
</script>
