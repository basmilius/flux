<template>
    <Preview>
        <FluxPane style="max-width: 720px">
            <FluxPaneBody>
                <FluxFlex align="center">
                    <FluxPersona
                        name="Jane Doe"
                        title="Product designer · Acme Inc."
                        :avatar-size="56"
                        avatar-src="https://i.pravatar.cc/112?img=5"/>

                    <FluxSpacer/>

                    <FluxActionStack>
                        <FluxAction icon="message"/>
                        <FluxAction icon="phone"/>
                        <FluxAction icon="ellipsis-h"/>
                    </FluxActionStack>
                </FluxFlex>

                <FluxTagStack style="margin-top: 12px">
                    <FluxTag label="Customer"/>
                    <FluxTag label="VIP"/>

                    <FluxChip
                        icon-leading="location-dot"
                        label="Amsterdam"/>
                </FluxTagStack>
            </FluxPaneBody>

            <FluxTabs>
                <FluxTab label="Overview">
                    <FluxPaneBody>
                        <FluxDescriptionList title="Contact details">
                            <FluxDescriptionItem
                                icon="message"
                                label="Email">
                                <FluxLink
                                    href="#"
                                    label="jane@acme.com"/>
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="phone"
                                label="Phone">
                                +31 6 1234 5678
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="building"
                                label="Company">
                                Acme Inc.
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="circle-check"
                                label="Status">
                                <FluxBadge
                                    color="success"
                                    label="Active"/>
                            </FluxDescriptionItem>

                            <FluxDescriptionItem
                                icon="pen"
                                label="Job title">
                                <FluxInlineEdit
                                    v-model="jobTitle"
                                    placeholder="Add a title..."/>
                            </FluxDescriptionItem>
                        </FluxDescriptionList>
                    </FluxPaneBody>
                </FluxTab>

                <FluxTab label="Team">
                    <FluxPaneBody>
                        <FluxAvatarGroup :max="4">
                            <FluxAvatar src="https://i.pravatar.cc/64?img=1"/>
                            <FluxAvatar src="https://i.pravatar.cc/64?img=2"/>
                            <FluxAvatar src="https://i.pravatar.cc/64?img=3"/>
                            <FluxAvatar fallback-initials="BM"/>
                            <FluxAvatar fallback-initials="JD"/>
                        </FluxAvatarGroup>
                    </FluxPaneBody>
                </FluxTab>

                <FluxTab label="Activity">
                    <FluxPaneBody>
                        <FluxTimeline>
                            <FluxTimelineItem
                                icon="circle-check"
                                when="13 March, 1:00 PM"
                                title="Deal closed">
                                The enterprise plan was signed and activated.
                            </FluxTimelineItem>

                            <FluxTimelineItem
                                photo="https://i.pravatar.cc/64?img=5"
                                when="12 March, 9:30 AM"
                                title="Jane commented">
                                Left a note on the renewal thread.
                            </FluxTimelineItem>
                        </FluxTimeline>
                    </FluxPaneBody>
                </FluxTab>
            </FluxTabs>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActionStack, FluxAvatar, FluxAvatarGroup, FluxBadge, FluxChip, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxInlineEdit, FluxLink, FluxPane, FluxPaneBody, FluxPersona, FluxSpacer, FluxTab, FluxTabs, FluxTag, FluxTagStack, FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const jobTitle = ref('Product designer');
</script>
