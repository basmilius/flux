<template>
    <FluxApplicationMenuAccount
        label="Bas Milius"
        image-alt="Bas Milius"
        image-src="https://avatars.githubusercontent.com/u/978257?v=4">
        <template #switcher>
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="user"
                    label="Profile"/>

                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"/>

                <FluxMenuItem
                    icon-leading="arrow-right-from-bracket"
                    label="Sign out"/>
            </FluxMenu>
        </template>
    </FluxApplicationMenuAccount>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationMenuAccount } from '@flux-ui/application';
    import { FluxMenu, FluxMenuItem } from '@flux-ui/components';
</script>
