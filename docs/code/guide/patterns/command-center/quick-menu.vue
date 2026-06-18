<template>
    <FluxPane style="width: 261px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="plus"
                    command="⌘N"
                    label="New project"
                    @click="run('New project')"/>

                <FluxMenuItem
                    icon-leading="user-plus"
                    command="⌘I"
                    label="Invite teammate"
                    @click="run('Invite teammate')"/>

                <FluxMenuItem
                    icon-leading="rocket"
                    command="⌘D"
                    label="Deploy"
                    @click="run('Deploy')"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuSubHeader label="Quick toggles"/>

                <FluxMenuPane>
                    <FluxFlex
                        direction="vertical"
                        :gap="9">
                        <FluxFlex
                            align="center"
                            :gap="12">
                            <FluxIcon name="bell"/>
                            <span>Notifications</span>
                            <FluxSpacer/>
                            <FluxToggle v-model="notifications"/>
                        </FluxFlex>

                        <FluxFlex
                            align="center"
                            :gap="12">
                            <FluxIcon name="moon"/>
                            <span>Dark mode</span>
                            <FluxSpacer/>
                            <FluxToggle v-model="darkMode"/>
                        </FluxFlex>
                    </FluxFlex>
                </FluxMenuPane>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"
                    @click="run('Settings')">
                    <template #after>
                        <FluxBadge
                            color="primary"
                            label="3"/>
                    </template>
                </FluxMenuItem>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxFlex, FluxIcon, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxMenuSubHeader, FluxPane, FluxSeparator, FluxSpacer, FluxToggle, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const notifications = ref(true);
    const darkMode = ref(false);

    const run = (label: string) => showSnackbar({
        icon: 'circle-check',
        message: `Ran: ${label}`
    });
</script>
