<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="star"
                    label="Add to favorites"/>

                <FluxMenuFlyout
                    icon="message"
                    label="Add note">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxFormTextArea
                                v-model="note"
                                placeholder="Write a note..."
                                :rows="3"/>
                        </FluxMenuPane>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormTextArea, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const note = ref('');
</script>
