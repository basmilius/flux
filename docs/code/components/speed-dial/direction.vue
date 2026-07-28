<template>
    <div class="frame">
        <p>A dial that fans sideways keeps its actions on the line of the trigger. Pair the direction with the corner the dial sits in, so the actions travel into the screen instead of out of it.</p>

        <FluxSpeedDial
            direction="end"
            icon="image"
            label="Insert"
            position="start">
            <FluxSpeedDialAction
                icon="image"
                label="Image"
                @click="pick('an image')"/>

            <FluxSpeedDialAction
                icon="file"
                label="File"
                @click="pick('a file')"/>
        </FluxSpeedDial>

        <FluxSpeedDial
            direction="start"
            icon="pen"
            label="Edit">
            <FluxSpeedDialAction
                icon="copy"
                label="Duplicate"
                @click="pick('a duplicate')"/>

            <FluxSpeedDialAction
                icon="trash"
                label="Delete"
                @click="pick('a deletion')"/>
        </FluxSpeedDial>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpeedDial, FluxSpeedDialAction, showSnackbar } from '@flux-ui/components';

    function pick(what: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Picked ${what}.`
        });
    }
</script>

<style
    scoped
    lang="css">
    /* The transform makes the fixed dials sit in this frame instead of the viewport. */
    .frame {
        position: relative;
        height: 210px;
        width: 100%;
        padding: 15px;
        transform: translate(0);
    }
</style>
