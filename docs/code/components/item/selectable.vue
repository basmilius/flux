<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItemStack>
                <FluxItem
                    v-for="member in members"
                    :key="member.key">
                    <FluxItemMedia is-center>
                        <FluxFormCheckbox v-model="selected[member.key]"/>
                    </FluxItemMedia>

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
                        <span style="font-size: .875rem; opacity: .6">{{ member.email }}</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { reactive } from 'vue';
    import { FluxAvatar, FluxFormCheckbox, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const selected = reactive<Record<string, boolean>>({
        bas: true,
        jane: false,
        john: true
    });

    const members = [
        {key: 'bas', name: 'Bas Milius', email: 'bas@example.com'},
        {key: 'jane', name: 'Jane Doe', email: 'jane@example.com'},
        {key: 'john', name: 'John Doe', email: 'john@example.com'}
    ];
</script>
