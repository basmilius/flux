<template>
    <Preview>
        <div class="frame">
            <p>Everything a team adds during the day starts here: a contact, a document or a meeting.</p>

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
    </Preview>
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
