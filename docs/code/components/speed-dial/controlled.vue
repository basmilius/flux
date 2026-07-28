<template>
    <div class="frame">
        <p>The dial is {{ isOpen ? 'open' : 'closed' }}. Clicking outside of it closes it again, which the binding follows.</p>

        <FluxSecondaryButton
            :disabled="isOpen"
            icon-leading="bolt"
            label="Open the dial"
            @click="isOpen = true"/>

        <FluxSpeedDial
            v-model:is-open="isOpen"
            label="Quick actions">
            <FluxSpeedDialAction
                icon="phone"
                label="Call"
                @click="start('a call')"/>

            <FluxSpeedDialAction
                icon="envelope"
                label="Email"
                @click="start('an email')"/>
        </FluxSpeedDial>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxSpeedDial, FluxSpeedDialAction, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const isOpen = ref(false);

    function start(what: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Started ${what}.`
        });
    }
</script>

<style
    scoped
    lang="css">
    /* The transform makes the fixed dial sit in this frame instead of the viewport. */
    .frame {
        position: relative;
        height: 240px;
        width: 100%;
        padding: 15px;
        transform: translate(0);
    }
</style>
