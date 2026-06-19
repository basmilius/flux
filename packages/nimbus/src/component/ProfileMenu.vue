<template>
    <FluxFlyout :width="252">
        <template #opener="{toggle}">
            <FluxAvatar
                data-tour="profile"
                :fallback-initials="user?.initials ?? 'NS'"
                :size="36"
                @click="toggle()"/>
        </template>

        <template #default="{close}">
            <FluxWindow style="min-width: 240px">
                <template #default="{navigate}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxPersona
                                :avatar-fallback-initials="user?.initials ?? 'NS'"
                                :avatar-size="48"
                                :name="user?.name ?? 'Account'"
                                style="pointer-events: none"
                                title="Studio owner"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="user"
                                label="My profile"
                                type="route"
                                :to="{name: 'team-member', params: {id: user?.id ?? 'm1'}}"
                                @click="close()"/>
                            <FluxMenuItem
                                icon-leading="circle-question"
                                label="Take a tour"
                                @click="startTour(); close();"/>
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
    import { resetData, useTeamStore, useUiStore } from '@/store';

    const {darkMode, startTour} = useUiStore();
    const {members} = useTeamStore();

    const user = computed(() => members.value[0]);

    const themeIndex = computed<number>({
        get: () => darkMode.value ? 1 : 0,
        set: value => {
            darkMode.value = value === 1;
        }
    });

    async function onReset(): Promise<void> {
        const confirmed = await showConfirm({
            title: 'Reset demo data',
            message: 'This restores all projects, tasks, invoices and deals to their initial state. Any edits will be lost.',
            icon: 'arrows-rotate'
        });

        if (confirmed) {
            resetData();
            await showSnackbar({
                color: 'success',
                icon: 'circle-check',
                message: 'Demo data has been reset.'
            });
        }
    }

    function onSignOut(): void {
        showSnackbar({
            icon: 'circle-info',
            message: 'This is a demo — sign out is not available.'
        });
    }
</script>
