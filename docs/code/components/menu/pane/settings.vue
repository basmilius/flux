<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="user"
                    label="Account"/>

                <FluxMenuFlyout
                    icon="paper-plane"
                    label="Send feedback">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxFormInput
                                v-model="subject"
                                placeholder="Subject"/>

                            <FluxFormTextArea
                                v-model="message"
                                placeholder="What happened?"
                                :rows="3"/>

                            <FluxPrimaryButton
                                label="Send"
                                @click="send"/>
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
    import { FluxFormInput, FluxFormTextArea, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane, FluxPrimaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const subject = ref('');
    const message = ref('');

    function send(): void {
        subject.value = '';
        message.value = '';
    }
</script>
