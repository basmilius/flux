<template>
    <div class="frame">
        <p>The dial sits in the bottom corner and fans its actions upwards.</p>

        <FluxSpeedDial label="Create">
            <FluxSpeedDialAction
                icon="user-plus"
                label="New contact"
                @click="create('contact')"/>

            <FluxSpeedDialAction
                icon="file-plus"
                label="New document"
                @click="create('document')"/>

            <FluxSpeedDialAction
                icon="calendar"
                label="New meeting"
                @click="create('meeting')"/>
        </FluxSpeedDial>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpeedDial, FluxSpeedDialAction, showSnackbar } from '@flux-ui/components';

    function create(what: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Started a new ${what}.`
        });
    }
</script>

<style
    scoped
    lang="css">
    /* The transform makes the fixed dial sit in this frame instead of the viewport. */
    .frame {
        position: relative;
        height: 270px;
        width: 100%;
        padding: 15px;
        transform: translate(0);
    }
</style>
