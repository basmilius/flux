<template>
    <div class="frame">
        <p>The opener slot replaces the round button, for instance with a labeled one that says what the dial does.</p>

        <FluxSpeedDial label="Compose">
            <template #opener="{cssClass, isOpen, toggle}">
                <FluxSecondaryButton
                    :class="cssClass"
                    icon-leading="pen"
                    label="Compose"
                    aria-haspopup="menu"
                    :aria-expanded="isOpen"
                    @click="toggle"/>
            </template>

            <FluxSpeedDialAction
                icon="envelope"
                label="Email"
                @click="compose('an email')"/>

            <FluxSpeedDialAction
                icon="message"
                label="Message"
                @click="compose('a message')"/>
        </FluxSpeedDial>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxSpeedDial, FluxSpeedDialAction, showSnackbar } from '@flux-ui/components';

    function compose(what: string): void {
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
