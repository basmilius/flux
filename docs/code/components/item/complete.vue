<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItemStack>
                <FluxItem
                    v-for="member in members"
                    :key="member.name">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxAvatar
                            :alt="member.name"
                            fallback-icon="user"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ member.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ member.role }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxAction
                            icon="pen"
                            aria-label="Edit"/>
                        <FluxAction
                            is-destructive
                            icon="trash"
                            aria-label="Remove"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxAvatar, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const members = [
        {name: 'Bas Milius', role: 'Engineer'},
        {name: 'Jane Doe', role: 'Designer'},
        {name: 'John Doe', role: 'Product manager'}
    ];
</script>
