<template>
    <Preview>
        <FluxPane style="width: min(100%, 420px)">
            <FluxItemStack>
                <FluxItem
                    v-for="person in people"
                    :key="person.name">
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxAvatar
                            :alt="person.name"
                            :fallback-icon="person.avatar ? undefined : 'user'"
                            :src="person.avatar"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ person.name }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ person.role }}</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';

    const people = [
        {name: 'Bas Milius', role: 'Engineer', avatar: 'https://avatars.githubusercontent.com/u/978257?v=4'},
        {name: 'Jane Doe', role: 'Designer', avatar: null},
        {name: 'John Doe', role: 'Product manager', avatar: null}
    ];
</script>
