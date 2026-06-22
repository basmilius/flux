<template>
    <FluxFlyout :width="252">
        <template #opener="{toggle}">
            <FluxAvatar
                :fallback-initials="account.initials"
                :size="36"
                is-clickable
                @click="toggle()"/>
        </template>

        <template #default="{close}">
            <FluxWindow style="min-width: 240px">
                <template #default="{navigate}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxPersona
                                :avatar-fallback-initials="account.initials"
                                :avatar-size="48"
                                :name="account.name"
                                style="pointer-events: none"
                                :title="account.email"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                command-icon="angle-right"
                                icon-leading="globe"
                                label="Switch property"
                                @click="navigate('property')"/>
                            <FluxMenuItem
                                icon-leading="gear"
                                label="Settings"
                                type="route"
                                :to="{name: 'settings'}"
                                @click="close()"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                command-icon="angle-right"
                                icon-leading="palette"
                                label="Appearance"
                                @click="navigate('theme')"/>
                            <FluxMenuItem
                                icon-leading="arrows-rotate"
                                label="Reset demo data"
                                @click="onReset()"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="arrow-right-from-bracket"
                                is-destructive
                                label="Sign out"
                                @click="onSignOut()"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>

                <template #property="{back}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="arrow-left"
                                label="Back"
                                @click="back()"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                v-for="property of properties"
                                :key="property"
                                :icon-leading="property === account.property ? 'circle-check' : 'globe'"
                                :label="property"
                                @click="onSwitchProperty(property)"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>

                <template #theme="{back}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="arrow-left"
                                label="Back"
                                @click="back()"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuOptions
                            v-model="themeIndex"
                            mode="select">
                            <FluxMenuItem
                                icon-leading="sun"
                                label="Light"/>
                            <FluxMenuItem
                                icon-leading="moon"
                                label="Dark"/>
                        </FluxMenuOptions>
                    </FluxMenu>
                </template>
            </FluxWindow>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuOptions, FluxPersona, FluxSeparator, FluxWindow, showConfirm, showSnackbar } from '@flux-ui/components';
    import { computed } from 'vue';
    import { resetData, useAnalyticsStore, useUiStore } from '@/store';

    const {darkMode} = useUiStore();
    const {account} = useAnalyticsStore();

    const properties = ['app.pulse.io', 'marketing.pulse.io', 'docs.pulse.io'];

    const themeIndex = computed<number>({
        get: () => darkMode.value ? 1 : 0,
        set: value => {
            darkMode.value = value === 1;
        }
    });

    function onSwitchProperty(property: string): void {
        showSnackbar({icon: 'globe', message: `Switching properties is not available in this demo (${property}).`});
    }

    async function onReset(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'arrows-rotate',
            title: 'Reset demo data',
            message: 'This regenerates the full analytics data set from its initial seed. Any changes will be lost.'
        });

        if (confirmed) {
            resetData();
            await showSnackbar({color: 'success', icon: 'circle-check', message: 'Demo data has been reset.'});
        }
    }

    function onSignOut(): void {
        showSnackbar({icon: 'circle-info', message: 'This is a demo — sign out is not available.'});
    }
</script>
