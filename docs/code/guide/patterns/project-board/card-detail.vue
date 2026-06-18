<template>
    <Preview>
        <FluxPrimaryButton
            icon-leading="eye"
            label="Open card"
            @click="isOpened = true"/>

        <FluxSlideOver>
            <FluxPane v-if="isOpened">
                <FluxPaneHeader :title="card.title">
                    <FluxSecondaryButton
                        icon-before="xmark"
                        @click="isOpened = false"/>
                </FluxPaneHeader>

                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxFlex
                            align="center"
                            :gap="6">
                            <FluxBadge
                                color="danger"
                                label="High priority"/>

                            <FluxChip
                                icon-leading="code-branch"
                                :label="card.branch"/>
                        </FluxFlex>

                        <FluxItemStack>
                            <FluxItem
                                v-for="member in card.members"
                                :key="member.name">
                                <FluxItemMedia
                                    is-center
                                    :size="40">
                                    <FluxAvatar
                                        :alt="member.name"
                                        :fallback-initials="initials(member.name)"
                                        :size="40"/>
                                </FluxItemMedia>

                                <FluxItemContent is-center>
                                    <strong>{{ member.name }}</strong>
                                    <span style="font-size: .875rem; opacity: .6">{{ member.role }}</span>
                                </FluxItemContent>

                                <FluxItemActions is-center>
                                    <FluxRemove @click="removeMember(member.name)"/>
                                </FluxItemActions>
                            </FluxItem>
                        </FluxItemStack>
                    </FluxFlex>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        label="Close"
                        @click="isOpened = false"/>

                    <FluxSpacer/>

                    <FluxPrimaryButton
                        icon-before="circle-check"
                        label="Save"
                        @click="isOpened = false"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSlideOver>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxBadge, FluxChip, FluxFlex, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxRemove, FluxSecondaryButton, FluxSlideOver, FluxSpacer } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { reactive, ref } from 'vue';

    faker.seed(7);

    const isOpened = ref(false);

    const card = reactive({
        title: faker.git.commitMessage(),
        branch: faker.git.branch(),
        members: Array.from({length: 3}, () => ({
            name: faker.person.fullName(),
            role: faker.person.jobTitle()
        }))
    });

    function initials(name: string): string {
        return name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
    }

    function removeMember(name: string): void {
        card.members = card.members.filter(member => member.name !== name);
    }
</script>
